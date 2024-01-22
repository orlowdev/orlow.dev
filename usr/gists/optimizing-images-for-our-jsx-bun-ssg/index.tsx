import { Image } from "../components/image"

export default function Index() {
	return (
		<html lang="en">
			<head>
				<title>Bun, JSX and Orlowdev</title>
			</head>
			<body>
				<main>
					<h1>My image</h1>
					<Image src="./static/my-image.png" width={1024} />
				</main>
			</body>
		</html>
	)
}
