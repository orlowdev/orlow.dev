import React from 'react'
import { Centralise } from '../components/centralise'
import Seo from '../components/seo'
import { Layout } from '../layout'

const ThanksForSubscribingPage = () => (
	<Layout>
		<Seo
			title='Thanks for subscribing!'
			description='Thanks to subscribing to my newsletter.'
			meta={[
				{
					name: 'robots',
					content: 'noindex, nofollow',
				},
			]}
		/>
		<Centralise css={{ textAlign: 'center', marginTop: '10rem' }}>
			<h1>Thank you for subscribing!</h1>
			<p>
				You should get an approval email shortly. Click the button there if you didn&apos;t change
				your mind.
			</p>
		</Centralise>
	</Layout>
)

export default ThanksForSubscribingPage
