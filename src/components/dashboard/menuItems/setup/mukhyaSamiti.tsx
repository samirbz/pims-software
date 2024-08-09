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
import { MdModeEditOutline } from "react-icons/md"
import { useState, useEffect } from "react"

import {
  saveMukyaSamiti,
  fetchMukyaSamitiData,
  deleteMukyaSamitiKoNaam,
} from "@/actions/formAction"

export default function MukhyaSamiti() {
  const [mukhyaSamitiKoNaam, setMukhyaSamitiKoNaam] = useState("")
  const [mukhyaSamitiKoNaamData, setMukhyaSamitiKoNaamData] = useState<any[]>(
    []
  )

  const fetchMukhyaSamiti = async () => {
    try {
      const data = await fetchMukyaSamitiData()
      setMukhyaSamitiKoNaamData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    }
  }

  useEffect(() => {
    fetchMukhyaSamiti() // Fetch data when the component mounts
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteMukyaSamitiKoNaam(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchMukhyaSamiti()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await saveMukyaSamiti(mukhyaSamitiKoNaam)
    if (result.status === "success") {
      // Reset the input field after successful submission
      setMukhyaSamitiKoNaam("")
      // Fetch the updated list of data
      fetchMukhyaSamiti()
    } else {
      console.error("Error occurred")
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 xxl:w-1/2">
      <h1 className="form-title">मुख्य समिती को नाम</h1>
      <div className="flex w-full gap-2">
        <Input
          type="text"
          label="मुख्य समिती को नाम"
          size="sm"
          value={mukhyaSamitiKoNaam} // Bind the input value to the state
          onChange={(e) => setMukhyaSamitiKoNaam(e.target.value)} // Handle input change
        />
        <Button
          color="secondary"
          startContent={<FaRegSave />}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
      <table className="w-full border-collapse border">
        <thead className="sticky top-0 z-20 border-r-2 bg-purple-400">
          <tr>
            <th className="w-24 px-4 py-2">सि.न.</th>
            <th className="px-4 py-2">समिती को नाम</th>
            <th className="w-24 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {mukhyaSamitiKoNaamData.map((item, index) => (
            <tr className="w-auto text-center" key={item.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.mukhyaSamitiKoNaam}</td>
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
