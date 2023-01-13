import React from "react"
import { Helmet } from "react-helmet"
import { graphql, Link, PageProps } from "gatsby"

import Layout from "../../components/layout"

export default function Miscellany({
  data,
}: PageProps<Queries.MiscellanyQuery>) {
  return (
    <Layout is_index={false}>
      <Helmet title={"Miscellany - " + data!.site!.siteMetadata!.title} />
      <h1>Miscellany</h1>
      <p>
        This is a place to store random, one-off experiments, projects,
        factoids, utilities, etc. that don't otherwise have a home.
      </p>

      <dl className="section-list">
        <dt>
          <Link to="/miscellany/tasks/">Project Manager</Link>
        </dt>
        <dd>
          If you haven't made a todo list app, did you even really learn React?
          Here's my contribution.
        </dd>
        <dt>
          <a download href={"/enable.txt"}>
            ENABLE word list
          </a>
        </dt>
        <dd>
          ENABLE stands for Enhanced North American Benchmark Lexicon. This is a
          public domain word list used by many word games. For a public domain
          list this took a lot of searching to find so I'll host it here in case
          anyone else wants it. Unfortunately I couldn't find both the list and
          its <a href={"/enable_README.txt"}>README</a> in the same place, so I
          can't verify that this is in fact the original ENABLE list. For one
          thing, it has a different number of words than claimed in the README,
          so probably not.
        </dd>
        <dt>
          <Link to="/miscellany/special/">How Do I Type That Character?</Link>
        </dt>
        <dd>
          A sortable, searchable table of special characters and how to type
          them on different systems.
        </dd>
      </dl>
    </Layout>
  )
}

export const query = graphql`
  query Miscellany {
    site {
      siteMetadata {
        title
      }
    }
  }
`
