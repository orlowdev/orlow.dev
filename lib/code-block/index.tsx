import { getHighlighter } from "shiki"
import { Null } from "~/common/null"
import { readUTF8File0 } from "~/fs/oathify"

const highlighterP = getHighlighter({ theme: "dark-plus" })

type P = PropsWithChildren<{ language: string; path: string }>
export const CodeBlock = async ({ children, language, path }: P) => {
	const highlighter = await highlighterP
	const code = highlighter.codeToHtml(
		Array.isArray(children) ? children.join("\n") : children ?? "",
		{ lang: language }
	)

	return (
		<div>
			<p class="text-sm text-neutral-500 text-center">{path}</p>
			<div>{code}</div>
		</div>
	)
}

type CBFFP = Omit<P, "children"> & { file: string }
export const CodeBlockFromFile = async ({ language, path, file }: CBFFP) =>
	readUTF8File0(file).fork(Null, text => (
		<CodeBlock language={language} path={path}>
			{text}
		</CodeBlock>
	))

export const CodeBlockFromGist = async ({ language, path, file }: CBFFP) => {
	const gistPath = file.startsWith("/") ? file.slice(1) : file

	return <CodeBlockFromFile language={language} path={path} file={`./usr/gists/${gistPath}`} />
}
