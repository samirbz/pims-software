import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import nookies from "nookies"

interface MyContextType {
  value: string | null
  setValue: (newValue: string) => void
  clearValue: () => void // Add clearValue to the context type
}

const MyContext = createContext<MyContextType | undefined>(undefined)

interface MyContextProviderProps {
  children: ReactNode
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [value, setValueState] = useState<string | null>(null)

  // Set value and update cookies
  const setValue = (newValue: string) => {
    setValueState(newValue)
    nookies.set(null, "fiscalYear", newValue, { path: "/" }) // Set cookie
  }

  // Clear value and remove cookies
  const clearValue = () => {
    setValueState(null)
    nookies.destroy(null, "fiscalYear", { path: "/" }) // Remove cookie
  }

  // Initialize state from cookies
  useEffect(() => {
    const cookies = nookies.get(null)
    setValueState(cookies.fiscalYear || null) // Retrieve cookie
  }, [])

  return (
    <MyContext.Provider value={{ value, setValue, clearValue }}>
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider")
  }
  return context
}
