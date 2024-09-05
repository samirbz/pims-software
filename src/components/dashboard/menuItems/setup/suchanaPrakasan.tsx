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
  saveSuchanaPrakasan,
  fetchSuchanaPrakasanData,
  deleteSuchanaPrakasan,
  editSuchanaPrakasan,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

export default function SuchanaPrakasan() {
  const [suchanaPrakasan, setSuchanaPrakasan] = useState("")
  const [suchanaPrakasanData, setSuchanaPrakasanData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

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

  const onSubmit = async () => {
    setBtnDisable(true)

    const result = suchanaPrakasanData.some(
      (data) => data.suchanaPrakasan === suchanaPrakasan
    )
    if (editMode && editId) {
      const result = await editSuchanaPrakasan(editId, suchanaPrakasan)
      if (result.status === "success") {
        setSuchanaPrakasan("")
        setEditMode(false)
        setEditId(null)
        fetchSuchanaPrakasan()
      } else {
        console.error("Error occurred during edit")
        setBtnDisable(true)
      }
    } else {
      if (result) {
        toast.error("item already exists")
        setBtnDisable(true)
      } else {
        const result = await saveSuchanaPrakasan(suchanaPrakasan)
        if (result.status === "success") {
          setSuchanaPrakasan("")
          fetchSuchanaPrakasan()
        } else {
          console.error("Error occurred during save")
          setBtnDisable(true)
        }
      }
    }
  }

  const handleEdit = (item: any) => {
    setSuchanaPrakasan(item.suchanaPrakasan)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setSuchanaPrakasan("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    fetchSuchanaPrakasan() // Fetch data when the component mounts
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteSuchanaPrakasan(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchSuchanaPrakasan()
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
            isDisabled={!suchanaPrakasan || btnDisable}
          >
            {editMode ? "Edit" : "Save"}
          </Button>
          {editMode && (
            <Button color="default" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
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
