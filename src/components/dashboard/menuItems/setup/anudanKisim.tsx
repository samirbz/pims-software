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
  saveAnudaanKoNaam,
  fetchAnudaanKoNaamData,
  deleteAnudaanKoNaam,
  editAnudaanKoNaam,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

export default function AnudanKisim() {
  const [anudaanKoNaam, setAnudaanKoNaam] = useState("")
  const [anudaanKoNaamData, setanudaanKoNaamData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(anudaanKoNaamData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return anudaanKoNaamData.slice(start, end)
  }, [page, anudaanKoNaamData])

  const fetchAnudaan = async () => {
    try {
      setLoading(true)
      const data = await fetchAnudaanKoNaamData()
      setanudaanKoNaamData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  const onSubmit = async () => {
    setBtnDisable(true)
    if (editMode && editId) {
      const result = await editAnudaanKoNaam(editId, anudaanKoNaam)
      if (result.status === "success") {
        setAnudaanKoNaam("")
        setEditMode(false)
        setEditId(null)
        fetchAnudaan()
      } else {
        console.error("Error occurred during edit")
      }
    } else {
      if (
        anudaanKoNaamData.some((data) => data.anudaanKoNaam === anudaanKoNaam)
      ) {
        toast.error("Item already exists")
      } else {
        const result = await saveAnudaanKoNaam(anudaanKoNaam)
        if (result.status === "success") {
          setBtnDisable(true)
          setAnudaanKoNaam("")
          fetchAnudaan()
        } else {
          console.error("Error occurred during save")
        }
      }
    }
    setBtnDisable(false)
  }

  const handleEdit = (item: any) => {
    setAnudaanKoNaam(item.anudaanKoNaam)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setAnudaanKoNaam("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    fetchAnudaan() // Fetch data when the component mounts
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteAnudaanKoNaam(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchAnudaan()
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
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
          सशर्त/निशर्त अनुदान{" "}
        </h1>
        <br />
        <div className="flex w-full gap-2">
          <Input
            type="text"
            label="अनुदानको नाम"
            size="sm"
            value={anudaanKoNaam} // Bind the input value to the state
            onChange={(e) => setAnudaanKoNaam(e.target.value)}
          />
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            isDisabled={!anudaanKoNaam || btnDisable}
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
              <TableColumn>समिती को नाम</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.anudaanKoNaam}</TableCell>
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
