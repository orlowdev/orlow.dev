import { Link } from 'gatsby'
import React from 'react'
import { Centralise } from '../components/centralise'
import Seo from '../components/seo'
import { Layout } from '../layout'

const SubscriptionConfirmationPage = () => (
	<Layout>
		<Seo
			title='Thanks!'
			description='It must be the wrong place.'
			meta={[
				{
					name: 'robots',
					content: 'noindex, nofollow',
				},
			]}
		/>
		<Centralise css={{ textAlign: 'center', marginTop: '10rem' }}>
			<h1>
				All done!{' '}
				<span role='img' aria-label='high fives'>
					🙌
				</span>
			</h1>
			<Link to='/'>To the homepage?</Link>
		</Centralise>
	</Layout>
)

export default SubscriptionConfirmationPage
