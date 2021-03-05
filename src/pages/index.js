import React from 'react'
import { css, Global } from '@emotion/react'

const Index = () => (
	<main>
		<Global
			styles={css`
				@font-face {
					font-family: system;
					font-style: normal;
					font-weight: 300;
					src: local('.SFNSText-Light'), local('.HelveticaNeueDeskInterface-Light'),
						local('.LucidaGrandeUI'), local('Ubuntu Light'), local('Segoe UI Light'),
						local('Roboto-Light'), local('DroidSans'), local('Tahoma');
				}

				body {
					font-family: system;
				}
			`}
		/>
		<h1>Hi</h1>
		<p>I'll add something here in a moment.</p>
	</main>
)

export default Index
