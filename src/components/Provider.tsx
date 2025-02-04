"use client"
import { NextUIProvider } from "@nextui-org/react"
import React, { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import { MyContextProvider, PlaceContextProvider,DistrictContextProvider,OfficeContextProvider,PradeshContextProvider } from "../context/MyContext"
import "react-toastify/dist/ReactToastify.css"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        className="z-50"
      />
      <MyContextProvider>
        <PlaceContextProvider><DistrictContextProvider><OfficeContextProvider><PradeshContextProvider>{children}</PradeshContextProvider></OfficeContextProvider></DistrictContextProvider> </PlaceContextProvider>
      </MyContextProvider>
    </NextUIProvider>
  )
}
