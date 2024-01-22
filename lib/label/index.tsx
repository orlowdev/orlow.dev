type P = { label: string; large?: boolean }
export const Label = ({ label, large }: P) => (
	<div
		class={`rounded-md bg-neutral-200 dark:bg-neutral-700 ${
			large ? "text-3xl px-4 py-2" : "text-sm px-2 py-0.5"
		}`}
	>
		#{label}
	</div>
)
