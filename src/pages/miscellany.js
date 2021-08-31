import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";

export default function Miscellany({ data }) {

    return(
        <Layout>
            <Helmet title={"Miscellany - " + data.site.siteMetadata.title} />
            <h2>Miscellany</h2>
            <p>
                This is a place to store random, one-off experiments and projects that don't otherwise have a home.
            </p>

            <dl>
                <dt><Link to="/tasks/">Project Manager</Link></dt>
                <dd>If you haven't made a todo list app, did you even really learn React? Here's my contribution.</dd>
            </dl>
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