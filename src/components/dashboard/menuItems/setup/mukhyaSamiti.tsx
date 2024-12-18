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
import React, { useState, useEffect } from "react"
import { useMyContext } from "@/context/MyContext"

import {
  saveMukyaSamiti,
  fetchMukyaSamitiData,
  deleteMukyaSamitiKoNaam,
  editMukhyaSamitiKonaam,
} from "@/actions/formAction"
import { toast } from "react-toastify"

export default function MukhyaSamiti() {
  const [mukhyaSamitiKoNaam, setMukhyaSamitiKoNaam] = useState("")
  const [mukhyaSamitiKoNaamData, setMukhyaSamitiKoNaamData] = useState<any[]>(
    []
  )
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [btnDisable, setBtnDisable] = useState(false)
  const [page, setPage] = useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(mukhyaSamitiKoNaamData.length / rowsPerPage)

  const { value } = useMyContext()

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return mukhyaSamitiKoNaamData.slice(start, end)
  }, [page, mukhyaSamitiKoNaamData])

  const fetchMukhyaSamiti = async () => {
    try {
      setLoading(true)
      const data = await fetchMukyaSamitiData(value || "")
      setMukhyaSamitiKoNaamData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    setBtnDisable(true)

    // Remove trailing spaces before saving or checking
    const trimmedName = mukhyaSamitiKoNaam.trimEnd()

    if (editMode && editId) {
      // In edit mode, check if `trimmedName` exists in other records, excluding the one being edited
      const existsInOtherItems = mukhyaSamitiKoNaamData.some(
        (data) => data.mukhyaSamitiKoNaam === trimmedName && data.id !== editId
      )

      if (existsInOtherItems) {
        toast.error("Item already exists")
        setBtnDisable(false)
        return
      }

      // Proceed with the edit operation
      const result = await editMukhyaSamitiKonaam(
        editId,
        trimmedName,
        value || ""
      )
      if (result.status === "success") {
        setMukhyaSamitiKoNaam("")
        setEditMode(false)
        setEditId(null)
        fetchMukhyaSamiti()
      } else {
        console.error("Error occurred during edit")
      }
    } else {
      // In create mode, check if the `trimmedName` already exists
      const exists = mukhyaSamitiKoNaamData.some(
        (data) => data.mukhyaSamitiKoNaam === trimmedName
      )

      if (exists) {
        toast.error("Item already exists")
      } else {
        // Proceed with save operation
        const result = await saveMukyaSamiti(trimmedName, value || "")
        if (result.status === "success") {
          setMukhyaSamitiKoNaam("")
          fetchMukhyaSamiti()
        } else {
          console.error("Error occurred during save")
        }
      }
    }

    setBtnDisable(false)
  }

  const handleEdit = (item: any) => {
    setMukhyaSamitiKoNaam(item.mukhyaSamitiKoNaam)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setMukhyaSamitiKoNaam("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    const fetchMukhyaSamiti = async () => {
      try {
        setLoading(true)
        const data = await fetchMukyaSamitiData(value || "") // Provide default value for null
        setMukhyaSamitiKoNaamData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMukhyaSamiti()
  }, [value]) // Add `value` as a dependency

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteMukyaSamitiKoNaam(deleteId, value || "")
      if (result.status === "success") {
        fetchMukhyaSamiti()
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
          मुख्य समिती को नाम
        </h1>
        <br />
        <div className="flex w-full gap-2 ">
          <Input
            type="text"
            label="मुख्य समिती को नाम"
            size="sm"
            value={mukhyaSamitiKoNaam}
            // Allows spaces but does not trim them during typing
            onChange={(e) => setMukhyaSamitiKoNaam(e.target.value)}
          />
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            isDisabled={!mukhyaSamitiKoNaam.trimEnd() || btnDisable}
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
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.mukhyaSamitiKoNaam}</TableCell>
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
