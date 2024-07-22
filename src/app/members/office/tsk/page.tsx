"use client"
import React, { useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"

const App = () => {
  const [date, setDate] = useState<string>("")

  return (
    <form>
      <label htmlFor="date">Date</label>
      <NepaliDatePicker
        inputClassName="form-control"
        className=""
        value={date}
        onChange={(value: string) => setDate(value)}
        options={{ calenderLocale: "ne", valueLocale: "en" }}
      />
    </form>
  )
}

export default App
