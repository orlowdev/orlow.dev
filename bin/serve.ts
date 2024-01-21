import { promises, existsSync, mkdirSync } from "node:fs"
import { execSync, exec } from "node:child_process"
import { watchDeep } from "~/watch-deep"

console.log("Creating required directories...")
if (!existsSync("var/www")) mkdirSync("var/www")
if (!existsSync("var/build")) mkdirSync("var/build")

const build = () => {
	console.log("Compiling JSX to JS...")
	execSync("bun build usr/blog/* --outdir var/build/blog --target bun")
	execSync("bun build usr/pages/* --outdir var/build --target bun")
}

const compileHTML = async () => {
	console.log("Compiling JS to HTML...")
	const pages = await promises.readdir("var/build", { recursive: true })

	for (const page of pages) {
		if (!page.endsWith(".js")) continue

		const name = page.slice(0, -3)
		const f = await import(`var/build/${page}?rnd=${Math.random()}`).then(p => p.default)
		const result = await f()

		await Bun.write(`var/www/${name}.html`, result)
	}
}

const copyStatic = () => {
	console.log("Copying static files...")
	execSync("cp usr/static/* var/www -rf")
}

const tailwind = () => {
	console.log("Compiling CSS...")
	exec(
		"npx tailwindcss -i lib/tailwind-css/index.css -o var/www/index.css --watch -c lib/tailwind-css/tailwind.config.js"
	)
}

console.log("Preparing assets...")

build()
compileHTML()
copyStatic()
tailwind()

watchDeep("./lib", () => {
	build()
	compileHTML()
})
watchDeep("./usr", () => {
	build()
	compileHTML()
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
