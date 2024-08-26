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
  saveYonanaKaryaBivaran,
  fetchYojanaKaryaBivaranData,
  deleteYojanaKarayBivaran,
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

export default function YojanaKaryaBivaran() {
  const [anudanKoKisim, setAnudanKoKisim] = useState("")
  const [lagatSrot, setLagatSrot] = useState("")
  const [yojanaKaryaBivaranData, setYojanaKaryaBivaranData] = useState<any[]>(
    []
  )

  const [loading, setLoading] = useState(true) // State for loading

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(yojanaKaryaBivaranData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return yojanaKaryaBivaranData.slice(start, end)
  }, [page, yojanaKaryaBivaranData])

  const fetchYojanaKaryaBivaran = async () => {
    try {
      setLoading(true)
      const data = await fetchYojanaKaryaBivaranData()
      setYojanaKaryaBivaranData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    fetchYojanaKaryaBivaran() // Fetch data when the component mounts
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteYojanaKarayBivaran(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchYojanaKaryaBivaran()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await saveYonanaKaryaBivaran(anudanKoKisim, lagatSrot)
    if (result.status === "success") {
      // Reset the input field after successful submission
      setAnudanKoKisim("")
      setLagatSrot("")
      // Fetch the updated list of data
      fetchYojanaKaryaBivaran()
    } else {
      console.error("Error occurred")
    }
  }

  return (
    <div className="flex flex-col justify-between bg-white">
      <h1 className="form-title text-xl font-semibold sm:text-2xl">
        योजनाको किसिम अनुसार कार्य बिवरण
      </h1>
      <br />
      <div className="flex w-full flex-col gap-2">
        <Select
          label="अनुदान को किसिम "
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
            value={lagatSrot}
            onChange={(e) => setLagatSrot(e.target.value)}
          />
          <Button
            color="secondary"
            className="w-10 self-center"
            startContent={<FaRegSave />}
            size="sm"
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
            <TableColumn>योजनाको कार्य</TableColumn>
            <TableColumn>योजनाको किसिम</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.anudanKoKisim}</TableCell>
                <TableCell>{item.lagatSrot}</TableCell>
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
            <th className=" px-4 py-2">योजनाको कार्य</th>
            <th className=" px-4 py-2">योजनाको किसिम</th>
            <th className="w-24 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-auto text-center">
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
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
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  )
}
