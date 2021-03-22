import { Link } from 'gatsby'
import React from 'react'
import { Centralise } from '../components/centralise'
import Seo from '../components/seo'
import { Layout } from '../layout'

const FourOhFour = () => (
	<Layout>
		<Seo
			title='404'
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
				<span role='img' aria-label='Looking'>
					👀
				</span>{' '}
				Found Nothing
			</h1>
			<Link to='/'>Try again?</Link>
		</Centralise>
	</Layout>
)

export default FourOhFour
