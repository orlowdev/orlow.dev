import { Body } from "~/common/body"
import { Head } from "~/common/head"
import { Html } from "~/common/html"
import { Main } from "~/common/main"
import { Footer } from "~/common/footer"

export default function _404() {
	return (
		<Html>
			<Head>
				<title>ENOTFOUND</title>
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
