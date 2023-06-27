import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { graphql, PageProps } from "gatsby"
import Layout from "../../components/layout"
import moment from "moment-timezone"

const toDateTimeString = (d: Date) => {
  const year = d.getFullYear().toString()
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const day = d.getDate().toString().padStart(2, "0")
  const hour = d.getHours().toString().padStart(2, "0")
  const minutes = d.getMinutes().toString().padStart(2, "0")

  return `${year}-${month}-${day}T${hour}:${minutes}`
}

export default function Timezone({ data }: PageProps<Queries.TimezoneQuery>) {
  const [inputDatetime, setInputDatetime] = useState<Date>(new Date())
  console.log(toDateTimeString(inputDatetime))
  return (
    <Layout is_index={false}>
      <Helmet
        title={"Timezone Converter - " + data?.site?.siteMetadata?.title}
      />
      <h1>Timezone Converter</h1>

      <h2 className="text-left">Input</h2>
      <div className="row">
        <div>
          <label htmlFor="inputDatetime">Date and Time</label>
        </div>
        <div>
          <input
            id="inputDatetime"
            className="form-control fc-horizontal"
            type="datetime-local"
            value={toDateTimeString(inputDatetime)}
            style={{ width: "20em" }}
            onChange={(e) => {
              setInputDatetime(new Date(e.target.value))
            }}
          />
        </div>
      </div>
      <label htmlFor="inputTimezone">Timezone</label>
      <select
        id="inputTimezone"
        className="form-control"
        style={{ width: "15em" }}
      >
        {moment.tz.names().map((tzName, i) => (
          <option key={i} value={tzName}>
            {tzName}
          </option>
        ))}
      </select>
    </Layout>
  )
}

export const query = graphql`
  query Timezone {
    site {
      siteMetadata {
        title
      }
    }
  }
`
