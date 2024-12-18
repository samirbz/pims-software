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
  saveBankBivaran,
  fetchBankBivaranData,
  deleteBankBivaran,
  editBankBivaran,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useMyContext } from "@/context/MyContext"

export default function BankBivaran() {
  const [bankKoNaam, setBankKoNaam] = useState("")
  const [sakha, setSakha] = useState("")
  const [bankBivaranData, setBankBivaranData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(bankBivaranData.length / rowsPerPage)
  const { value } = useMyContext()

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return bankBivaranData.slice(start, end)
  }, [page, bankBivaranData])

  const fetchBankBivaran = async () => {
    try {
      setLoading(false)
      const data = await fetchBankBivaranData(value || "")
      setBankBivaranData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    setBtnDisable(true)

    const trimmedName = bankKoNaam.trimEnd()
    const trimmedNameSecond = sakha.trimEnd()

    if (editMode && editId) {
      // In edit mode, check if the combination of bankKoNaam and sakha exists in other records, excluding the one being edited
      const existsInOtherItems = bankBivaranData.some(
        (data) =>
          data.bankKoNaam === trimmedName &&
          data.sakha === trimmedNameSecond &&
          data.id !== editId
      )

      if (existsInOtherItems) {
        toast.error("Bank with the same name and branch already exists")
        setBtnDisable(false)
        return
      }

      // Proceed with the edit operation
      const result = await editBankBivaran(
        editId,
        trimmedName,
        trimmedNameSecond,
        value || ""
      )
      if (result.status === "success") {
        setBankKoNaam("")
        setSakha("")
        setEditMode(false)
        setEditId(null)
        fetchBankBivaran()
      } else {
        console.error("Error occurred during edit")
      }
    } else {
      // In create mode, check if the bank entry with the same bankKoNaam and sakha already exists
      const exists = bankBivaranData.some(
        (data) =>
          data.bankKoNaam === trimmedName && data.sakha === trimmedNameSecond
      )

      if (exists) {
        toast.error("Bank with the same name and branch already exists")
      } else {
        // Proceed with save operation
        const result = await saveBankBivaran(
          trimmedName,
          trimmedNameSecond,
          value || ""
        )
        if (result.status === "success") {
          setBankKoNaam("")
          setSakha("")
          fetchBankBivaran()
        } else {
          console.error("Error occurred during save")
        }
      }
    }

    setBtnDisable(false)
  }

  const handleEdit = (item: any) => {
    setBankKoNaam(item.bankKoNaam)
    setSakha(item.sakha)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setBankKoNaam("")
    setSakha("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    const fetchBankBivaran = async () => {
      try {
        setLoading(false)
        const data = await fetchBankBivaranData(value || "")
        setBankBivaranData(data)
      } catch (error) {
        console.error("Error fetching fiscal years:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBankBivaran() // Fetch data when the component mounts
  }, [value])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteBankBivaran(deleteId, value || "")
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchBankBivaran()
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
          करोवार गर्ने बैंकहरु
        </h1>
        <br />
        <div className="flex w-full flex-col gap-2">
          <Input
            type="text"
            label="बैंकको नाम "
            size="sm"
            value={bankKoNaam}
            onChange={(e) => setBankKoNaam(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="text"
              label="शाखा "
              size="sm"
              value={sakha}
              onChange={(e) => setSakha(e.target.value)}
            />
            <Button
              color="secondary"
              startContent={<FaRegSave />}
              onClick={onSubmit}
              isDisabled={
                !bankKoNaam.trimEnd() || !sakha.trimEnd() || btnDisable
              }
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
              <TableColumn>बैंकको नाम</TableColumn>
              <TableColumn>शाखा रहेको स्थान</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.bankKoNaam}</TableCell>
                  <TableCell>{item.sakha}</TableCell>
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
