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
import { MdModeEditOutline } from "react-icons/md"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import NepaliDate from "nepali-date-converter"
import { useMyContext } from "@/context/MyContext"

import {
  saveSuchikritForm,
  fetchSuchikritFormData,
  deleteSuchikritForm,
  editSuchikritForm,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ConvertToNepaliNumerals } from "@/lib/util"

// Utility functions
const englishToNepali = (englishNum: string): string => {
  const nepaliDigits = "०१२३४५६७८९"
  const englishDigits = "0123456789"

  return englishNum
    .split("")
    .map((char) => {
      const index = englishDigits.indexOf(char)
      return index !== -1 ? nepaliDigits[index] : char
    })
    .join("")
}

const nepaliToEnglish = (nepaliNum: string): string => {
  const nepaliDigits = "०१२३४५६७८९"
  const englishDigits = "0123456789"

  return nepaliNum
    .split("")
    .map((char) => {
      const index = nepaliDigits.indexOf(char)
      return index !== -1 ? englishDigits[index] : char
    })
    .join("")
}

const isValidNumber = (value: string): boolean => {
  const allowedCharacters = /^[०-९0-9]*$/ // Nepali (०-९) and English (0-9) digits
  return allowedCharacters.test(value)
}

const date1 = new NepaliDate()

const suchikritHunaChanekoList = [
  { value: "1", label: "मालसामान आपूर्ति" },
  { value: "2", label: "निर्माण कार्य" },
  { value: "3", label: "परामर्श सेवा" },
  { value: "4", label: "अन्य सेवा" },
]

