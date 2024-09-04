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
  saveYojanaPrakar,
  fetchYojanaPrakarData,
  deleteYojanaPrakar,
  editYojanaPrakar,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

export default function YojanaPrakar() {
  const [yojanaPrakar, setYojanaPrakar] = useState("")
  const [yojanaPrakarData, setYojanaPrakarData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(yojanaPrakarData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return yojanaPrakarData.slice(start, end)
  }, [page, yojanaPrakarData])

  const fetchYojanaPrakar = async () => {
    try {
      setLoading(true)
      const data = await fetchYojanaPrakarData()
      setYojanaPrakarData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  // const onSubmit = async () => {
  //   const result = await saveYojanaPrakar(yojanaPrakar)
  //   if (result.status === "success") {
  //     // Reset the input field after successful submission
  //     setYojanaPrakar("")
  //     // Fetch the updated list of data
  //     fetchYojanaPrakar()
  //   } else {
  //     console.error("Error occurred")
  //   }
  // }

  const onSubmit = async () => {
    if (editMode && editId) {
      const result = await editYojanaPrakar(editId, yojanaPrakar)
      if (result.status === "success") {
        setYojanaPrakar("")
        setEditMode(false)
        setEditId(null)
        fetchYojanaPrakar()
      } else {
        console.error("Error occurred during edit")
      }
    } else {
      const result = await saveYojanaPrakar(yojanaPrakar)
      if (result.status === "success") {
        setYojanaPrakar("")
        fetchYojanaPrakar()
      } else {
        console.error("Error occurred during save")
      }
    }
  }

  const handleEdit = (item: any) => {
    setYojanaPrakar(item.yojanaPrakar)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setYojanaPrakar("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    fetchYojanaPrakar() // Fetch data when the component mounts
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteYojanaPrakar(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchYojanaPrakar()
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
          योजना प्रकार किसिम (प्राकर)
        </h1>
        <br />
        <div className="flex w-full gap-2">
          <Input
            type="text"
            label="आयोजनाको प्रकार "
            size="sm"
            value={yojanaPrakar}
            onChange={(e) => setYojanaPrakar(e.target.value)}
          />
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            isDisabled={!yojanaPrakar}
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
              <TableColumn>योजनाको प्रकार</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.yojanaPrakar}</TableCell>
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
      </div>
    </>
  )
}
