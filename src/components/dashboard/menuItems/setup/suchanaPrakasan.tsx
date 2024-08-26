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
  saveSuchanaPrakasan,
  fetchSuchanaPrakasanData,
  deleteSuchanaPrakasan,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

export default function SuchanaPrakasan() {
  const [suchanaPrakasan, setSuchanaPrakasan] = useState("")
  const [suchanaPrakasanData, setSuchanaPrakasanData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(suchanaPrakasanData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return suchanaPrakasanData.slice(start, end)
  }, [page, suchanaPrakasanData])

  const fetchSuchanaPrakasan = async () => {
    try {
      setLoading(false)
      const data = await fetchSuchanaPrakasanData()
      setSuchanaPrakasanData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSuchanaPrakasan() // Fetch data when the component mounts
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteSuchanaPrakasan(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchSuchanaPrakasan()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await saveSuchanaPrakasan(suchanaPrakasan)
    if (result.status === "success") {
      // Reset the input field after successful submission
      setSuchanaPrakasan("")
      // Fetch the updated list of data
      fetchSuchanaPrakasan()
    } else {
      console.error("Error occurred")
    }
  }

  return (
    <div className="flex flex-col justify-between bg-white">
      <h1 className="form-title text-xl font-semibold sm:text-2xl ">
        बोलपत्र/दरभाउ प्रकासन गर्ने पत्रिकाको बिवरण{" "}
      </h1>
      <br />
      <div className="flex w-full gap-2">
        <Input
          type="text"
          label="पत्रिकाको नाम"
          size="sm"
          value={suchanaPrakasan}
          onChange={(e) => setSuchanaPrakasan(e.target.value)}
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
            <TableColumn>पत्रिकाको नाम</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.suchanaPrakasan}</TableCell>
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
      {/* <table className=" w-full border-collapse border ">
        <thead className="sticky top-0  z-20 border-r-2 bg-purple-400">
          <tr>
            <th className="w-24 px-4 py-2">सि.न.</th>
            <th className=" px-4 py-2">पत्रिकाको नाम</th>
            <th className="w-24 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {suchanaPrakasanData.map((item, index) => (
            <tr className="w-auto text-center" key={item.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.suchanaPrakasan}</td>
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
      </table> */}
    </div>
  )
}
