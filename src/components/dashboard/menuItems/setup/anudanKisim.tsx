"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import "nepali-datepicker-reactjs/dist/index.css"
import { MdModeEditOutline } from "react-icons/md"

import {
  saveAnudaanKoNaam,
  fetchAnudaanKoNaamData,
  deleteAnudaanKoNaam,
} from "@/actions/formAction"
import { useState, useEffect } from "react"

export default function AnudanKisim() {
  const [anudaanKoNaam, setAnudaanKoNaam] = useState("")
  const [anudaanKoNaamData, setanudaanKoNaamData] = useState<any[]>([])

  const [loading, setLoading] = useState(true) // State for loading

  const fetchMukhyaSamiti = async () => {
    try {
      setLoading(true)
      const data = await fetchAnudaanKoNaamData()
      setanudaanKoNaamData(data)
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
    const result = await deleteAnudaanKoNaam(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchMukhyaSamiti()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await saveAnudaanKoNaam(anudaanKoNaam)
    if (result.status === "success") {
      // Reset the input field after successful submission
      setAnudaanKoNaam("")
      // Fetch the updated list of data
      fetchMukhyaSamiti()
    } else {
      console.error("Error occurred")
    }
  }

  return (
    <div className="flex w-full flex-col items-center sm:px-0">
      <div className="w-full text-center">
        <h1 className="form-title">सशर्त/निशर्त अनुदान </h1>
        <br />
        <div className="flex w-full gap-2">
          <Input
            type="text"
            label="अनुदान को नाम"
            size="sm"
            value={anudaanKoNaam} // Bind the input value to the state
            onChange={(e) => setAnudaanKoNaam(e.target.value)}
          />
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
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
            <table className="min-w-full ">
              <thead className="sticky top-0  z-20 border-r-2 bg-purple-400">
                <tr>
                  <th className="p-2 text-sm sm:px-4 sm:py-2">सि.न.</th>
                  <th className="p-2 text-sm sm:px-4 sm:py-2">समिती को नाम</th>
                  <th className="p-2 text-sm sm:px-4 sm:py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {anudaanKoNaamData.map((item, index) => (
                  <tr className="w-auto text-center" key={item.id}>
                    <td className="border border-gray-200 p-2 text-sm sm:px-4 sm:py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 p-2 text-sm sm:px-4 sm:py-2">
                      {item.anudaanKoNaam}
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
        )}
      </div>
    </div>
  )
}
