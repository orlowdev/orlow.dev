import { Link } from 'gatsby'
import React from 'react'
import Seo from '../components/seo'
import { Layout } from '../layout'

const SubscriptionConfirmationPage = () => (
	<Layout>
		<Seo
			title='Subscription confirmed. Thanks!'
			description='Thank you for subscribing to the newsletter!'
			meta={[
				{
					name: 'robots',
					content: 'noindex, nofollow',
				},
			]}
		/>
		<div className='m-auto text-center p-5 h-screen flex flex-col justify-center'>
			<h1 className='font-black text-4xl text-gray-700 mb-10'>
				<span role='img' aria-label='high fives'>
					🙌
				</span>{' '}
				All done!
			</h1>
			<p className='mb-10 text-gray-600 max-w-lg'>
				Your sub is now confirmed. Thanks again! I&apos;ll occasionally send you some updates and
				stuff. If you decide it&apos;s not worth your time anymore, you can unsubscribe with a link
				in any of my emails. And do not worry, it won&apos;t hurt my feelings, because I have none.
			</p>
			<Link className='text-red-700 underline' to='/'>
				Now, to the homepage?
			</Link>
		</div>
	</Layout>
)

export default SubscriptionConfirmationPage
