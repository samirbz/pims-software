"use client"
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
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
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import {
  saveLagatSrot,
  fetchLagatSrotData,
  deleteLagatSrot,
  fetchAnudaanKoNaamData,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

export default function LagatSrot() {
  const [anudanKoKisim, setAnudanKoKisim] = useState("")
  const [lagatSrotKoNaam, setLagatSrotKoNaam] = useState("")
  const [lagatSrotData, setLagatSrotData] = useState<any[]>([])
  const [anudanData, setAnudanData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(lagatSrotData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return lagatSrotData.slice(start, end)
  }, [page, lagatSrotData])

  const fetchLagatSrot = async () => {
    try {
      setLoading(true)
      const data = await fetchLagatSrotData()
      setLagatSrotData(data)
    } catch (error) {
      console.error("Error fetching lagat srot data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAnudaanData = async () => {
    try {
      const data = await fetchAnudaanKoNaamData()
      console.log("Fetched Anudaan Data:", data) // For debugging
      setAnudanData(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  const onSubmit = async () => {
    try {
      const result = await saveLagatSrot(anudanKoKisim, lagatSrotKoNaam)
      if (result.status === "success") {
        setAnudanKoKisim("")
        setLagatSrotKoNaam("")
        fetchLagatSrot()
      } else {
        console.error("Error occurred while saving:", result)
      }
    } catch (error) {
      console.error("Error saving lagat srot:", error)
    }
  }

  useEffect(() => {
    fetchLagatSrot()
    fetchAnudaanData()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteLagatSrot(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchLagatSrot()
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
          लागत श्रोतहरु
        </h1>
        <br />
        <div className="flex w-full flex-col gap-4">
          <Select
            label="अनुदान किसिम"
            size="sm"
            onChange={(e) => setAnudanKoKisim(e.target.value)} // Correct this line
          >
            {anudanData.map((item) => (
              <SelectItem key={item.anudaanKoNaam}>
                {item.anudaanKoNaam}
              </SelectItem>
            ))}
          </Select>

          <div className="flex gap-2">
            <Input
              type="text"
              label="लागत श्रोत नाम"
              size="sm"
              value={lagatSrotKoNaam}
              onChange={(e) => setLagatSrotKoNaam(e.target.value)}
            />
            <Button
              color="secondary"
              className="w-10 self-end"
              startContent={<FaRegSave />}
              onClick={onSubmit}
              isDisabled={!anudanKoKisim || !lagatSrotKoNaam} // Disable if inputs are empty
            >
              Save
            </Button>
          </div>
        </div>
        <br />

        {loading ? (
          <div className="my-4 flex w-full justify-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <Table
            aria-label="Lagat Srot Table"
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
              <TableColumn>अनुदान किसिम</TableColumn>
              <TableColumn>लागत श्रोत</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.anudanKoKisim}</TableCell>
                  <TableCell>{item.lagatSrotKoNaam}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className="z-10"
                          variant="shadow"
                          size="sm"
                          startContent={<MdModeEditOutline />}
                        />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Actions">
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem
                          key="delete"
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
