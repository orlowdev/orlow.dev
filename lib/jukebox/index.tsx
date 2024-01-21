type P = { track: string }
export const Jukebox = ({ track }: P) => {
	const normalizedTrack = track
		.replace("music.apple.com", "embed.music.apple.com")
		.concat("&theme=dark")

	return (
		<iframe
			allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
			frameborder="0"
			class="w-full max-w-[480px] !overflow-hidden shadow-md border-none rounded-md bg-transparent"
			sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
			src={normalizedTrack}
		/>
	)
}
