import React from 'react'
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
		<div className='m-auto text-center p-5 h-screen flex flex-col justify-center'>
			<h1 className='font-black text-4xl text-gray-700 mb-10'>
				<span role='img' aria-label='high fives'>
					👍
				</span>{' '}
				Thank you for subscribing!
			</h1>
			<p className='mb-10 text-gray-600 max-w-lg'>
				You should get an approval email shortly. If it&apos;s not there, also check
				&ldquo;Spam&rdquo; folder. Just in case. It&apos;s not that I spam people, but your email
				provider might think I do. Click the confirmation button in the email if you didn&apos;t
				change your mind.
			</p>
		</div>
	</Layout>
)

export default ThanksForSubscribingPage
