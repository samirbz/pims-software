"use client"
import React, { useEffect, useState } from "react"
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { FaCirclePlus } from "react-icons/fa6"
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

  const onSubmit = async () => {
    const result = await saveFiscalYearDate(startDate, endDate, fy)
    if (result.status === "success") {
      window.location.reload()
    } else {
      console.error("Delete unsuccessful:")
    }
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

  const handleDelete = async (id: string) => {
    const result = await deleteFyDate(id)
    if (result.status === "success") {
      window.location.reload()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="self-start text-2xl">
          टिप्पणी सदर गर्ने कर्मचारीको विवरण
        </h1>
        <br />
        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <Input type="text" label="तयार गर्नेको नाम" size="sm" />
            <Input type="text" label="पद" size="sm" />
            <div className="w-full flex-col sm:flex">
              <Checkbox size="sm">टिप्पणीमा देखाउने हो ?</Checkbox>
              <Checkbox size="sm">तयार गर्नेको नाम पद देखाउने हो ?</Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input type="text" label="पेश गर्नेको नाम" size="sm" />
            <Input type="text" label="पद" size="sm" />
            <div className="w-full flex-col sm:flex">
              <Checkbox size="sm">टिप्पणीमा देखाउने हो ?</Checkbox>
              <Checkbox size="sm">पेश गर्नेको नाम पद देखाउने हो ?</Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input type="text" label="सिफारिस/रुजु गर्ने " size="sm" />
            <Input type="text" label="पद" size="sm" />
            <div className="w-full flex-col sm:flex">
              <Checkbox size="sm">टिप्पणीमा देखाउने हो ?</Checkbox>
              <Checkbox size="sm">सिफारिस गर्नेको नाम पद देखाउने हो ?</Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input type="text" label="सदर गर्नेको नाम" size="sm" />
            <Input type="text" label="पद" size="sm" />
            <div className="w-full flex-col sm:flex">
              <Checkbox size="sm">टिप्पणीमा देखाउने हो ?</Checkbox>
              <Checkbox size="sm">सदर गर्नेको नाम पद देखाउने हो ?</Checkbox>
            </div>
          </div>
        </div>
        <br />
        <div className="flex gap-4">
          <Checkbox size="sm">
            सिफारिस / रुजु गर्ने अमानतको टिप्पणीमा देखाउने हो ?{" "}
          </Checkbox>
          <Checkbox size="sm">
            सिफारिस / रुजु गर्ने उपभोक्तको टिप्पणीमा देखाउने हो ?
          </Checkbox>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
        <br />
        <div className="overflow-x-auto">
          <table className="min-w-[40rem] border-collapse border border-gray-200 ">
            <thead className=" bg-purple-400">
              <tr>
                <th className="border border-purple-400 px-4 py-2">सि.न.</th>
                <th className="border border-purple-400 px-4 py-2">
                  सदर गर्नेको नाम
                </th>
                <th className="border border-purple-400 px-4 py-2">
                  सदर गर्नेको पद
                </th>
                <th className="border border-purple-400 px-4 py-2">
                  सिफारिस गर्नेको नाम
                </th>
                <th className="border border-purple-400 px-4 py-2">
                  सिफारिस गर्नेको पद
                </th>
                <th className="border border-purple-400 px-4 py-2">
                  पेश गर्नेको नाम
                </th>
                <th className="border border-purple-400 px-4 py-2">
                  पेश गर्ने पद
                </th>
                <th className="border border-purple-400 px-4 py-2">
                  तयार गर्ने
                </th>
                <th className="border border-purple-400 px-4 py-2">
                  तयार गर्नेको पद
                </th>
                <th className="border border-purple-400 px-4 py-2">Edit</th>
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
                  <td className="border border-gray-200 px-4 py-2">
                    {year.fy}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {year.fy}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {year.fy}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {year.fy}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {year.fy}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="shadow" size="sm">
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
      </div>
    </div>
  )
}
