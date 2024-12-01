import React from "react"
import ProjectCount from "./ProjectCount"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-12 sm:flex-row ">
      <ProjectCount />
    </div>
  )
}
