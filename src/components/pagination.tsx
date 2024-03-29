import React from "react"
import { Link } from "gatsby"
import { PageContext } from "../types"

export default function Pagination({
  pageContext,
}: {
  pageContext: PageContext
}) {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage === 2 ? "/archive/" : `/archive/${currentPage - 1}/`
  const nextPage = `/archive/${currentPage + 1}`
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        listStyle: "none",
        padding: 0,
      }}
    >
      {!isFirst && (
        <Link to={`${prevPage}`} rel="prev">
          « Previous
        </Link>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <li
          key={`pagination-number${i + 1}`}
          style={{
            margin: 0,
          }}
        >
          <Link
            to={`/archive/${i === 0 ? "" : i + 1}`}
            style={{
              padding: "10px",
              textDecoration: "none",
              color: i + 1 === currentPage ? "#ffffff" : "",
              background: i + 1 === currentPage ? "#007acc" : "",
            }}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!isLast && (
        <Link to={`${nextPage}/`} rel="next">
          Next »
        </Link>
      )}
    </ul>
  )
}
