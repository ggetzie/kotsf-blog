import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default function P404({ data }) {

    return (
        <Layout>
            <Helmet title={"Page Not Found - " + data.site.siteMetadata.title} />

            <h2>Page Not Found</h2>

            <p>Whoops! We couldn't find the page you're looking for. Sorry about that.</p>

        </Layout>
    )

}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`