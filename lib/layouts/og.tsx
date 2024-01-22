import { Body } from "~/common/body"
import { Footer } from "~/common/footer"
import { Head } from "~/common/head"
import { Html } from "~/common/html"
import { Main } from "~/common/main"
import { Label } from "~/label"

export default ({ title, hero, labels }: PageMeta | PostMeta) => (
	<Html>
		<Head />
		<Body>
			<Main>
				<div class="relative w-[1200px] h-[630px]">
					<img
						src={hero}
						class="absolute top-0 left-0 w-[1200px] h-[630px] object-none object-center"
					/>
					<div class="absolute left-5 right-5 bottom-5 backdrop-blur-md p-8 rounded-lg shadow-xl bg-neutral-900/70">
						<h1 class="text-7xl font-black bg-gradient-to-r text-center from-purple-500 via-pink-500 to-orange-500 text-transparent uppercase bg-clip-text">
							{title}
						</h1>
					</div>
					<div class="absolute right-5 top-5 flex flex-row-reverse flex-wrap gap-2 w-full">
						{labels.map(label => (
							<Label large={true} label={label} />
						))}
					</div>
				</div>
			</Main>
			<Footer />
		</Body>
	</Html>
)
