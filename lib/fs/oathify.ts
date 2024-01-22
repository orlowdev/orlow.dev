import { promises } from "node:fs"
import { Oath, oathify } from "oathify"

export const readFile0 = oathify(promises.readFile)
export const readUTF8File0 = (path: string) => readFile0(path, "utf8")
