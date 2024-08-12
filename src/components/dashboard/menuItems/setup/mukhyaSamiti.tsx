"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner, // Import Spinner from @nextui-org/react or any other loading component
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
  const [loading, setLoading] = useState(true) // State for loading

  const fetchMukhyaSamiti = async () => {
    try {
      setLoading(true) // Set loading to true before fetching data
      const data = await fetchMukyaSamitiData()
      setMukhyaSamitiKoNaamData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    fetchMukhyaSamiti() // Fetch data when the component mounts
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteMukyaSamitiKoNaam(id)
    if (result.status === "success") {
      fetchMukhyaSamiti() // Fetch the updated list of fiscal years
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await saveMukyaSamiti(mukhyaSamitiKoNaam)
    if (result.status === "success") {
      setMukhyaSamitiKoNaam("") // Reset the input field after successful submission
      fetchMukhyaSamiti() // Fetch the updated list of data
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
          value={mukhyaSamitiKoNaam}
          onChange={(e) => setMukhyaSamitiKoNaam(e.target.value)}
        />
        <Button
          color="secondary"
          startContent={<FaRegSave />}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
      {loading ? ( // Show loading spinner while data is being fetched
        <div className="my-4 flex w-full justify-center">
          <Spinner color="primary" />
        </div>
      ) : (
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
      )}
    </div>
  )
}
