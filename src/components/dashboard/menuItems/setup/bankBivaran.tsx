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
  saveBankBivaran,
  fetchBankBivaranData,
  deleteBankBivaran,
} from "@/actions/formAction"
import { useState, useEffect } from "react"

export default function BankBivaran() {
  const [bankKoNaam, setBankKoNaam] = useState("")
  const [sakha, setSakha] = useState("")
  const [bankBivaranData, setBankBivaranData] = useState<any[]>([])

  const fetchBankBivaran = async () => {
    try {
      const data = await fetchBankBivaranData()
      setBankBivaranData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    }
  }

  useEffect(() => {
    fetchBankBivaran() // Fetch data when the component mounts
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteBankBivaran(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchBankBivaran()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await saveBankBivaran(bankKoNaam, sakha)
    if (result.status === "success") {
      // Reset the input field after successful submission
      setBankKoNaam("")
      setSakha("")
      // Fetch the updated list of data
      fetchBankBivaran()
    } else {
      console.error("Error occurred")
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 xxl:w-1/2">
      <h1 className="form-title">करोवार गर्ने बैंकहरु </h1>
      <div className="flex w-full flex-col gap-2">
        <Input
          type="text"
          label="बैंकको नाम "
          size="sm"
          value={bankKoNaam}
          onChange={(e) => setBankKoNaam(e.target.value)}
        />
        <div className="flex gap-2">
          <Input
            type="text"
            label="शाखा "
            size="sm"
            value={sakha}
            onChange={(e) => setSakha(e.target.value)}
          />
          <Button
            color="secondary"
            className="w-10 self-center"
            startContent={<FaRegSave />}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      </div>
      <table className=" w-full border-collapse border ">
        <thead className="sticky top-0  z-20 border-r-2 bg-purple-400">
          <tr>
            <th className="w-24 px-4 py-2">सि.न.</th>
            <th className=" px-4 py-2">बैंकको नाम</th>
            <th className=" px-4 py-2">शाखा रहेको स्थान </th>
            <th className="w-24 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {bankBivaranData.map((item, index) => (
            <tr className="w-auto text-center" key={item.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.bankKoNaam}</td>
              <td className="border px-4 py-2">{item.sakha}</td>
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
