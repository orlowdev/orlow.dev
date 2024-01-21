declare global {
	module JSX {
		interface IntrinsicElements {
			[key: string]: any
		}
	}

	/**
	 * A customisable props type for our components.
	 */
	export type PropsWithChildren<
		CustomProps extends Record<string, unknown> = Record<string, unknown>
	> = CustomProps & {
		children?: (Promise<string | string[]> | undefined)[]
	}
}

export {}
