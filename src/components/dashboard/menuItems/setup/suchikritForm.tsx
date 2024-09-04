"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
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
import { MdModeEditOutline } from "react-icons/md"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"

import {
  saveSuchikritForm,
  fetchSuchikritFormData,
  deleteSuchikritForm,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

export default function SuchikritForm() {
  const [formKoNaam, setFormKoNaam] = useState("")
  const [dartaMiti, setDartaMiti] = useState("")
  const [formKoThegana, setFormKoThegana] = useState("")
  const [panVat, setPanVat] = useState("")
  const [companyDartaNum, setCompanyDartaNum] = useState("")
  const [pramanPatraSankhya, setPramanPatraSankhya] = useState("")
  const [phoneNum, setPhoneNum] = useState("")
  const [suchiDartaNum, setSuchiDartaNum] = useState("")
  const [suchikritHunaChahekoKharid, setSuchikritHunaChahekoKharid] =
    useState("")
  const [suchikritFormData, setSuchikritFormData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(suchikritFormData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return suchikritFormData.slice(start, end)
  }, [page, suchikritFormData])

  const fetchSuchikritForm = async () => {
    try {
      setLoading(false)
      const data = await fetchSuchikritFormData()
      setSuchikritFormData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    const result = await saveSuchikritForm(
      formKoNaam,
      dartaMiti,
      formKoThegana,
      panVat,
      companyDartaNum,
      pramanPatraSankhya,
      phoneNum,
      suchiDartaNum,
      suchikritHunaChahekoKharid
    )
    if (result.status === "success") {
      // Reset the input field after successful submission
      setFormKoNaam("")
      setDartaMiti("")
      setFormKoThegana("")
      setPanVat("")
      setCompanyDartaNum("")
      setPramanPatraSankhya("")
      setPhoneNum("")
      setSuchiDartaNum("")
      setSuchikritHunaChahekoKharid("")
      // Fetch the updated list of data
      fetchSuchikritForm()
    } else {
      console.error("Error occurred")
    }
  }

  useEffect(() => {
    fetchSuchikritForm() // Fetch data when the component mounts
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteSuchikritForm(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchSuchikritForm()
      } else {
        console.error("Delete unsuccessful")
      }
      setIsModalOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
        <h1 className="form-title text-xl font-semibold sm:text-2xl ">
          फर्म कम्पनी सुची दार्त
        </h1>
        <br />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-8 sm:flex-row ">
            <Input
              type="text"
              label="फर्मको नाम "
              size="sm"
              value={formKoNaam}
              onChange={(e) => setFormKoNaam(e.target.value)}
            />

            <div className="mr-20 flex flex-col items-center gap-4 md:flex-row">
              <p className="whitespace-nowrap text-sm md:text-base">
                दर्ता मिति
              </p>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1 "
                value={dartaMiti}
                onChange={(value: string) => setDartaMiti(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label="फर्मको ठेगान"
              size="sm"
              value={formKoThegana}
              onChange={(e) => setFormKoThegana(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label="पान भ्याट न."
              size="sm"
              value={panVat}
              onChange={(e) => setPanVat(e.target.value)}
            />
            <Input
              type="text"
              label="कम्पनि दर्ता न."
              size="sm"
              value={companyDartaNum}
              onChange={(e) => setCompanyDartaNum(e.target.value)}
            />
            <Input
              type="text"
              label="प्रमाण पत्र संख्याः "
              size="sm"
              value={pramanPatraSankhya}
              onChange={(e) => setPramanPatraSankhya(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="फोन न."
              size="sm"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
            <Input
              type="text"
              label="सुची दर्ता नः"
              size="sm"
              value={suchiDartaNum}
              onChange={(e) => setSuchiDartaNum(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="सुचिकृत हुन चाहेको खरिद प्रकृतिको विवरण"
              size="sm"
              className="w-1/2"
              value={suchikritHunaChahekoKharid}
              onChange={(e) => setSuchikritHunaChahekoKharid(e.target.value)}
            />
            <Button
              color="secondary"
              startContent={<FaRegSave />}
              className="w-12"
              onClick={onSubmit}
              isDisabled={
                !suchikritHunaChahekoKharid ||
                !suchiDartaNum ||
                !phoneNum ||
                !pramanPatraSankhya ||
                !companyDartaNum ||
                !panVat ||
                !formKoThegana ||
                !dartaMiti ||
                !formKoNaam
              }
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
              <TableColumn>फर्मको नाम.</TableColumn>
              <TableColumn>ठेगाना</TableColumn>
              <TableColumn>पान न.</TableColumn>
              <TableColumn>सस्था दर्ता न.</TableColumn>
              <TableColumn>फोन न.</TableColumn>
              <TableColumn>दर्ता मिति</TableColumn>
              <TableColumn>सुचिकृत</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.formKoNaam}</TableCell>
                  <TableCell>{item.formKoThegana}</TableCell>
                  <TableCell>{item.panVat}</TableCell>
                  <TableCell>{item.companyDartaNum}</TableCell>
                  <TableCell>{item.phoneNum}</TableCell>
                  <TableCell>{item.dartaMiti}</TableCell>
                  <TableCell>{item.suchikritHunaChahekoKharid}</TableCell>
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
                          onPress={() => confirmDelete(item.id)}
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
          <ModalBody>
            Are you sure you want to delete this fiscal year?
          </ModalBody>
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
