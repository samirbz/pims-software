"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import "nepali-datepicker-reactjs/dist/index.css"
import { MdModeEditOutline } from "react-icons/md"

import {
  saveAnudaanKoNaam,
  fetchAnudaanKoNaamData,
  deleteAnudaanKoNaam,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

export default function AnudanKisim() {
  const [anudaanKoNaam, setAnudaanKoNaam] = useState("")
  const [anudaanKoNaamData, setanudaanKoNaamData] = useState<any[]>([])

  const [loading, setLoading] = useState(true) // State for loading

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(anudaanKoNaamData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return anudaanKoNaamData.slice(start, end)
  }, [page, anudaanKoNaamData])

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
    <div className="flex flex-col justify-between bg-white">
      <h1 className="form-title text-xl font-semibold sm:text-2xl">
        सशर्त/निशर्त अनुदान{" "}
      </h1>
      <br />
      <div className="flex w-full gap-2">
        <Input
          type="text"
          label="अनुदानको नाम"
          size="sm"
          value={anudaanKoNaam} // Bind the input value to the state
          onChange={(e) => setAnudaanKoNaam(e.target.value)}
        />
        <Button
          color="secondary"
          startContent={<FaRegSave />}
          onClick={onSubmit}
          isDisabled={!anudaanKoNaam}
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
        <Table
          aria-label="Example table with dynamic content"
          className="h-auto min-w-full"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>सि.न.</TableColumn>
            <TableColumn>समिती को नाम</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.anudaanKoNaam}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className="z-10"
                        variant="shadow"
                        size="sm"
                        startContent={<MdModeEditOutline />}
                      ></Button>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
