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
  Select,
  SelectItem,
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
  saveYonanaKaryaBivaran,
  fetchYojanaKaryaBivaranData,
  deleteYojanaKarayBivaran,
  fetchYojanaPrakarData,
  editYojanaKaryaBivaran,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

export default function YojanaKaryaBivaran() {
  const [yojanaKoKisim, setYojanaKoKisim] = useState("")
  const [yojanaKoKarya, setYojanaKoKarya] = useState("")
  const [yojanaKaryaBivaranData, setYojanaKaryaBivaranData] = useState<any[]>(
    []
  )
  const [yojanaPrakarData, setYojanaPrakarData] = useState<any[]>([])

  const [loading, setLoading] = useState(true) // State for loading
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(yojanaKaryaBivaranData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return yojanaKaryaBivaranData.slice(start, end)
  }, [page, yojanaKaryaBivaranData])

  const fetchYojanaKaryaBivaran = async () => {
    try {
      setLoading(true)
      const data = await fetchYojanaKaryaBivaranData()
      setYojanaKaryaBivaranData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  const fetchYojanaPrData = async () => {
    try {
      const data = await fetchYojanaPrakarData()
      console.log("Fetched yojana prakar data:", data) // For debugging
      setYojanaPrakarData(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  useEffect(() => {
    fetchYojanaKaryaBivaran()
    fetchYojanaPrData()
  }, [])

  const onSubmit = async () => {
    setBtnDisable(true)
    const result = yojanaKaryaBivaranData.some(
      (data) => data.yojanaKoKarya === yojanaKoKarya
    )
    if (editMode && editId) {
      const result = await editYojanaKaryaBivaran(
        editId,
        yojanaKoKisim,
        yojanaKoKarya
      )
      if (result.status === "success") {
        setYojanaKoKisim("")
        setYojanaKoKarya("")
        setEditMode(false)
        setEditId(null)
        fetchYojanaKaryaBivaran()
      } else {
        console.error("Error occurred during edit")
        setBtnDisable(false)
      }
    } else {
      if (result) {
        toast.error("item already exists")
        setBtnDisable(false)
      } else {
        const result = await saveYonanaKaryaBivaran(
          yojanaKoKisim,
          yojanaKoKarya
        )
        if (result.status === "success") {
          setYojanaKoKisim("")
          setYojanaKoKarya("")
          fetchYojanaKaryaBivaran()
        } else {
          console.error("Error occurred during save")
          setBtnDisable(false)
        }
      }
    }
  }

  const handleEdit = (item: any) => {
    setYojanaKoKisim(item.yojanaKoKisim)
    setYojanaKoKarya(item.yojanaKoKarya)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setYojanaKoKisim("")
    setYojanaKoKarya("")
    setEditMode(false)
    setEditId(null)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteYojanaKarayBivaran(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchYojanaKaryaBivaran()
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
          योजनाको किसिम अनुसार कार्य बिवरण
        </h1>
        <br />
        <div className="flex w-full flex-col gap-2">
          <Select
            label="योजनाको किसिम"
            size="sm"
            placeholder="Select an option" // Optional: if you want a placeholder
            selectedKeys={yojanaKoKisim ? new Set([yojanaKoKisim]) : new Set()} // Binding the selected value
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(", ")
              setYojanaKoKisim(selectedValue)
            }}
          >
            {yojanaPrakarData.map((item) => (
              <SelectItem key={item.yojanaPrakar} value={item.yojanaPrakar}>
                {item.yojanaPrakar}
              </SelectItem>
            ))}
          </Select>

          <div className="flex gap-2">
            <Input
              label="योजनाको कार्य​"
              size="sm"
              value={yojanaKoKarya}
              onChange={(e) => setYojanaKoKarya(e.target.value)}
            />

            <Button
              color="secondary"
              startContent={<FaRegSave />}
              onClick={onSubmit}
              isDisabled={!yojanaKoKisim || (!yojanaKoKarya && btnDisable)}
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
              <TableColumn>योजनाको कार्य</TableColumn>
              <TableColumn>योजनाको किसिम</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.yojanaKoKarya}</TableCell>
                  <TableCell>{item.yojanaKoKisim}</TableCell>
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
