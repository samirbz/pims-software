"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { FaCirclePlus } from "react-icons/fa6"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { fetchFyData, saveFiscalYearDate } from "@/actions/formAction"

export default function FiscalYearPage() {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [fy, setFy] = useState<string>("")
  const [fiscalYears, setFiscalYears] = useState<any[]>([])

  const onSubmit = async () => {
    saveFiscalYearDate(startDate, endDate, fy)
  }

  const fetchDate = async () => {
    try {
      const data = await fetchFyData()
      setFiscalYears(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    }
  }

  useEffect(() => {
    fetchDate()
  }, [])

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="self-start text-2xl">अर्थिक बर्ष सेट अप</h1>
        <br />
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex items-center gap-4">
            <form className="flex gap-2">
              <label htmlFor="date">आ.व सुरु मिति</label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="border"
                value={startDate}
                onChange={(value: string) => setStartDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
          </div>
          <div className="flex items-center gap-4">
            <p>आ.व अन्तिम मिति</p>
            <NepaliDatePicker
              inputClassName="form-control"
              className="border"
              value={endDate}
              onChange={(value: string) => setEndDate(value)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
        <br />
        <div className="flex items-center gap-4">
          <p>arthik barsha</p>
          <select
            className="rounded-sm border p-1"
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
          >
            Save
          </Button>
          <Button color="secondary" startContent={<FaCirclePlus />}>
            AddNew
          </Button>
        </div>
        <br />
        <div className="overflow-x-auto">
          <table className="min-w-[40rem] border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">सि.न.</th>
                <th className="border border-gray-200 px-4 py-2">
                  आ.व सुरु मिति
                </th>
                <th className="border border-gray-200 px-4 py-2">
                  आ.व अन्तिम मिति
                </th>
                <th className="border border-gray-200 px-4 py-2">आ.व</th>
              </tr>
            </thead>
            <tbody>
              {fiscalYears.map((year, index) => (
                <tr key={year.id}>
                  <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {year.startDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {year.endDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {year.fy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
