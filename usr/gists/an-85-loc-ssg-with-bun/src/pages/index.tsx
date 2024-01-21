const valueOutsideComponent = "Value outside"
const asyncValueOutsideComponentP = Promise.resolve("Async value outside")

/**
 * This is our index page.
 *
 * NOTE: It must be a default export as per our build script.
 *
 * And yes, it does support
 * - extracting components
 * - children provision
 * - async behavior
 * - values in closure
 */
export default async function Index() {
	const valueViaChildren = "Value via children"

	return (
		<html lang="en">
			<head>
				<title>Bun, JSX and Orlowdev</title>
			</head>
			<body>
				<main>
					<h1>My values</h1>
					<MyValues valueViaProps="Value via props">{valueViaChildren}</MyValues>
				</main>
			</body>
		</html>
	)
}

type P = PropsWithChildren<{ valueViaProps: string }>
const MyValues = async ({ valueViaProps, children }: P) => {
	const valueInsideComponent = "Value inside"
	const asyncValueInsideComponent = await Promise.resolve("Async value inside")
	const asyncValueOutsideComponent = await asyncValueOutsideComponentP

	return (
		<ul>
			<li>{valueViaProps}</li>
			<li>{valueInsideComponent}</li>
			<li>{valueOutsideComponent}</li>
			<li>{asyncValueInsideComponent}</li>
			<li>{asyncValueOutsideComponent}</li>
			<li>{children}</li>
		</ul>
	)
}
