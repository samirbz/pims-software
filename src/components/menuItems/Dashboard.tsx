import React from "react"
import BarChart from "../charts/BarChart"
import ProjectCount from "./ProjectCount"

export default function Dashboard() {
  return (
    <div className="flex gap-40">
      <ProjectCount />
      <BarChart />
    </div>
  )
}
