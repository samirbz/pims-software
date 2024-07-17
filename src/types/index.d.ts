import { ZodIssue } from "zod"
import React from "react"

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] }

function fetchData(): ActionResult<string> {
  // Simulating a successful fetch
  console.log("hello")
}

fetchData()

export type SideNavItem = {
  title: string
  path: string
  icon?: React.JSX.Element
  submenu?: boolean
  subMenuItems?: SideNavItem[]
}
