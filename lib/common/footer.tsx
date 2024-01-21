export const Footer = () => {
	return (
		<footer class="w-full flex flex-col items-center space-y-2 p-4">
			<ul class="flex space-x-4">
				<li>
					<a href="/">Home</a>
				</li>
				{/* <li>
					<a href="/about.html">About</a>
				</li> */}
			</ul>
			<div class="text-xs">
				&copy; {currentYear}{" "}
				<a href="/" class="no-underline !text-neutral-800 dark:!text-neutral-200">
					orlowdev
				</a>
			</div>
		</footer>
	)
}

const currentYear = new Date(Date.now()).getFullYear()
