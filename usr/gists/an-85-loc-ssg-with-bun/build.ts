import { promises, existsSync, mkdirSync } from "node:fs"
import { execSync } from "node:child_process"

// Create all the directories if they do not exist.
if (!existsSync("dist")) mkdirSync("dist")
if (!existsSync("dist/js")) mkdirSync("dist/js")
if (!existsSync("dist/www")) mkdirSync("dist/www")

/**
 * Build JSX, loop over pages and save their content as HTML files with the same name.
 */
const compileHTML = async () => {
	// Bun build with a target of Bun since we are going to run those scripts later with Bun.
	execSync("bun build src/pages/* --outdir dist/js --target=bun")

	// Get all available pages.
	const pages = await promises.readdir("./dist/js")

	// Loop over pages and generate HTML files for each of them.
	for (const page of pages) {
		// Skip if a page is somehow not a JS file.
		if (!page.endsWith(".js")) continue

		// Get name of the file without file extension.
		const name = page.substring(0, page.lastIndexOf("."))

		// Import default function from the page.
		const f = await import(`dist/js/${name}`).then(p => p.default)

		// Run the function and write whatever it returns to an HTML file with the name of the page.
		Bun.write(`./dist/www/${name}.html`, await f())
	}
}

// Go!
compileHTML()
