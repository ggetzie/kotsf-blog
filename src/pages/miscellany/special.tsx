import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql, PageProps } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFilter,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons"

import Layout from "../../components/layout"

import "../../styles/special.css"

type CharInfo = {
  character: string
  unicode: string
  entity_name: string
  entity_number: string
  compose: string
  alt_code: string
  description: string
}

type CharInfoKey = keyof CharInfo

const special_chars: CharInfo[] = require("../../../static/special_chars.json")

type SortState = [CharInfoKey, number]

function SortArrow({ direction }: { direction: number }) {
  return (
    <span className="padLeft">
      {direction === 1 ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      )}
    </span>
  )
}

export default function Special({
  data,
}: PageProps<Queries.SpecialCharsQuery>) {
  const [listed, setListed] = useState<CharInfo[]>(special_chars)
  const initialSort: SortState = ["character", 1]
  const [sortState, setSortState] = useState<SortState>(initialSort)
  const initialFilter: CharInfo = {
    character: "",
    unicode: "",
    entity_name: "",
    entity_number: "",
    compose: "",
    alt_code: "",
    description: "",
  }
  const [filterState, setFilterState] = useState(initialFilter)
  const filterSizes = {
    character: 1,
    unicode: 4,
    entity_name: 4,
    entity_number: 4,
    compose: 4,
    alt_code: 4,
    description: 20,
  }

  function HeaderCell({
    colId,
    children,
  }: {
    colId: CharInfoKey
    children: JSX.Element | string
  }) {
    return (
      <th
        title="Click to Sort"
        className={sortState[0] === colId ? "selected" : ""}
        onClick={() => {
          setSortState([colId, sortState[0] === colId ? sortState[1] * -1 : 1])
        }}
      >
        {children}
        {sortState[0] === colId && <SortArrow direction={sortState[1]} />}
      </th>
    )
  }

  useEffect(
    () =>
      setListed(
        [...listed].sort((a, b) => {
          const col = sortState[0]
          const res = a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0
          return sortState[1] === 1 ? res : res * -1
        })
      ),
    [sortState]
  )

  useEffect(
    () =>
      setListed(
        special_chars.filter((item) => {
          return Object.keys(item)
            .map((key) =>
              filterState[key as CharInfoKey] === ""
                ? true
                : item[key as CharInfoKey]
                    .toLowerCase()
                    .includes(filterState[key as CharInfoKey].toLowerCase())
            )
            .reduce((a, b) => a && b)
        })
      ),
    [filterState]
  )

  return (
    <Layout is_index={false} fullWidth={true}>
      <Helmet
        title={
          "How Do I Type That Character? - " + data?.site?.siteMetadata?.title
        }
      />
      <h1>How Do I Type That Character?</h1>
      <div className="intro">
        <p>
          I often find myself searching for how to type a character that's not
          present on the standard keyboard. Depending on the context and what
          system I'm using the process is different and the information was{" "}
          spread across several websites, so I decided to gather it all in one
          convenient place.
        </p>
        <details>
          <summary>Description of columns</summary>
          <dl>
            <dt>Character</dt>
            <dd>The character you want to type</dd>
            <dt>Unicode</dt>
            <dd>
              The{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://home.unicode.org/"
              >
                unicode
              </a>{" "}
              codepoint.
            </dd>
            <dt>HTML entity name</dt>
            <dd>
              The HTML-escaped entity name. Use in an HTML file and the browser
              will render the symbol
            </dd>
            <dt>HTML entity number</dt>
            <dd>
              The HTML-escaped entity number. Use in an HTML file and the
              browser will render the symbol
            </dd>
            <dt>Compose Key</dt>
            <dd>
              The Linux{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://tstarling.com/stuff/ComposeKeys.html"
              >
                compose key
              </a>{" "}
              sequence. See the instructions for your Linux distribution on how
              to set the Compose key. Here's the documentation for{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://help.ubuntu.com/community/ComposeKey"
              >
                Ubuntu
              </a>
              . Some of the rows may have multiple values and any of them should
              work. Do not type the enclosing double-quotes in this column.
            </dd>
            <dt>Alt Code</dt>
            <dd>
              The Alt Code to type the character in Windows. Hold down the alt
              key and type the numbers on the number pad. Some columns may have
              multiple values separated by spaces. Any one of those values
              should work. (Don't type the whole sequence.)
            </dd>
            <dt>Description</dt>
            <dd>How the character is referred to.</dd>
          </dl>
        </details>
      </div>
      <div id="table">
        <table>
          <thead>
            <tr>
              <HeaderCell colId="character">Character</HeaderCell>
              <HeaderCell colId="unicode">Unicode</HeaderCell>

              <HeaderCell colId="entity_name">
                <p>
                  HTML
                  <br />
                  entity name
                </p>
              </HeaderCell>
              <HeaderCell colId="entity_number">
                <p>
                  HTML
                  <br />
                  entity number
                </p>
              </HeaderCell>
              <HeaderCell colId="compose">Compose Key</HeaderCell>
              <HeaderCell colId="alt_code">Alt Code</HeaderCell>
              <HeaderCell colId="description">Description </HeaderCell>
              <th>
                <button
                  title="Reset"
                  onClick={() => {
                    setFilterState(initialFilter)
                    setSortState(initialSort)
                    setListed(special_chars)
                  }}
                >
                  Reset
                </button>
              </th>
            </tr>
            <tr id="filters">
              {Object.keys(filterState).map((colId, i) => (
                <td key={`filter${colId}`}>
                  {i === 0 && <FontAwesomeIcon icon={faFilter} />}
                  <input
                    title="Start typing to filter by column"
                    size={filterSizes[colId as CharInfoKey]}
                    value={filterState[colId as CharInfoKey]}
                    onChange={(e) =>
                      setFilterState({
                        ...filterState,
                        [colId]: e.target.value,
                      })
                    }
                  />
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {listed.map((item, i) => (
              <tr key={i}>
                <td className="centered">{item.character}</td>
                <td>{item.unicode}</td>
                <td>{item.entity_name}</td>
                <td>{item.entity_number}</td>
                <td>{item.compose}</td>
                <td>{item.alt_code}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query SpecialChars {
    site {
      siteMetadata {
        title
      }
    }
  }
`
