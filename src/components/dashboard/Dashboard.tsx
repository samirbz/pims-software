import React from "react"
import BarChart from "./BarChart"
import ProjectCount from "./ProjectCount"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-12 sm:flex-row ">
      <ProjectCount />
      <BarChart />
    </div>
  )
}
