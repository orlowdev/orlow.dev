import { Link } from 'gatsby'
import React from 'react'
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
		<div className='m-auto text-center p-5 h-screen flex flex-col justify-center'>
			<h1 className='font-black text-4xl text-gray-700 mb-10'>
				<span role='img' aria-label='Looking'>
					👀
				</span>{' '}
				Found Nothing
			</h1>
			<Link className='text-red-700 underline' to='/'>
				Try again?
			</Link>
		</div>
	</Layout>
)

export default FourOhFour
