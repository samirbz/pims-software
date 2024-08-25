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
  saveBankBivaran,
  fetchBankBivaranData,
  deleteBankBivaran,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

export default function BankBivaran() {
  const [bankKoNaam, setBankKoNaam] = useState("")
  const [sakha, setSakha] = useState("")
  const [bankBivaranData, setBankBivaranData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(bankBivaranData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return bankBivaranData.slice(start, end)
  }, [page, bankBivaranData])

  const fetchBankBivaran = async () => {
    try {
      setLoading(false)
      const data = await fetchBankBivaranData()
      setBankBivaranData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
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
    <div className="flex flex-col justify-between bg-white p-5">
      <h1 className="form-title text-xl font-semibold sm:text-2xl">
        करोवार गर्ने बैंकहरु
      </h1>
      <br />
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
            <TableColumn>बैंकको नाम</TableColumn>
            <TableColumn>शाखा रहेको स्थान</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.bankKoNaam}</TableCell>
                <TableCell>{item.sakha}</TableCell>
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
