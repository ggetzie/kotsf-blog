import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql, PageProps } from "gatsby"
import Layout from "../../components/layout"
import moment from "moment-timezone"

import "../../styles/timezone.css"

const toDateTimeString = (d: Date) => {
  const year = d.getFullYear().toString()
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const day = d.getDate().toString().padStart(2, "0")
  const hour = d.getHours().toString().padStart(2, "0")
  const minutes = d.getMinutes().toString().padStart(2, "0")

  return `${year}-${month}-${day}T${hour}:${minutes}`
}

const convertTZ = (inputDT: string, inputTZ: string, outputTZ: string) => {
  if (!tzNames.includes(inputTZ)) {
    return "Please select a valid input timezone from the list"
  } else if (!tzNames.includes(outputTZ)) {
    return "Please select a valid output timezone from the list"
  } else {
    const inputWithTZ = moment.tz(inputDT, inputTZ)
    return inputWithTZ.tz(outputTZ).format("MMMM Do YYYY, h:mm A")
  }
}

const tzNames = moment.tz.names()

const TZList = () => {
  return (
    <datalist id="allTimezones">
      {tzNames.map((tz, i) => (
        <option key={i} value={tz}></option>
      ))}
    </datalist>
  )
}

const TZInput = ({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (tz: string) => void
}) => {
  return (
    <div className="mb-1">
      <label htmlFor={id}>Timezone</label>
      <input
        id={id}
        className="form-control"
        list="allTimezones"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div id={`${id}help`} className="form-text">
        Start typing the name of a timezone and select from the list.
      </div>
    </div>
  )
}

export default function Timezone({ data }: PageProps<Queries.TimezoneQuery>) {
  const now = toDateTimeString(new Date())
  const defaultInputTZ = "Asia/Hong_Kong"
  const defaultOutputTZ = "US/Eastern"
  const [inputDatetime, setInputDatetime] = useState<string>(now)
  const [inputTimezone, setInputTimezone] = useState<string>(defaultInputTZ)
  const [outputTimezone, setOutputTimezone] = useState<string>(defaultOutputTZ)
  const [outputDatetime, setOutputDatetime] = useState<string>(
    convertTZ(now, defaultInputTZ, defaultOutputTZ)
  )

  useEffect(() => {
    setOutputDatetime(convertTZ(inputDatetime, inputTimezone, outputTimezone))
  }, [inputDatetime, inputTimezone, outputTimezone])

  return (
    <Layout is_index={false}>
      <Helmet
        title={"Timezone Converter - " + data?.site?.siteMetadata?.title}
      />
      <TZList />
      <div className="d-flex flex-column justify-content-between">
        <div>
          <h1 className="text-center mb-5">Timezone Converter</h1>
          <div className="tzSection">
            <h2 className="mb-2">Input</h2>
            <TZInput
              id="inputTimezone"
              value={inputTimezone}
              onChange={(tz) => setInputTimezone(tz)}
            />
            <label htmlFor="inputDatetime">Date and Time</label>
            <input
              id="inputDatetime"
              className="form-control"
              type="datetime-local"
              value={inputDatetime}
              onChange={(e) => {
                setInputDatetime(e.target.value)
              }}
            />
          </div>
          <h2 className="text-left">Output</h2>
          <div className="tzSection">
            <TZInput
              id="outputTimezone"
              value={outputTimezone}
              onChange={(tz) => setOutputTimezone(tz)}
            />
          </div>
          <p id="output" className="text-center fw-bold mt-3 fs-4">
            {outputDatetime}
          </p>
        </div>
        {/* <p className="text-center mt-5">
          <small>
            Made with{" "}
            <a href="https://momentjs.com/timezone/">Moment Timezone</a>
          </small>
        </p> */}
      </div>
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
