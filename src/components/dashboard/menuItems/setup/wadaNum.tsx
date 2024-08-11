"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import "nepali-datepicker-reactjs/dist/index.css"
import { MdModeEditOutline } from "react-icons/md"

import {
  savewadaNum,
  fetchWadaNumData,
  deleteWadaNum,
} from "@/actions/formAction"
import { useState, useEffect } from "react"

export default function Wada() {
  const [wadaNum, setWadaNum] = useState("")
  const [wadaNumData, setWadaNumData] = useState<any[]>([])

  const fetchWadaNum = async () => {
    try {
      const data = await fetchWadaNumData()
      setWadaNumData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    }
  }

  useEffect(() => {
    fetchWadaNum() // Fetch data when the component mounts
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteWadaNum(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchWadaNum()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await savewadaNum(wadaNum)
    if (result.status === "success") {
      // Reset the input field after successful submission
      setWadaNum("")
      // Fetch the updated list of data
      fetchWadaNum()
    } else {
      console.error("Error occurred")
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 xxl:w-1/2">
      <h1 className="form-title">वडा सेटअप </h1>
      <div className="flex w-full gap-2">
        <Input
          type="text"
          label="वडा न."
          size="sm"
          value={wadaNum}
          onChange={(e) => setWadaNum(e.target.value)}
        />
        <Button
          color="secondary"
          startContent={<FaRegSave />}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
      <table className=" w-full border-collapse border ">
        <thead className="sticky top-0  z-20 border-r-2 bg-purple-400">
          <tr>
            <th className="w-24 px-4 py-2">सि.न.</th>
            <th className=" px-4 py-2">वडा न.</th>
            <th className="w-24 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {wadaNumData.map((item, index) => (
            <tr className="w-auto text-center" key={item.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.wadaNum}</td>
              <td className="border px-4 py-2">
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
                      onPress={() => handleDelete(item.id)}
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
  )
}
