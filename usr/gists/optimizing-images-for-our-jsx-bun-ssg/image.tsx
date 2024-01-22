import sharp from "sharp"

type P = { src: string; alt: string; width: number; class?: string }
export const Image = async ({ src, alt = src, class: cls = "", width }: P) => {
	// Grab the extension of the original file.
	const extension = src.substring(src.lastIndexOf("."))
	// Create a full path that leads to our images directory.
	const originalPath = `img/${src}`
	// Create a new path where the formatted image is going to be saved.
	const newPath = src.replace(extension, ".wepb")

	// Transform image to `.webp`, resize it to given width, and save it as a file under our new path.
	await sharp(originalPath).webp({ quality: 80 }).resize(width).toFile(`dist/${newPath}`)

	// Return a component that renders the image from the new path.
	return <img src={newPath} alt={alt} class={` ${cls}`} />
}
