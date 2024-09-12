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
  savewadaNum,
  fetchWadaNumData,
  deleteWadaNum,
  editWadaNum,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ConvertToNepaliNumerals } from "@/lib/util"

export default function Wada() {
  const [wadaNum, setWadaNum] = useState("")
  const [wadaNumData, setWadaNumData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(wadaNumData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return wadaNumData.slice(start, end)
  }, [page, wadaNumData])

  const fetchWadaNum = async () => {
    try {
      setLoading(true)
      const data = await fetchWadaNumData()
      setWadaNumData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    setBtnDisable(true)

    const trimmedName = wadaNum.trimEnd()

    // Check if the item exists only when not in edit mode
    const result = wadaNumData.some((data) => data.wadaNum === trimmedName)

    if (editMode && editId) {
      // In edit mode, don't check for duplicates against the current edited item
      setBtnDisable(false)

      // Check if the current `wadaNum` exists but ignore the one being edited
      const existsInOtherItems = wadaNumData.some(
        (data) => data.wadaNum === trimmedName && data.id !== editId
      )

      if (existsInOtherItems) {
        toast.error("Item already exists")
        setBtnDisable(false)
        return
      }

      // Perform edit operation
      const result = await editWadaNum(editId, trimmedName)
      if (result.status === "success") {
        setWadaNum("")
        setEditMode(false)
        setEditId(null)
        fetchWadaNum()
      } else {
        console.error("Error occurred during edit")
      }
    } else {
      // For create mode, check if item already exists
      if (result) {
        toast.error("Item already exists")
      } else {
        // Perform save operation
        const result = await savewadaNum(trimmedName)
        if (result.status === "success") {
          setWadaNum("")
          fetchWadaNum()
        } else {
          console.error("Error occurred during save")
        }
      }
    }

    setBtnDisable(false)
  }

  const handleEdit = (item: any) => {
    setWadaNum(item.wadaNum)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setWadaNum("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    fetchWadaNum()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteWadaNum(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchWadaNum()
      } else {
        console.error("Delete unsuccessful")
      }
      setIsModalOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between bg-white ">
        <h1 className="form-title text-xl font-semibold sm:text-2xl ">
          वडा सेटअप
        </h1>
        <br />
        <div className="flex w-full gap-2">
          <Input
            type="Number"
            label="वडा न."
            size="sm"
            value={wadaNum}
            onChange={(e) => setWadaNum(e.target.value)}
          />
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            isDisabled={!wadaNum.trimEnd() || btnDisable}
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
              <TableColumn>वडा न.</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{ConvertToNepaliNumerals(item.wadaNum)}</TableCell>
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
