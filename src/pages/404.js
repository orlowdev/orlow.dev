import { Link } from 'gatsby'
import React from 'react'
import { Centralise } from '../components/centralise'
import { Layout } from '../layout'

const FourOhFour = () => (
	<Layout>
		<Centralise css={{ textAlign: 'center', marginTop: '10rem' }}>
			<h1>Found Nothing</h1>
			<Link to='/'>Try again?</Link>
		</Centralise>
	</Layout>
)

export default FourOhFour
