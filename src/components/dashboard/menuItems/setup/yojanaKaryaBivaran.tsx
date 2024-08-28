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
  fetchYojanaPrakarData,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

export default function YojanaKaryaBivaran() {
  const [yojanaKoKisim, setYojanaKoKisim] = useState("")
  const [yojanaKoKarya, setYojanaKoKarya] = useState("")
  const [yojanaKaryaBivaranData, setYojanaKaryaBivaranData] = useState<any[]>(
    []
  )
  const [yojanaPrakarData, setYojanaPrakarData] = useState<any[]>([])

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

  const fetchYojanaPrData = async () => {
    try {
      const data = await fetchYojanaPrakarData()
      console.log("Fetched yojana prakar data:", data) // For debugging
      setYojanaPrakarData(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  useEffect(() => {
    fetchYojanaKaryaBivaran()
    fetchYojanaPrData()
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
    try {
      const result = await saveYonanaKaryaBivaran(yojanaKoKisim, yojanaKoKarya)
      console.log(result) // Debugging line
      if (result.status === "success") {
        setYojanaKoKisim("")
        setYojanaKoKarya("")
        fetchYojanaKaryaBivaran()
      } else {
        console.error("Error occurred:", result)
      }
    } catch (error) {
      console.error("API error:", error)
    }
  }

  return (
    <div className="flex flex-col justify-between bg-white">
      <h1 className="form-title text-xl font-semibold sm:text-2xl ">
        योजनाको किसिम अनुसार कार्य बिवरण
      </h1>
      <br />
      <div className="flex w-full flex-col gap-2">
        <Select
          label="योजनाको किसिम  "
          size="sm"
          onChange={(e) => setYojanaKoKisim(e.target.value)}
        >
          {yojanaPrakarData.map((item) => (
            <SelectItem key={item.yojanaPrakar}>{item.yojanaPrakar}</SelectItem>
          ))}
        </Select>
        <div className="flex gap-2">
          <Input
            label="योजनाको कार्य​"
            size="sm"
            value={yojanaKoKarya}
            onChange={(e) => setYojanaKoKarya(e.target.value)}
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
                <TableCell>{item.yojanaKoKarya}</TableCell>
                <TableCell>{item.yojanaKoKisim}</TableCell>
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
