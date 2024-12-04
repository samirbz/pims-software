"use client"
import React, { useEffect, useState } from "react"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import { toast } from "react-toastify"
import { ConvertToNepaliNumerals } from "@/lib/util"

export default function FiscalYearPage() {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  // const [fy, setFy] = useState<string>("")
  const [autofyStart, setAutoFyStart] = useState<string>("")
  const [autofyEnd, setAutoFyEnd] = useState<string>("")
  const [autofy, setAutoFy] = useState<string>("")
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
    if (!startDate || !endDate) {
      toast.error("Please choose all fields")
      return
    }
    const result = await saveFiscalYearDate(startDate, endDate, autofy)
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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteFyDate(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchFiscalYears()
      } else {
        console.error("Delete unsuccessful")
      }
      setIsModalOpen(false)
      setDeleteId(null)
    }
  }

  const handleFiscalYearStart = (value: string) => {
    setStartDate(value)
    setAutoFyStart(value)
  }
  const handleFiscalYearEnd = (value: string) => {
    setEndDate(value)
    setAutoFyEnd(value)
  }

  useEffect(() => {
    const text = `${autofyStart} / ${autofyEnd}`
    const [start, end] = text.split(" / ") // Split by " / "
    const startYear = start.substring(0, 4) // Extract first 4 characters from start
    const endYear = end.substring(2, 4) // Extract last 2 characters from end
    setAutoFy(`${startYear}/${endYear}`)
  }, [startDate, endDate, autofyStart, autofyEnd])

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
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
                onChange={handleFiscalYearStart}
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
              onChange={handleFiscalYearEnd}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
        <br />
        <div className="flex items-center gap-4 md:flex-row">
          <div>
            <p className="text-sm md:text-base">आर्थिक बर्ष</p>
            <p className="mb-2 w-auto rounded-md border-1 p-1">{autofy}</p>
            <Button
              color="secondary"
              startContent={<FaRegSave />}
              onClick={onSubmit}
              className="w-full md:w-auto"
              isDisabled={!endDate || !startDate}
            >
              Save
            </Button>
          </div>
        </div>
        <br />
        <span className="text-sm text-black">
          (आर्थिक वर्ष क्रम्बद्द सेट गर्नुहोस)
        </span>
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
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {ConvertToNepaliNumerals(year.startDate)}
                  </TableCell>
                  <TableCell>{ConvertToNepaliNumerals(year.endDate)}</TableCell>
                  <TableCell>{ConvertToNepaliNumerals(year.fy)}</TableCell>
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
                          onPress={() => confirmDelete(year.id)}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
