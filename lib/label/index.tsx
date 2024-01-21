type P = { label: string }
export const Label = ({ label }: P) => (
	<div class="rounded-md px-2 py-0.5 text-sm bg-neutral-200 dark:bg-neutral-700">#{label}</div>
)
