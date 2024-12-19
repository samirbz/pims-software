import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import nookies from "nookies"

const listName ={
  nagarpalika:"गोदावरी नगरपालिका",
  district:"ललितपुर"
}

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

// Define types for PlaceContext
interface PlaceContextType {
  place: string
  setPlace: (newPlace: string) => void
}

interface PlaceContextProviderProps {
  children: React.ReactNode
}

// Create PlaceContext
const PlaceContext = createContext<PlaceContextType | undefined>(undefined)

export const PlaceContextProvider = ({
  children,
}: PlaceContextProviderProps) => {
  const [place, setPlaceState] = useState<string>(listName.nagarpalika)

  // Set place
  const setPlace = (newPlace: string) => {
    setPlaceState(newPlace)
  }

  return (
    <PlaceContext.Provider value={{ place, setPlace }}>
      {children}
    </PlaceContext.Provider>
  )
}

export const usePlaceContext = (): PlaceContextType => {
  const context = useContext(PlaceContext)
  if (!context) {
    throw new Error(
      "usePlaceContext must be used within a PlaceContextProvider"
    )
  }
  return context
}




// Define types for DistrictContext
interface DistrictContextType {
    district: string
    setDistrict: (newDistrict: string) => void
  }
  
  interface DistrictContextProviderProps {
    children: React.ReactNode
  }
  
  // Create DistrictContext
  const DistrictContext = createContext<DistrictContextType | undefined>(undefined)
  
  export const DistrictContextProvider = ({
    children,
  }: DistrictContextProviderProps) => {
    const [district, setDistrictState] = useState<string>(listName.district)
  
    // Set district
    const setDistrict = (newDistrict: string) => {
      setDistrictState(newDistrict)
    }
  
    return (
      <DistrictContext.Provider value={{ district, setDistrict }}>
        {children}
      </DistrictContext.Provider>
    )
  }
  
  export const useDistrictContext = (): DistrictContextType => {
    const context = useContext(DistrictContext)
    if (!context) {
      throw new Error(
        "useDistrictContext must be used within a DistrictContextProvider"
      )
    }
    return context
  }
  