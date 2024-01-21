export const Body = ({ children }: PropsWithChildren) => {
	return (
		<body class="min-h-[100svh] flex flex-col text-neutral-800 dark:text-neutral-200 bg-gradient-to-br from-neutral-200 via-neutral-200 to-slate-200 dark:from-neutral-800 dark:via-neutral-800 dark:to-stone-800">
			{children}
		</body>
	)
}
