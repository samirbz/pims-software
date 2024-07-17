import { FieldValues, Path, UseFormSetError } from "react-hook-form"
import { ZodIssue } from "zod"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errroResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errroResponse.error)) {
    errroResponse.error.forEach((e: any) => {
      const fieldName = e.path.join(".") as Path<TFieldValues>
      setError(fieldName, { message: e.message })
    })
  } else {
    setError("root.serverError", { message: errroResponse.error })
  }
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
