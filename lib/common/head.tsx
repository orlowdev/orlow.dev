export const Head = ({ children }: PropsWithChildren) => {
	return (
		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="content-type" content="text/html; charset=utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="msapplication-TileColor" content="#da532c" />
			<meta name="theme-color" content="#ffffff" /> <link rel="stylesheet" href="/index.css" />
			<meta property="og:locale" content="en_US" />
			<meta property="og:site_name" content="Orlow.dev" />
			<meta property="og:image:type" content="image/png" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@orlowdev" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link
				href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
				rel="stylesheet"
			/>
			<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			{children}
		</head>
	)
}
