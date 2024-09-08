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
  editLabTest,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

export default function LabTest() {
  const [karyalayaKoNaam, setKaryalayaKoNaam] = useState("")
  const [thegana, setThegana] = useState("")
  const [labTestData, setlabTestData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

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
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    setBtnDisable(true)

    if (editMode && editId) {
      // In edit mode, check if `karyalayaKoNaam` exists in other records, excluding the one being edited
      const existsInOtherItems = labTestData.some(
        (data) => data.karyalayaKoNaam === karyalayaKoNaam && data.id !== editId
      )

      if (existsInOtherItems) {
        toast.error("Item already exists")
        setBtnDisable(false)
        return
      }

      // Proceed with the edit operation
      const result = await editLabTest(editId, karyalayaKoNaam, thegana)
      if (result.status === "success") {
        setKaryalayaKoNaam("")
        setThegana("")
        setEditMode(false)
        setEditId(null)
        fetchLabTest()
      } else {
        console.error("Error occurred during edit")
      }
    } else {
      // In create mode, check if the `karyalayaKoNaam` already exists
      const exists = labTestData.some(
        (data) => data.karyalayaKoNaam === karyalayaKoNaam
      )

      if (exists) {
        toast.error("Item already exists")
      } else {
        // Proceed with save operation
        const result = await saveLabTest(karyalayaKoNaam, thegana)
        if (result.status === "success") {
          setKaryalayaKoNaam("")
          setThegana("")
          fetchLabTest()
        } else {
          console.error("Error occurred during save")
        }
      }
    }

    setBtnDisable(false)
  }

  const handleEdit = (item: any) => {
    setKaryalayaKoNaam(item.karyalayaKoNaam)
    setThegana(item.thegana)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setKaryalayaKoNaam("")
    setThegana("")
    setEditMode(false)
    setEditId(null)
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
              startContent={<FaRegSave />}
              onClick={onSubmit}
              isDisabled={!karyalayaKoNaam || !thegana || btnDisable}
            >
              {editMode ? "Edit" : "Save"}
            </Button>
            {editMode && (
              <Button color="default" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
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
              <TableColumn>कार्यालय नाम</TableColumn>
              <TableColumn>ठेगान</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
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
                        <DropdownItem onPress={() => handleEdit(item)}>
                          Edit
                        </DropdownItem>
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
