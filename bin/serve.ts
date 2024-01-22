import { promises, existsSync, mkdirSync } from "node:fs"
import { execSync, exec } from "node:child_process"
import { watchDeep } from "~/fs/watch-deep"
import { launch } from "puppeteer"

console.log("Creating required directories...")
if (!existsSync("var/www")) mkdirSync("var/www")
if (!existsSync("var/www/og")) mkdirSync("var/www/og")
if (!existsSync("var/www/og/blog")) mkdirSync("var/www/og/blog")
if (!existsSync("var/build")) mkdirSync("var/build")

const getPages = () =>
	promises
		.readdir("var/build", { recursive: true })
		.then(paths => paths.map(path => path.substring(0, path.lastIndexOf("."))).filter(Boolean))

const build = async () => {
	console.log("Compiling JSX to JS...")
	execSync("bun build usr/blog/* --outdir var/build/blog --target bun")
	execSync("bun build usr/pages/* --outdir var/build --target bun")

	const pages = await getPages()

	const layout = await import(`lib/layouts/og?rnd=${Math.random()}`).then(module => module.default)

	for (const page of pages) {
		const meta = await import(page.startsWith("blog") ? `usr/${page}` : `usr/pages/${page}`).then(
			module => module.meta
		)

		const content = await layout(meta)
		await promises.writeFile(`var/www/og/${page}.html`, content, "utf8")
	}
}

const compileHTML = async () => {
	console.log("Compiling JS to HTML...")
	const pages = await getPages()

	for (const page of pages) {
		const f = await import(`var/build/${page}?rnd=${Math.random()}`).then(p => p.default)
		const result = await f()

		await Bun.write(`var/www/${page}.html`, result)
	}
}

const copyStatic = () => {
	console.log("Copying static files...")
	execSync("cp usr/static/* var/www -rf")
}

const tailwind = () => {
	console.log("Compiling CSS...")
	exec(
		"npx tailwindcss -i lib/tailwind-css/index.css -o var/www/index.css --watch -c lib/tailwind-css/tailwind.config.js --minify"
	)
}

const createOG = async () => {
	// TODO: Move to build script
	// console.log("Creating OG...")
	// const pages = await getPages()
	// const browser = await launch({
	// 	args: ["--no-sandbox", "--disable-setuid-sandbox"],
	// 	headless: true,
	// 	executablePath: "/usr/bin/google-chrome",
	// })
	// const browserPage = await browser.newPage()
	// for (const page of pages) {
	// 	if (existsSync(`var/www/${page}.og.png`)) continue
	// 	browserPage.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }])
	// 	await browserPage.goto(`http://localhost:3000/og/${page}.html`)
	// 	await browserPage.screenshot({
	// 		path: `var/www/${page}.og.png`,
	// 		clip: { x: 0, y: 0, width: 1200, height: 630 },
	// 	})
	// }
	// await browser.close()
}

console.log("Preparing assets...")

build()
compileHTML()
copyStatic()
tailwind()
createOG()

watchDeep("./lib", () => {
	build()
	compileHTML()
	createOG()
})

watchDeep("./usr", () => {
	build()
	compileHTML()
	createOG()
})

watchDeep("./usr/static", copyStatic)

Bun.serve({
	port: 3000,
	fetch: async req => {
		const path = new URL(req.url).pathname

		const file = Bun.file(path === "/" ? "var/www/index.html" : `var/www/${path}`)

		return new Response((await file.exists()) ? file : Bun.file("var/www/404.html"))
	},
	error: () => new Response(Bun.file("var/www/404.html")),
})

console.log("Server running on port 3000")
