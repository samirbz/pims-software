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
import { useMyContext } from "@/context/MyContext"

import {
  saveGapa,
  deleteGapa,
  fetchGapaData,
  editGapa,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

export default function Gapa() {
  const [gapa, setGapa] = useState("")
  const [gapaData, setGapaData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(gapaData.length / rowsPerPage)
  const { value } = useMyContext()

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return gapaData.slice(start, end)
  }, [page, gapaData])

  const fetchGapa = async () => {
    try {
      setLoading(true)
      const data = await fetchGapaData(value || "")
      setGapaData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    setBtnDisable(true)

    const trimmedName = gapa.trimEnd()

    if (editMode && editId) {
      // In edit mode, check if the `gapa` exists in other records, excluding the one being edited
      const existsInOtherItems = gapaData.some(
        (data) => data.gapa === trimmedName && data.id !== editId
      )

      if (existsInOtherItems) {
        toast.error("Item already exists")
        setBtnDisable(false)
        return
      }

      // Proceed with the edit operation
      const result = await editGapa(editId, trimmedName, value || "")
      if (result.status === "success") {
        setGapa("")
        setEditMode(false)
        setEditId(null)
        fetchGapa()
      } else {
        console.error("Error occurred during edit")
      }
    } else {
      // In create mode, check if the item already exists
      const exists = gapaData.some((data) => data.gapa === trimmedName)

      if (exists) {
        toast.error("Item already exists")
      } else {
        // Proceed with save operation
        const result = await saveGapa(trimmedName, value || "")
        if (result.status === "success") {
          setGapa("")
          fetchGapa()
        } else {
          console.error("Error occurred during save")
        }
      }
    }

    setBtnDisable(false)
  }

  const handleEdit = (item: any) => {
    setGapa(item.gapa)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setGapa("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
      const fetchGapa = async () => {
        try {
          setLoading(true)
          const data = await fetchGapaData(value || "")
          setGapaData(data)
        } catch (error) {
          console.error("Error fetching fiscal years:", error)
        } finally {
          setLoading(false)
        }
      }
    fetchGapa()
  }, [value])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteGapa(deleteId, value || "")
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchGapa()
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
          कार्यालयको नाम
        </h1>
        <br />
        <div className="flex w-full gap-2">
          <Input
            type="text"
            label="कार्यालय नाम"
            size="sm"
            value={gapa}
            onChange={(e) => setGapa(e.target.value)}
          />
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            isDisabled={!gapa.trimEnd() || btnDisable}
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
              <TableColumn>पलिकको नाम</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.gapa}</TableCell>
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
