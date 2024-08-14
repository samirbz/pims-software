"use client"
import React, { useEffect, useState } from "react"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import {
  deleteFyDate,
  fetchFyData,
  saveFiscalYearDate,
} from "@/actions/formAction"
import { MdModeEditOutline } from "react-icons/md"

export default function FiscalYearPage() {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [fy, setFy] = useState<string>("")
  const [fiscalYears, setFiscalYears] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const fetchFiscalYears = async () => {
    try {
      setLoading(true) // Set loading to true before fetching data
      const data = await fetchFyData()
      setFiscalYears(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  const onSubmit = async () => {
    const result = await saveFiscalYearDate(startDate, endDate, fy)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchFiscalYears()
    } else {
      console.error("Error occurred")
    }
  }

  useEffect(() => {
    fetchFiscalYears()
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteFyDate(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchFiscalYears()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  return (
    <div className="flex flex-col items-center px-4 sm:px-0">
      <div className="w-full max-w-2xl text-center">
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
          अर्थिक बर्ष सेट अप
        </h1>
        <br />
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <form className="flex flex-col gap-2 md:flex-row">
              <label htmlFor="date" className="text-sm md:text-base">
                आ.व सुरु मिति
              </label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1"
                value={startDate}
                onChange={(value: string) => setStartDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <p className="text-sm md:text-base">आ.व अन्तिम मिति</p>
            <NepaliDatePicker
              inputClassName="form-control"
              className="rounded-lg border p-1 "
              value={endDate}
              onChange={(value: string) => setEndDate(value)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
        <br />
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <p className="text-sm md:text-base">आर्थिक बर्ष</p>
          <select
            className="w-full rounded-lg border p-1 md:w-auto"
            value={fy}
            onChange={(event) => setFy(event.target.value)}
          >
            <option value="">Select</option>
            <option value="2081/82">2081/82</option>
            <option value="2082/83">2082/83</option>
            <option value="2083/84">2083/84</option>
          </select>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            className="w-full md:w-auto"
          >
            Save
          </Button>
        </div>
        <br />
        {loading ? ( // Show loading spinner while data is being fetched
          <div className="my-4 flex w-full justify-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <div className="mb-2 max-h-[28rem] w-full overflow-auto sm:mb-0">
            <table className="min-w-full sm:min-w-[40rem]">
              <thead className="sticky top-0 z-20 border-r-2 bg-purple-400">
                <tr>
                  <th className="p-2 text-sm sm:px-4 sm:py-2">सि.न.</th>
                  <th className="p-2 text-sm sm:px-4 sm:py-2">आ.व सुरु मिति</th>
                  <th className="p-2 text-sm sm:px-4 sm:py-2">
                    आ.व अन्तिम मिति
                  </th>
                  <th className="p-2 text-sm sm:px-4 sm:py-2">आ.व</th>
                  <th className="p-2 text-sm sm:px-4 sm:py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {fiscalYears.map((year, index) => (
                  <tr key={year.id}>
                    <td className="border border-gray-200 p-2 text-sm sm:px-4 sm:py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 p-2 text-sm sm:px-4 sm:py-2">
                      {year.startDate}
                    </td>
                    <td className="border border-gray-200 p-2 text-sm sm:px-4 sm:py-2">
                      {year.endDate}
                    </td>
                    <td className="border border-gray-200 p-2 text-sm sm:px-4 sm:py-2">
                      {year.fy}
                    </td>
                    <td className="border border-gray-200 p-2 text-sm sm:px-4 sm:py-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button className="z-10" variant="shadow" size="sm">
                            <MdModeEditOutline />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem>Edit</DropdownItem>

                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onPress={() => handleDelete(year.id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
