declare global {
	module JSX {
		interface IntrinsicElements {
			[key: string]: any
		}
	}

	type PostMeta = {
		date: Date
		name: string
		slug: string
		description: string
		labels: string[]
		sound: string
		hero: string
	}

	type PropsWithChildren<CustomProps extends Record<string, unknown> = Record<string, unknown>> =
		CustomProps & {
			children?: (Promise<string | string[]> | undefined)[]
		}
}

export {}
