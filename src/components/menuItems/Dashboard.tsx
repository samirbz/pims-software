import React from "react"
import BarChart from "../charts/BarChart"
import ProjectCount from "./ProjectCount"

export default function Dashboard() {
  return (
    <div className="flex justify-center gap-40">
      <ProjectCount />
      <BarChart />
    </div>
  )
}
