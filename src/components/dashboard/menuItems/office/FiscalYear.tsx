"use client"
import React, { useEffect, useState } from "react"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import {
  deleteFyDate,
  fetchFyData,
  saveFiscalYearDate,
} from "@/actions/formAction"
import { MdModeEditOutline } from "react-icons/md"

export default function FiscalYearPage() {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [fy, setFy] = useState<string>("")
  const [fiscalYears, setFiscalYears] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(fiscalYears.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return fiscalYears.slice(start, end)
  }, [page, fiscalYears])

  const fetchFiscalYears = async () => {
    try {
      setLoading(true) // Set loading to true before fetching data
      const data = await fetchFyData()
      setFiscalYears(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  const onSubmit = async () => {
    const result = await saveFiscalYearDate(startDate, endDate, fy)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchFiscalYears()
    } else {
      console.error("Error occurred")
    }
  }

  useEffect(() => {
    fetchFiscalYears()
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteFyDate(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchFiscalYears()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between bg-white p-5">
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
          अर्थिक बर्ष सेटअप
        </h1>
        <br />
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <form className="flex flex-col gap-2 md:flex-row">
              <label htmlFor="date" className="text-sm md:text-base">
                आ.व सुरु मिति
              </label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1"
                value={startDate}
                onChange={(value: string) => setStartDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <p className="text-sm md:text-base">आ.व अन्तिम मिति</p>
            <NepaliDatePicker
              inputClassName="form-control"
              className="rounded-lg border p-1 "
              value={endDate}
              onChange={(value: string) => setEndDate(value)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
        <br />
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <p className="text-sm md:text-base">आर्थिक बर्ष</p>
          <select
            className="w-full rounded-lg border p-1 md:w-auto"
            value={fy}
            onChange={(event) => setFy(event.target.value)}
          >
            <option value="">Select</option>
            <option value="2081/82">2081/82</option>
            <option value="2082/83">2082/83</option>
            <option value="2083/84">2083/84</option>
          </select>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            className="w-full md:w-auto"
          >
            Save
          </Button>
        </div>
        <br />
        {loading ? (
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
              <TableColumn>आ.व सुरु मिति</TableColumn>
              <TableColumn>आ.व अन्तिम मिति</TableColumn>
              <TableColumn>आ.व</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((year, index) => (
                <TableRow key={year.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{year.startDate}</TableCell>
                  <TableCell>{year.endDate}</TableCell>
                  <TableCell>{year.fy}</TableCell>
                  <TableCell>
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
                          onPress={() => handleDelete(year.id)}
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
    </>
  )
}
