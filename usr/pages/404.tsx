import { Body } from "~/common/body"
import { Head } from "~/common/head"
import { Html } from "~/common/html"
import { Main } from "~/common/main"
import { Footer } from "~/common/footer"

export const meta: PageMeta = {
	title: "ENOTFOUND",
	hero: "/index.jpg",
	labels: [],
}

export default function _404() {
	return (
		<Html>
			<Head>
				<title>ENOTFOUND – ||↓ DEV</title>
				<meta name="description" content={meta.title} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={meta.title} />
				<meta property="og:description" content={meta.title} />
				<meta property="og:url" content={`https://orlow.dev/404.html`} />
				<meta property="og:image" content={`https://orlow.dev/404.og.png`} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.title} />
				<meta name="twitter:image" content="https://orlow.dev/404.og.png" />
			</Head>
			<Body>
				<Main>
					<div class="flex items-center justify-center h-full">
						<div class="flex flex-col space-y-4 items-center">
							<p class="text-9xl">🦝</p>
							<h1 class="text-5xl font-black">404 ENOTFOUND</h1>
						</div>
					</div>
				</Main>
				<Footer />
			</Body>
		</Html>
	)
}