export default function SuchikritForm() {
  const [displayValuePanVat, setDisplayValuePanVat] = useState("") 
  const [savedValuePanVat, setSavedValuePanVat] = useState("") 
  const [displayValueComapanyDartaNum, setDisplayValueComapanyDartaNum] = useState("") 
  const [savedValueComapanyDartaNum, setSavedValueComapanyDartaNum] = useState("") 
  const [displayValuePramanPatraSankhya, setDisplayValuePramanPatraSankhya] = useState("") 
  const [savedValuePramanPatraSankhya, setSavedValuePramanPatraSankhya] = useState("") 
  const [displayValuePhoneNum, setDisplayValuePhoneNum] = useState("") 
  const [savedValuePhoneNum, setSavedValuePhoneNum] = useState("") 
  const [displayValueSuchiDartaNum, setDisplayValueSuchiDartaNum] = useState("") 
  const [savedValueSuchiDartaNum, setSavedValueSuchiDartaNum] = useState("") 
  const [formKoNaam, setFormKoNaam] = useState("")
  const [dartaMiti, setDartaMiti] = useState("")
  const [formKoThegana, setFormKoThegana] = useState("")
  const [suchikritHunaChahekoKharid, setSuchikritHunaChahekoKharid] =
    useState("")
  const [suchikritFormData, setSuchikritFormData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(suchikritFormData.length / rowsPerPage)
  const { value } = useMyContext()

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return suchikritFormData.slice(start, end)
  }, [page, suchikritFormData])

  const fetchSuchikritForm = async () => {
    try {
      setLoading(false)
      const data = await fetchSuchikritFormData(value || "")
      setSuchikritFormData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    setBtnDisable(true)
    const trimmedNaam = formKoNaam.trimEnd()
    const panVatConvert =savedValuePanVat.trim();
    const companyDartaNumConvert = savedValueComapanyDartaNum.trim();
    const pramanPatraSankhyaConvert = savedValuePramanPatraSankhya.trim();
    const phoneNumConvert = savedValuePhoneNum.trim();
    const suchiDartaNumConvert = savedValueSuchiDartaNum.trim();

    if (editMode && editId) {
      // Check if formKoNaam exists in other records, excluding the one being edited
      const existsInOtherItems = suchikritFormData.some(
        (data) => data.formKoNaam === trimmedNaam && data.id !== editId
      )

      if (existsInOtherItems) {
        toast.error("Item already exists")
        setBtnDisable(false)
        return
      }

      // Proceed with the edit operation
      const result = await editSuchikritForm(
        editId,
        trimmedNaam,
        dartaMiti,
        formKoThegana,
        nepaliToEnglish(panVatConvert),
        nepaliToEnglish(companyDartaNumConvert),
        nepaliToEnglish(pramanPatraSankhyaConvert),
        nepaliToEnglish(phoneNumConvert),
        nepaliToEnglish(suchiDartaNumConvert),
        suchikritHunaChahekoKharid,
        value || ""
      )
      if (result.status === "success") {
        setFormKoNaam("")
        setDartaMiti("")
        setFormKoThegana("")
        setSuchikritHunaChahekoKharid("")
        setDisplayValuePanVat("")
        setDisplayValueComapanyDartaNum("")
        setDisplayValuePramanPatraSankhya("")
        setDisplayValuePhoneNum("")
        setDisplayValueSuchiDartaNum("")
        setEditMode(false)
        setEditId(null)
        fetchSuchikritForm()
      } else {
        console.error("Error occurred during edit")
      }
    } else {
      // Check if formKoNaam already exists in the data
      const exists = suchikritFormData.some(
        (data) => data.formKoNaam === trimmedNaam
      )

      if (exists) {
        toast.error("Item already exists")
      } else {
        // Proceed with the save operation
        const result = await saveSuchikritForm(
          trimmedNaam,
          dartaMiti || date1.format("YYYY-MM-DD"),
          formKoThegana,
          panVatConvert,
          companyDartaNumConvert,
          pramanPatraSankhyaConvert,
          phoneNumConvert,
          suchiDartaNumConvert,
          suchikritHunaChahekoKharid,
          value || ""
        )
        if (result.status === "success") {
          setFormKoNaam("")
          setDartaMiti("")
          setFormKoThegana("")
          setDisplayValuePanVat("")
          setDisplayValueComapanyDartaNum("")
          setDisplayValuePramanPatraSankhya("")
          setDisplayValuePhoneNum("")
          setDisplayValueSuchiDartaNum("")
          setSuchikritHunaChahekoKharid("")
          fetchSuchikritForm()
        } else {
          console.error("Error occurred during save")
        }
      }
    }

    setBtnDisable(false)
  }
  const handleEdit = (item: any) => {
    setFormKoNaam(item.formKoNaam)
    setDartaMiti(item.dartaMiti)
    setFormKoThegana(item.formKoThegana)
    setDisplayValuePanVat(englishToNepali(item.panVat))
    setDisplayValueComapanyDartaNum(englishToNepali(item.companyDartaNum))
    setDisplayValuePramanPatraSankhya(englishToNepali(item.pramanPatraSankhya))
    setDisplayValuePhoneNum(englishToNepali(item.phoneNum))
    setDisplayValueSuchiDartaNum(englishToNepali(item.suchiDartaNum))
    setSuchikritHunaChahekoKharid(item.suchikritHunaChahekoKharid)

    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setFormKoNaam("")
    setDartaMiti("")
    setFormKoThegana("")
    setSuchikritHunaChahekoKharid("")
    setDisplayValuePanVat("")
    setDisplayValueComapanyDartaNum("")
    setDisplayValuePramanPatraSankhya("")
    setDisplayValuePhoneNum("")
    setDisplayValueSuchiDartaNum("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    const fetchSuchikritForm = async () => {
      try {
        setLoading(false)
        const data = await fetchSuchikritFormData(value || "")
        setSuchikritFormData(data)
      } catch (error) {
        console.error("Error fetching fiscal years:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSuchikritForm() // Fetch data when the component mounts
  }, [value])

  useEffect(() => {
    if (dartaMiti) {
      const selectedDate = new NepaliDate(dartaMiti)
      const today = new NepaliDate()

      if (selectedDate > today) {
        alert("Future dates are not allowed")
        setDartaMiti(today.format("YYYY-MM-DD"))
      }
    }
  }, [dartaMiti])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteSuchikritForm(deleteId, value || "")
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchSuchikritForm()
      } else {
        console.error("Delete unsuccessful")
      }
      setIsModalOpen(false)
      setDeleteId(null)
    }
  }

   // Input change handler
    const handleInputChangePanVat = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setDisplayValuePanVat(nepaliValue);
        setSavedValuePanVat(englishValue);
      }
    };
    const handleInputChangeCompanyDartaNum = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setDisplayValueComapanyDartaNum(nepaliValue);
        setSavedValueComapanyDartaNum(englishValue);
      }
    };
    const handleInputChangePramanPatraSankhya = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setDisplayValuePramanPatraSankhya(nepaliValue);
        setSavedValuePramanPatraSankhya(englishValue);
      }
    };
    const handleInputChangePhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setDisplayValuePhoneNum(nepaliValue);
        setSavedValuePhoneNum(englishValue);
      }
    };
    const handleInputChangeSuchiDartaNum = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setDisplayValueSuchiDartaNum(nepaliValue);
        setSavedValueSuchiDartaNum(englishValue);
      }
    };

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
        <h1 className="form-title text-xl font-semibold sm:text-2xl ">
          फर्म कम्पनी सुची दार्त
        </h1>
        <br />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-8 sm:flex-row ">
            <Input
              type="text"
              label="फर्मको नाम "
              size="sm"
              value={formKoNaam}
              onChange={(e) => setFormKoNaam(e.target.value)}
            />

            <div className="mr-20 flex flex-col items-center gap-4 md:flex-row">
              <p className="whitespace-nowrap text-sm md:text-base">
                दर्ता मिति
              </p>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1 "
                value={dartaMiti}
                onChange={(value: string) => setDartaMiti(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label="फर्मको ठेगान"
              size="sm"
              value={formKoThegana}
              onChange={(e) => setFormKoThegana(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label="पान भ्याट न."
              size="sm"
              value={displayValuePanVat}
              onChange={handleInputChangePanVat}
            />
            <Input
              type="text"
              label="कम्पनि दर्ता न."
              size="sm"
              value={displayValueComapanyDartaNum}
              onChange={handleInputChangeCompanyDartaNum}
            />
            <Input
              type="text"
              label="प्रमाण पत्र संख्याः "
              size="sm"
              value={displayValuePramanPatraSankhya}
              onChange={handleInputChangePramanPatraSankhya}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="फोन न."
              placeholder="+९७७"
              size="sm"
              value={displayValuePhoneNum}
              onChange={handleInputChangePhoneNum}
            />
            <Input
              type="text"
              label="सुची दर्ता नः"
              size="sm"
              value={displayValueSuchiDartaNum}
              onChange={handleInputChangeSuchiDartaNum}
            />
          </div>
          <div className="flex gap-2">

            <Select
              label="सुचिकृत हुन चाहेको खरिद प्रकृतिको विवरण"
              size="sm"
              className="w-full sm:w-1/2"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={
                suchikritHunaChahekoKharid
                  ? new Set([suchikritHunaChahekoKharid])
                  : new Set()
              } // Binding the selected value
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setSuchikritHunaChahekoKharid(selectedValue)
              }}
            >
              {suchikritHunaChanekoList.map((item) => (
                <SelectItem key={item.label}>{item.label}</SelectItem>
              ))}
            </Select>

            <Button
              color="secondary"
              startContent={<FaRegSave />}
              onClick={onSubmit}
              isDisabled={!formKoNaam.trimEnd() || btnDisable}
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
              <TableColumn>फर्मको नाम.</TableColumn>
              <TableColumn>ठेगाना</TableColumn>
              <TableColumn>पान न.</TableColumn>
              <TableColumn>सस्था दर्ता न.</TableColumn>
              <TableColumn>फोन न.</TableColumn>
              <TableColumn>दर्ता मिति</TableColumn>
              <TableColumn>सुचिकृत</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.formKoNaam}</TableCell>
                  <TableCell>{item.formKoThegana}</TableCell>
                  <TableCell>{ConvertToNepaliNumerals(item.panVat)}</TableCell>
                  <TableCell>
                    {ConvertToNepaliNumerals(item.companyDartaNum)}
                  </TableCell>
                  <TableCell>
                    {ConvertToNepaliNumerals(item.phoneNum)}
                  </TableCell>
                  <TableCell>
                    {ConvertToNepaliNumerals(item.dartaMiti)}
                  </TableCell>
                  <TableCell>{item.suchikritHunaChahekoKharid}</TableCell>
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
