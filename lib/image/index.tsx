import sharp from "sharp"
import { promises } from "fs"

type P = {
	src: string
	title?: string
	alt?: string
	class?: string
	width: number
	format?: "webp" | "png" | "jpeg"
}
export const Image = async ({
	src,
	alt = src,
	title = alt,
	class: cls = "",
	width,
	format = "webp",
}: P) => {
	const extension = src.substring(src.lastIndexOf("."))
	const originalPath = `usr/static${src}`
	const generatedPath = `${src}-${width}`.replace(extension, "").concat(`.${format}`)
	const savePath = `var/www${generatedPath}`

	if (!(await promises.exists(savePath)))
		await sharp(originalPath)[format]({ quality: 80 }).resize(width).toFile(savePath)

	return <img src={generatedPath} title={title} alt={alt} class={` ${cls}`} />
}
