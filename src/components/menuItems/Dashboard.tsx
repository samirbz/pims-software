import React from "react"
import BarChart from "../charts/BarChart"
import ProjectCount from "./ProjectCount"

export default function Dashboard() {
  return (
    <div className="flex gap-12">
      <ProjectCount />
      <BarChart />
    </div>
  )
}
