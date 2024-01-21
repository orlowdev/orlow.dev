/**
 * A customisable props type for our components.
 */
type PropsWithChildren<
	CustomProps extends Record<string, unknown> = Record<string, unknown>
> = CustomProps & {
	children?: (Promise<string | string[]> | undefined)[]
}

/**
 * This function is called recursively, so, whether it's a component or an HTML tag,
 * it will eventually become an HTML string with all children nested as HTML as well.
 */
export async function jsx(
	type: string | ((props: PropsWithChildren) => string),
	props: PropsWithChildren
): Promise<string> {
	// 1. Handling components
	// This is a component. Run it to get the contents.
	if (typeof type === "function") return type(props)

	// 2. Handling tags
	// If children is not an array then it must be.
	if (!Array.isArray(props.children)) props.children = [props.children]

	// Start opening tag composition.
	let line = `<${type}`
	// Get all the props that are not children.
	const notChildren = Object.keys(props).filter(key => key !== "children")

	// Loop over the props and put them as attributes in our HTML.
	// Yes, class, not className.
	for (const prop of notChildren) line += ` ${prop}="${props[prop]}"`

	// Finish opening tag composition.
	line += ">"

	// Loop over the children and put them as inner HTML.
	for (const child of props.children) {
		let nested = await child

		// If there's more than 1 child, loop
		if (!Array.isArray(nested)) nested = [nested as string]
		for (const item of nested as string[]) line += (await item) ?? ""
	}

	// Close the tag and return whatever HTML we got.
	return line.concat(`</${type}>`)
}
