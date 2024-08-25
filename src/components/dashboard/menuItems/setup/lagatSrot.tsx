"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Select,
  SelectItem,
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
  saveLagatSrot,
  fetchLagatSrotData,
  deleteLagatSrot,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

const selectConfig = [
  { key: "1", label: "सशर्त अनुदान" },
  { key: "2", label: "निशर्त अनुदान" },
  { key: "3", label: "समपुरक अनुदान " },
  { key: "4", label: "बिशेष अनुदान" },
  { key: "5", label: "समानिकरण अनुदान" },
  { key: "6", label: "आन्तरिक श्रोत" },
  { key: "7", label: "संघिय सरकार " },
  { key: "8", label: "प्रदेश सरकार " },
  { key: "9", label: "प्रदेश सर्शत" },
]

export default function LagatSrot() {
  const [anudanKoKisim, setAnudanKoKisim] = useState("")
  const [lagatSrotKoNaam, setLagatSrotKoNaam] = useState("")
  const [lagatSrotData, setLagatSrotData] = useState<any[]>([])

  const [loading, setLoading] = useState(true) // State for loading

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(lagatSrotData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return lagatSrotData.slice(start, end)
  }, [page, lagatSrotData])

  const fetchLagatSrot = async () => {
    try {
      setLoading(true)
      const data = await fetchLagatSrotData()
      setLagatSrotData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    fetchLagatSrot() // Fetch data when the component mounts
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteLagatSrot(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchLagatSrot()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await saveLagatSrot(anudanKoKisim, lagatSrotKoNaam)
    if (result.status === "success") {
      // Reset the input field after successful submission
      setAnudanKoKisim("")
      setLagatSrotKoNaam("")
      // Fetch the updated list of data
      fetchLagatSrot()
    } else {
      console.error("Error occurred")
    }
  }

  return (
    <div className="flex flex-col justify-between bg-white p-5">
      <h1 className="form-title text-xl font-semibold sm:text-2xl">
        लागत श्रोतहरु
      </h1>
      <br />
      <div className="flex w-full flex-col gap-2">
        <Select
          label="अनुदान को किसिम"
          size="sm"
          onChange={(e) => setAnudanKoKisim(e.target.value)}
        >
          {selectConfig.map((item) => (
            <SelectItem key={item.label}>{item.label}</SelectItem>
          ))}
        </Select>
        <div className="flex gap-2">
          <Input
            type="text"
            label="लागत श्रोत नाम"
            size="sm"
            value={lagatSrotKoNaam}
            onChange={(e) => setLagatSrotKoNaam(e.target.value)}
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
            <TableColumn>अनुदान किसिम</TableColumn>
            <TableColumn>लागत श्रोत</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.anudanKoKisim}</TableCell>
                <TableCell>{item.lagatSrotKoNaam}</TableCell>
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
