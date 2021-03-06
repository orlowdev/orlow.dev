import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
	const query = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					siteUrl
					description
				}
			}
		}
	`)

	return query.site.siteMetadata
}
