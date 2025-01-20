"use client"
import React, { useEffect, useState } from "react"
import {
  Button,
  Checkbox,
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
import {
  deleteTskData,
  fetchTskData,
  saveTskData,
  editTskData,
} from "@/actions/formAction"
import { FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import { useMyContext } from "@/context/MyContext"

export default function TskPage() {
  const [tayarGarneKoName, setTayarGarneKoName] = useState<string>("")
  const [tayarGarneKoPad, setTayarGarneKoPad] = useState<string>("")
  const [tippaniMaDekhauneHo, SetTippaniMaDekhauneHo] = useState<boolean>(false)
  const [tayarGarneKoNaamPadDekhauneHo, SetTayarGarneKoNaamPadDekhauneHo] =
    useState<boolean>(false)

  const [peshGarneKoName, setPeshGarneKoName] = useState<string>("")
  const [peshGarneKoPad, setPeshGarneKo] = useState<string>("")
  const [peshTippaniMaDekhauneHo, SetPeshTippaniMaDekhauneHo] =
    useState<boolean>(false)
  const [peshGarneKoNaamPadDekhauneHo, SetPeshGarneKoNaamPadDekhauneHo] =
    useState<boolean>(false)

  const [sifarishRujuGarne, setSifarishRujuGarne] = useState<string>("")
  const [sifarishRujuGarneKoPad, setSifarishRujuGarneKoPad] =
    useState<string>("")
  const [sifarisTippaniMaDekhauneHo, SetSifarisTippaniMaDekhauneHo] =
    useState<boolean>(false)
  const [
    sifarishGarneKoNaamPadDekhauneHo,
    SetSifarishGarneKoNaamPadDekhauneHo,
  ] = useState<boolean>(false)

  const [sadarGarneKoName, setSadarGarneKoName] = useState<string>("")
  const [sadarGarneKopad, setSadarGarneKopad] = useState<string>("")
  const [sadarTippaniMaDekhauneHo, SetSadarTippaniMaDekhauneHo] =
    useState<boolean>(false)
  const [sadarGarneKoNaamPadDekhauneHo, SetSadarishGarneKoNaamPadDekhauneHo] =
    useState<boolean>(false)

  const [sifarishRujuGarneAmaanKoNaam, setSifarishRujuGarneAmaanKoNaam] =
    useState<boolean>(false)
  const [sifarishRujuGarneUpovoktaKoNaam, setSifarishRujuGarneUpovoktaKoNaam] =
    useState<boolean>(false)

  const [tskDetails, setTskDetails] = useState<any[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editId, setEditId] = useState<string | null>(null)

  const onSubmit = async () => {
    if (editMode && editId) {
      const result = await editTskData(
        editId,
        tayarGarneKoName,
        tayarGarneKoPad,
        tippaniMaDekhauneHo,
        tayarGarneKoNaamPadDekhauneHo,
        peshGarneKoName,
        peshGarneKoPad,
        peshTippaniMaDekhauneHo,
        peshGarneKoNaamPadDekhauneHo,
        sifarishRujuGarne,
        sifarishRujuGarneKoPad,
        sifarisTippaniMaDekhauneHo,
        sifarishGarneKoNaamPadDekhauneHo,
        sadarGarneKoName,
        sadarGarneKopad,
        sadarTippaniMaDekhauneHo,
        sadarGarneKoNaamPadDekhauneHo,
        sifarishRujuGarneAmaanKoNaam,
        sifarishRujuGarneUpovoktaKoNaam,
        value || ""
      )
      if (result.status === "success") {
        fetchTsk()
        resetFields()
        setEditMode(false)
        setEditId(null)
      } else {
        console.error("Edit unsuccessful")
      }
    } else {
      const result = await saveTskData(
        tayarGarneKoName,
        tayarGarneKoPad,
        tippaniMaDekhauneHo,
        tayarGarneKoNaamPadDekhauneHo,
        peshGarneKoName,
        peshGarneKoPad,
        peshTippaniMaDekhauneHo,
        peshGarneKoNaamPadDekhauneHo,
        sifarishRujuGarne,
        sifarishRujuGarneKoPad,
        sifarisTippaniMaDekhauneHo,
        sifarishGarneKoNaamPadDekhauneHo,
        sadarGarneKoName,
        sadarGarneKopad,
        sadarTippaniMaDekhauneHo,
        sadarGarneKoNaamPadDekhauneHo,
        sifarishRujuGarneAmaanKoNaam,
        sifarishRujuGarneUpovoktaKoNaam,
        value || ""
      )
      if (result.status === "success") {
        resetFields()
        fetchTsk()
      } else {
        console.error("Save unsuccessful")
      }
    }
  }

  const resetFields = () => {
    setTayarGarneKoName("")
    setTayarGarneKoPad("")
    SetTippaniMaDekhauneHo(false)
    SetTayarGarneKoNaamPadDekhauneHo(false)
    setPeshGarneKoName("")
    setPeshGarneKo("")
    SetPeshTippaniMaDekhauneHo(false)
    SetPeshGarneKoNaamPadDekhauneHo(false)
    setSifarishRujuGarne("")
    setSifarishRujuGarneKoPad("")
    SetSifarisTippaniMaDekhauneHo(false)
    SetSifarishGarneKoNaamPadDekhauneHo(false)
    setSadarGarneKoName("")
    setSadarGarneKopad("")
    SetSadarTippaniMaDekhauneHo(false)
    SetSadarishGarneKoNaamPadDekhauneHo(false)
    setSifarishRujuGarneAmaanKoNaam(false)
    setSifarishRujuGarneUpovoktaKoNaam(false)
  }

  const handleEdit = (item: any) => {
    setTayarGarneKoName(item.tayarGarneKoName)
    setTayarGarneKoPad(item.tayarGarneKoPad)
    SetTippaniMaDekhauneHo(item.tippaniMaDekhauneHo)
    SetTayarGarneKoNaamPadDekhauneHo(item.tayarGarneKoNaamPadDekhauneHo)

    setPeshGarneKoName(item.peshGarneKoName)
    setPeshGarneKo(item.peshGarneKoPad)
    SetPeshTippaniMaDekhauneHo(item.peshTippaniMaDekhauneHo)
    SetPeshGarneKoNaamPadDekhauneHo(item.peshGarneKoNaamPadDekhauneHo)

    setSifarishRujuGarne(item.sifarishRujuGarne)
    setSifarishRujuGarneKoPad(item.sifarishRujuGarneKoPad)
    SetSifarisTippaniMaDekhauneHo(item.sifarisTippaniMaDekhauneHo)
    SetSifarishGarneKoNaamPadDekhauneHo(item.sifarishGarneKoNaamPadDekhauneHo)

    setSadarGarneKoName(item.sadarGarneKoName)
    setSadarGarneKopad(item.sadarGarneKopad)
    SetSadarTippaniMaDekhauneHo(item.sadarTippaniMaDekhauneHo)
    SetSadarishGarneKoNaamPadDekhauneHo(item.sadarGarneKoNaamPadDekhauneHo)

    setSifarishRujuGarneAmaanKoNaam(item.sifarishRujuGarneAmaanKoNaam)
    setSifarishRujuGarneUpovoktaKoNaam(item.sifarishRujuGarneUpovoktaKoNaam)

    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
   resetFields()
    setEditMode(false)
    setEditId(null)
  }


  const [loading, setLoading] = useState(true)
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(tskDetails.length / rowsPerPage)

  const { value } = useMyContext()

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return tskDetails.slice(start, end)
  }, [page, tskDetails])

  const fetchTsk = async () => {
    try {
      setLoading(true)
      const data = await fetchTskData(value || "")
      setTskDetails(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    const fetchTsk = async () => {
      try {
        setLoading(true)
        const data = await fetchTskData(value || "")
        setTskDetails(data)
      } catch (error) {
        console.error("Error fetching fiscal years:", error)
      } finally {
        setLoading(false) // Set loading to false after fetching data
      }
    }
    fetchTsk()
  }, [value])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteTskData(deleteId, value || "")
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchTsk()
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
          टिप्पणी सदर गर्ने कर्मचारीको विवरण
        </h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex w-full gap-2">
            <Input
              type="text"
              label="तयार गर्नेको नाम"
              size="sm"
              value={tayarGarneKoName}
              onChange={(e) => setTayarGarneKoName(e.target.value)}
            />
            <Input
              type="text"
              label="पद"
              size="sm"
              value={tayarGarneKoPad}
              onChange={(e) => setTayarGarneKoPad(e.target.value)}
            />
            <div className="w-full flex-col sm:flex">
              <Checkbox
                size="sm"
                isSelected={tippaniMaDekhauneHo}
                onChange={(e) => SetTippaniMaDekhauneHo(e.target.checked)}
              >
                टिप्पणीमा देखाउने हो ?
              </Checkbox>
              <Checkbox
                size="sm"
                isSelected={tayarGarneKoNaamPadDekhauneHo}
                onChange={(e) =>
                  SetTayarGarneKoNaamPadDekhauneHo(e.target.checked)
                }
              >
                तयार गर्नेको नाम पद देखाउने हो ?
              </Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="पेश गर्नेको नाम"
              size="sm"
              value={peshGarneKoName}
              onChange={(e) => setPeshGarneKoName(e.target.value)}
            />
            <Input
              type="text"
              label="पद"
              size="sm"
              value={peshGarneKoPad}
              onChange={(e) => setPeshGarneKo(e.target.value)}
            />
            <div className="w-full flex-col sm:flex">
              <Checkbox
                size="sm"
                isSelected={peshTippaniMaDekhauneHo}
                onChange={(e) => SetPeshTippaniMaDekhauneHo(e.target.checked)}
              >
                टिप्पणीमा देखाउने हो ?
              </Checkbox>
              <Checkbox
                size="sm"
                isSelected={peshGarneKoNaamPadDekhauneHo}
                onChange={(e) =>
                  SetPeshGarneKoNaamPadDekhauneHo(e.target.checked)
                }
              >
                पेश गर्नेको नाम पद देखाउने हो ?
              </Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="सिफारिस/रुजु गर्ने "
              size="sm"
              value={sifarishRujuGarne}
              onChange={(e) => setSifarishRujuGarne(e.target.value)}
            />
            <Input
              type="text"
              label="पद"
              size="sm"
              value={sifarishRujuGarneKoPad}
              onChange={(e) => setSifarishRujuGarneKoPad(e.target.value)}
            />
            <div className="w-full flex-col sm:flex">
              <Checkbox
                size="sm"
                isSelected={sifarisTippaniMaDekhauneHo}
                onChange={(e) =>
                  SetSifarisTippaniMaDekhauneHo(e.target.checked)
                }
              >
                टिप्पणीमा देखाउने हो ?
              </Checkbox>
              <Checkbox
                size="sm"
                isSelected={sifarishGarneKoNaamPadDekhauneHo}
                onChange={(e) =>
                  SetSifarishGarneKoNaamPadDekhauneHo(e.target.checked)
                }
              >
                सिफारिस गर्नेको नाम पद देखाउने हो ?
              </Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="सदर गर्नेको नाम"
              size="sm"
              value={sadarGarneKoName}
              onChange={(e) => setSadarGarneKoName(e.target.value)}
            />
            <Input
              type="text"
              label="पद"
              size="sm"
              value={sadarGarneKopad}
              onChange={(e) => setSadarGarneKopad(e.target.value)}
            />
            <div className="w-full flex-col sm:flex">
              <Checkbox
                size="sm"
                isSelected={sadarTippaniMaDekhauneHo}
                onChange={(e) => SetSadarTippaniMaDekhauneHo(e.target.checked)}
              >
                टिप्पणीमा देखाउने हो ?
              </Checkbox>
              <Checkbox
                size="sm"
                isSelected={sadarGarneKoNaamPadDekhauneHo}
                onChange={(e) =>
                  SetSadarishGarneKoNaamPadDekhauneHo(e.target.checked)
                }
              >
                सदर गर्नेको नाम पद देखाउने हो ?
              </Checkbox>
            </div>
          </div>
        </div>
        <br />
        <div className="flex gap-4">
          <Checkbox
            size="sm"
            isSelected={sifarishRujuGarneAmaanKoNaam}
            onChange={(e) => setSifarishRujuGarneAmaanKoNaam(e.target.checked)}
          >
            सिफारिस / रुजु गर्ने अमानतको टिप्पणीमा देखाउने हो ?{" "}
          </Checkbox>
          <Checkbox
            size="sm"
            isSelected={sifarishRujuGarneUpovoktaKoNaam}
            onChange={(e) =>
              setSifarishRujuGarneUpovoktaKoNaam(e.target.checked)
            }
          >
            सिफारिस / रुजु गर्ने उपभोक्तको टिप्पणीमा देखाउने हो ?
          </Checkbox>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            isDisabled={
              !tayarGarneKoName ||
              !tayarGarneKoPad ||
              !peshGarneKoName ||
              !peshGarneKoPad ||
              !sifarishRujuGarne ||
              !sifarishRujuGarneKoPad ||
              !sadarGarneKoName ||
              !sadarGarneKopad
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
              <TableColumn>सदर गर्नेको नाम</TableColumn>
              <TableColumn>सदर गर्नेको पद</TableColumn>
              <TableColumn>सिफारिस गर्नेको नाम</TableColumn>
              <TableColumn>सिफारिस गर्नेको पद</TableColumn>
              <TableColumn>पेश गर्नेको नाम</TableColumn>
              <TableColumn>पेश गर्ने पद</TableColumn>
              <TableColumn>तयार गर्ने</TableColumn>
              <TableColumn>तयार गर्नेको पद</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.tayarGarneKoName}</TableCell>
                  <TableCell>{item.tayarGarneKoPad}</TableCell>
                  <TableCell>{item.peshGarneKoName}</TableCell>
                  <TableCell>{item.peshGarneKoPad}</TableCell>
                  <TableCell>{item.sifarishRujuGarne}</TableCell>
                  <TableCell>{item.sifarishRujuGarneKoPad}</TableCell>
                  <TableCell>{item.sadarGarneKoName}</TableCell>
                  <TableCell>{item.sadarGarneKopad}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="solid" size="sm" className="z-10 w-2 ">
                          <MdModeEditOutline />
                        </Button>
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
