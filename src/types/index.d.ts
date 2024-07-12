import { ZodIssue } from "zod"

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] }

function fetchData(): ActionResult<string> {
  // Simulating a successful fetch
  console.log("hello")
}

fetchData()
