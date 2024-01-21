import { getHighlighter } from "shiki"

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
