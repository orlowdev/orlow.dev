import { Switch } from "@ordo-pink/switch"

type P = PropsWithChildren<{ level: 1 | 2 | 3 | 4 | 5 }>
export const Heading = ({ children, level }: PropsWithChildren) =>
	Switch.of(level)
		.case(1, () => <h1 class="text-4xl uppercase font-black">{children}</h1>)
		.case(2, () => <h2 class="text-3xl font-black">{children}</h2>)
		.case(3, () => <h3 class="text-3xl font-bold">{children}</h3>)
		.case(4, () => <h4 class="text-xl font-bold">{children}</h4>)
		.case(5, () => <h5 class="text-xl">{children}</h5>)
		.default(() => <p>{children}</p>)
