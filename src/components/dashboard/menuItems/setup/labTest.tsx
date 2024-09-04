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
import "nepali-datepicker-reactjs/dist/index.css"
import { MdModeEditOutline } from "react-icons/md"
import {
  fetchLabTestData,
  deleteLabTest,
  saveLabTest,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

export default function LabTest() {
  const [karyalayaKoNaam, setKaryalayaKoNaam] = useState("")
  const [thegana, setThegana] = useState("")
  const [labTestData, setlabTestData] = useState<any[]>([])

  const [loading, setLoading] = useState(true) // State for loading

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(labTestData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return labTestData.slice(start, end)
  }, [page, labTestData])

  const fetchLabTest = async () => {
    try {
      setLoading(true)
      const data = await fetchLabTestData()
      setlabTestData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  const onSubmit = async () => {
    const result = await saveLabTest(karyalayaKoNaam, thegana)
    if (result.status === "success") {
      // Reset the input field after successful submission
      setKaryalayaKoNaam("")
      setThegana("")
      // Fetch the updated list of data
      fetchLabTest()
    } else {
      console.error("Error occurred")
    }
  }

  useEffect(() => {
    fetchLabTest() // Fetch data when the component mounts
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteLabTest(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchLabTest()
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
          Lab Test Office
        </h1>
        <br />
        <div className="flex w-full flex-col gap-2">
          <Input
            type="text"
            label="कार्यालय नाम"
            size="sm"
            value={karyalayaKoNaam}
            onChange={(e) => setKaryalayaKoNaam(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="text"
              label=" ठेगान "
              size="sm"
              value={thegana}
              onChange={(e) => setThegana(e.target.value)}
            />
            <Button
              color="secondary"
              className="w-10 self-center"
              startContent={<FaRegSave />}
              onClick={onSubmit}
              isDisabled={!thegana || !karyalayaKoNaam}
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
              <TableColumn>कार्यालय नाम</TableColumn>
              <TableColumn>ठेगान</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.karyalayaKoNaam}</TableCell>
                  <TableCell>{item.thegana}</TableCell>
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
