import { promises, watch } from "node:fs"

export const watchDeep = async (dir: string, callback: any) => {
	const children = await promises.readdir(dir)

	for (const child of children) {
		if ((await promises.stat(`${dir}/${child}`)).isDirectory())
			watchDeep(`${dir}/${child}`, callback)
		else watch(dir, callback)
	}
}
