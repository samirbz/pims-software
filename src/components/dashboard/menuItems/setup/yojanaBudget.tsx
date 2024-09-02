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
  useDisclosure,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import { SiMicrosoftexcel } from "react-icons/si"
import { AiOutlineClear } from "react-icons/ai"
import { Select } from "antd"
import { IoSearch } from "react-icons/io5"

import {
  saveYojanaBudget,
  fetchYojanaBudgetData,
  deleteYojanaBudget,
  saveYojanaBudgetDt,
  fetchYojanaBudgetDataSecond,
  deleteYojanaBudgetSecond,
  updateBiniyojanBudget,
  editYojanaBudgetFirst,
  editYojanaBudgetSecond,
  deleteYojanaBudgetChaniyekoMukhyaYojanaSecond,
  sumAllChaniyekoMukhyaYojanaBiniyojanBudgetDtSecond,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function YojanaBudget() {
  const [yojanaKoNaam, setYojanaKoNaam] = useState("")
  const [wadaNum, setWadaNum] = useState("")
  const [anudanKisim, setAnudanKisim] = useState("")
  const [biniyojanBudget, setBiniyojanBudget] = useState("")
  const [budgetKaryakram, setBudgetKaryakram] = useState("")
  const [yojanaKisim, setYojanaKisim] = useState("")
  const [mukhyaSamiti, setMukyaSamiti] = useState("")
  const [yojanaBudgetData, setYojanaBudgetData] = useState<any[]>([])

  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [yojanaKoNaamDt, setYojanaKoNaamDt] = useState("")
  const [chaniyekoMukhyaYojana, setChaniyekoMukhyaYojana] = useState("")
  const [wadaNumDt, setWadaNumDt] = useState("")
  const [biniyojanBudgetDt, setBiniyojanBudgetDt] = useState("")
  const [anudanKisimDt, setAnudanKisimDt] = useState("")
  const [budgetKaryakramDt, setBudgetKaryakramDt] = useState("")
  const [yojanaKisimDt, setYojanaKisimDt] = useState("")
  const [mukhyaSamitiDt, setMukhyaSamitiDt] = useState("")
  const [yojanaBudgetDataDt, setYojanaBudgetDataDt] = useState<any[]>([])

  const [filterYojanakoNaam, setFilterYojanakoNaam] = useState("")
  const [excelDataDt, setExcelDataDt] = useState([])

  const [errors, setErrors] = useState<any>({})
  const [errorsSecond, setErrorsSecond] = useState<any>({})
  const [deleteUserId, setDeleteUserId] = useState("")
  const [deleteUserIdSecond, setDeleteUserIdSecond] = useState("")
  const [showEditBtn, setShowEditBtn] = useState(false)
  const [showSecondEditBtn, setSecondShowEditBtn] = useState(false)
  const [firstEditId, setFirstEditId] = useState("")
  const [secondEditId, setSecondEditId] = useState("")

  const [amountCheck, setAmountCheck] = useState("")

  //  delete
  const {
    isOpen: isDeleteConfirmationOpen,
    onOpen: onDeleteConfirmationOpen,
    onOpenChange: onDeleteConfirmationOpenChange,
  } = useDisclosure()

  const {
    isOpen: isDeleteConfirmationOpenSecond,
    onOpen: onDeleteConfirmationOpenSecond,
    onOpenChange: onDeleteConfirmationOpenChangeSecond,
  } = useDisclosure()

  const validateFields = () => {
    const newErrors: any = {}
    if (!yojanaKoNaam) newErrors.yojanaKoNaam = "This field is required"
    if (!wadaNum) newErrors.wadaNum = "This field is required"
    if (!anudanKisim) newErrors.anudanKisim = "This field is required"
    if (!biniyojanBudget) newErrors.biniyojanBudget = "This field is required"
    if (!budgetKaryakram) newErrors.budgetKaryakram = "This field is required"
    if (!yojanaKisim) newErrors.yojanaKisim = "This field is required"
    if (!mukhyaSamiti) newErrors.mukhyaSamiti = "This field is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateFieldsSecond = () => {
    const newErrorsSecond: any = {}
    if (!yojanaKoNaamDt)
      newErrorsSecond.yojanaKoNaamDt = "This field is required"
    if (!wadaNumDt) newErrorsSecond.wadaNumDt = "This field is required"
    if (!chaniyekoMukhyaYojana)
      newErrorsSecond.chaniyekoMukhyaYojana = "This field is required"
    if (!biniyojanBudgetDt)
      newErrorsSecond.biniyojanBudgetDt = "This field is required"

    setErrorsSecond(newErrorsSecond)
    return Object.keys(newErrorsSecond).length === 0
  }

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, fieldName: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
      // Clear the error for this field
      setErrors((prevErrors: any) => ({ ...prevErrors, [fieldName]: "" }))
    }
  const handleChangeSecond =
    (setter: React.Dispatch<React.SetStateAction<string>>, fieldName: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
      // Clear the error for this field
      setErrorsSecond((prevErrors: any) => ({ ...prevErrors, [fieldName]: "" }))
    }

  const [secondId, setSecondId] = useState("")
  const [loading, setLoading] = useState(true)

  // first table
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(yojanaBudgetData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return yojanaBudgetData.slice(start, end)
  }, [page, yojanaBudgetData])

  //  second table
  const [pageSecond, setPageSecond] = React.useState(1)
  const rowsPerPageSecond = 4

  const pagesSecond = Math.ceil(yojanaBudgetDataDt.length / rowsPerPageSecond)

  const itemsSecond = React.useMemo(() => {
    const filteredData: any = yojanaBudgetDataDt.filter(
      (item) => item.chaniyekoMukhyaYojana === filterYojanakoNaam
    )

    setExcelDataDt(filteredData)

    const start = (pageSecond - 1) * rowsPerPageSecond
    const end = start + rowsPerPageSecond

    return filteredData.slice(start, end)
  }, [pageSecond, yojanaBudgetDataDt, filterYojanakoNaam]) // Include wadaNumDt in dependencies

  const fetchYojanaBudgetLocal = async () => {
    try {
      setLoading(false)
      const data = await fetchYojanaBudgetData()
      setYojanaBudgetData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }
  const fetchYojanaBudgetSecondLocal = async () => {
    try {
      setLoading(false)
      const data = await fetchYojanaBudgetDataSecond()
      setYojanaBudgetDataDt(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchYojanaBudgetLocal()
    fetchYojanaBudgetSecondLocal()
  }, [])

  //  delete first
  const handleDelete = async (id: string) => {
    setDeleteUserId(id) // Set the ID to be deleted
    onDeleteConfirmationOpen() // Open the confirmation modal
  }

  const confirmDeleteYojana = async () => {
    try {
      const matchOldBudget = yojanaBudgetData.find(
        (data) => data.id === deleteUserId
      )
      const updateResult = await deleteYojanaBudgetChaniyekoMukhyaYojanaSecond(
        matchOldBudget.yojanaKoNaam
      )
      if (updateResult.status === "success") {
        await deleteYojanaBudget(deleteUserId)
        fetchYojanaBudgetLocal()
        fetchYojanaBudgetSecondLocal()
        toast.success("successfully deleted")
      } else {
        toast.error("yojana is not empty")
      }
    } catch (error) {
      console.error("Delete unsuccessful:", error)
    }
    onDeleteConfirmationOpenChange()
  }

  // delete second
  const handleDeleteSecond = async (id: string) => {
    setDeleteUserIdSecond(id) // Set the ID to be deleted
    onDeleteConfirmationOpenSecond() // Open the confirmation modal
  }

  const confirmDeleteYojanaSecond = async () => {
    try {
      // Find the data to delete
      const matchedOldBudgetSecond = yojanaBudgetDataDt.find(
        (data) => data.id === deleteUserIdSecond
      )

      // If no matching data found, log and exit
      if (!matchedOldBudgetSecond) {
        console.error("No matching data found in yojanaBudgetDataDt.")
        return
      }

      // Find the corresponding old budget
      const matchOldBudget = yojanaBudgetData.find(
        (data) =>
          data.yojanaKoNaam === matchedOldBudgetSecond.chaniyekoMukhyaYojana &&
          data.wadaNum === wadaNumDt
      )

      // If no matching budget found, log and exit
      if (!matchOldBudget) {
        console.error("No matching data found in yojanaBudgetData.")
        toast.error("First Select yojana to delete.")
        return
      }

      // Convert budget strings to numbers
      const budget1 = Number(matchOldBudget.biniyojanBudget)
      const budget2 = Number(matchedOldBudgetSecond.biniyojanBudgetDt)

      if (isNaN(budget1) || isNaN(budget2)) {
        console.error("Budget values are not valid numbers.")
        return
      }

      // Perform the addition (or subtraction if needed)
      const res = budget1 + budget2 // Change to budget1 - budget2 if subtraction is intended
      const resNew = res.toString()

      // Update the budget
      const updateResult = await updateBiniyojanBudget(secondId, resNew)
      if (updateResult.status !== "success") {
        console.error("Failed to update budget:", updateResult)
        return
      }

      // Delete the budget entry
      const deleteResult = await deleteYojanaBudgetSecond(deleteUserIdSecond)
      if (deleteResult.status === "success") {
        fetchYojanaBudgetSecondLocal()
        fetchYojanaBudgetLocal()
        setSelectedItem(null)
        toast.success("successfully deleted")
      } else {
        console.error("Delete unsuccessful:", deleteResult)
      }
    } catch (error) {
      console.error("Delete unsuccessful:", error)
    }

    // Close the confirmation modal
    onDeleteConfirmationOpenChangeSecond()
  }

  //  Edit first
  const handleEdit = async (item: any) => {
    setShowEditBtn(true)
    setFirstEditId(item.id)
    setYojanaKoNaam(item.yojanaKoNaam)
    setWadaNum(item.wadaNum)
    setAnudanKisim(item.anudanKisim)
    setBiniyojanBudget(item.biniyojanBudget)
    setBudgetKaryakram(item.budgetKaryakram)
    setYojanaKisim(item.yojanaKisim)
    setMukyaSamiti(item.mukhyaSamiti)
  }

  const editFirst = async () => {
    if (validateFields()) {
      if (Number(biniyojanBudget) < 0) {
        toast.error("Amount should not be negative")
        return
      }

      const matchOldBudget = yojanaBudgetData.find(
        (data) => data.id === firstEditId
      )
      const sumOfAll = await sumAllChaniyekoMukhyaYojanaBiniyojanBudgetDtSecond(
        matchOldBudget.yojanaKoNaam,
        wadaNum
      )
      const budget1 = Number(biniyojanBudget)
      const budget2 = Number(sumOfAll.totalBudget)

      const res = (budget1 - budget2).toString()

      if (matchOldBudget.biniyojanBudget !== biniyojanBudget) {
        setBiniyojanBudget(res)
      }

      const result = await editYojanaBudgetFirst(
        firstEditId,
        yojanaKoNaam,
        wadaNum,
        anudanKisim,
        res, // Pass `res` directly instead of `biniyojanBudget`
        budgetKaryakram,
        yojanaKisim,
        mukhyaSamiti
      )

      if (result.status === "success") {
        setYojanaKoNaam("")
        setWadaNum("")
        setAnudanKisim("")
        setBiniyojanBudget("")
        setBudgetKaryakram("")
        setYojanaKisim("")
        setMukyaSamiti("")
        setShowEditBtn(false)
        fetchYojanaBudgetLocal()
        toast.success("successfully edited")
      } else {
        console.error("Error occurred")
      }
    }
  }

  //  Edit second
  const handleEditSecond = async (item: any) => {
    setSecondShowEditBtn(true)
    setSecondEditId(item.id)
    setYojanaKoNaamDt(item.yojanaKoNaamDt)
    setWadaNumDt(item.wadaNumDt)
    setBiniyojanBudgetDt(item.biniyojanBudgetDt)
    setChaniyekoMukhyaYojana(item.chaniyekoMukhyaYojana)
  }

  const editSecond = async () => {
    if (validateFieldsSecond()) {
      if (Number(biniyojanBudgetDt) < 0) {
        toast.error("Amount should not be negative")
        return
      }
      if (Number(biniyojanBudgetDt) > Number(amountCheck)) {
        toast.error("Amount is greater than budget")
        return
      }

      const result = await editYojanaBudgetSecond(
        secondEditId,
        yojanaKoNaamDt,
        wadaNumDt,
        biniyojanBudgetDt,
        chaniyekoMukhyaYojana
      )

      // update budget rs
      const matchedItem = yojanaBudgetData.find((data) => data.id === secondId)
      const matchedOldBudget = yojanaBudgetDataDt.find(
        (data) => data.id === secondEditId && data.wadaNumDt
      )
      const budget1 = Number(matchedItem.biniyojanBudget)
      const budget2 = Number(biniyojanBudgetDt)
      const budget3 = Number(matchedOldBudget.biniyojanBudgetDt)
      // Perform the subtraction
      const res = budget1 - budget2 + budget3
      const resNew = res.toString()

      await updateBiniyojanBudget(secondId, resNew)

      if (result.status === "success") {
        setYojanaKoNaamDt("")
        setWadaNumDt("")
        setBiniyojanBudgetDt("")
        setChaniyekoMukhyaYojana("")
        setSecondShowEditBtn(false)
        await fetchYojanaBudgetSecondLocal()
        await fetchYojanaBudgetLocal()
        setSelectedItem(null)
        toast.success("successfully edited")
      } else {
        console.error("Error occurred")
      }
    }
  }

  const onSubmit = async () => {
    if (validateFields()) {
      const result = await saveYojanaBudget(
        yojanaKoNaam,
        wadaNum,
        anudanKisim,
        biniyojanBudget,
        budgetKaryakram,
        yojanaKisim,
        mukhyaSamiti
      )

      if (Number(biniyojanBudget) < 0) {
        toast.error("Amount should not be negative")
        return
      }

      if (result.status === "success") {
        // Reset the input fields after successful submission
        setYojanaKoNaam("")
        setWadaNum("")
        setAnudanKisim("")
        setBiniyojanBudget("")
        setBudgetKaryakram("")
        setYojanaKisim("")
        setMukyaSamiti("")
        setErrors({})
        // Fetch the updated list of data
        fetchYojanaBudgetLocal()
        toast.success("Data saved successfully!")
      } else {
        toast.error(result.error)
      }
    }
  }

  const onSubmitDt = async () => {
    const data = await fetchYojanaBudgetDataSecond()

    const hasMatch = data.some(
      (item) =>
        item.yojanaKoNaamDt === yojanaKoNaamDt && item.wadaNumDt === wadaNumDt
    )
    console.log(hasMatch) // true if at least one match is found, otherwise false

    if (hasMatch) {
      toast.error("duplicate yojana with same wada")
    } else {
      // alert(Number(biniyojanBudgetDt) > Number(amountCheck))
      if (Number(biniyojanBudgetDt) > Number(amountCheck)) {
        toast.error("Amount is greater than budget")
        return
      }
      if (!validateFieldsSecond()) {
        console.error(
          "Validation failed. Please check the fields and try again."
        )
        return
      }

      try {
        if (Number(biniyojanBudgetDt) < 0) {
          toast.error("Amount should not be negative")
          return
        }

        // Find the matching budget for the given `secondId`
        const matchedItem = yojanaBudgetData.find(
          (data) => data.id === secondId
        )

        if (!matchedItem) {
          console.error("No matching budget found for the given ID")
          return
        }

        // Extract and convert the budgets to numbers
        const budget1 = Number(matchedItem.biniyojanBudget)
        const budget2 = Number(biniyojanBudgetDt)

        if (isNaN(budget1) || isNaN(budget2)) {
          console.error("Invalid budget values. Could not convert to number.")
          return
        }

        // Perform the subtraction
        const res = budget1 - budget2
        const resNew = res.toString()

        // Update the budget in the database
        await updateBiniyojanBudget(secondId, resNew)
        await fetchYojanaBudgetLocal()

        const result = await saveYojanaBudgetDt(
          yojanaKoNaamDt,
          wadaNumDt,
          anudanKisimDt,
          biniyojanBudgetDt,
          budgetKaryakramDt,
          yojanaKisimDt,
          mukhyaSamitiDt,
          chaniyekoMukhyaYojana
        )

        if (result.status === "success") {
          // Reset input fields after successful submission
          setYojanaKoNaamDt("")
          setWadaNumDt("")
          setAnudanKisimDt("")
          setBiniyojanBudgetDt("")
          setBudgetKaryakramDt("")
          setYojanaKisimDt("")
          setMukhyaSamitiDt("")
          setChaniyekoMukhyaYojana("")
          setSelectedItem(null)

          toast.success("Budget updated successfully")
          fetchYojanaBudgetSecondLocal()
        } else {
          console.error("Error occurred during saveYojanaBudgetDt")
        }
      } catch (error) {
        console.error("Error in onSubmitDt function:", error)
      }
    }
  }

  // Function to export the table data to Excel
  const exportToExcel = () => {
    // Define your custom headers
    const headers = [
      "सि.न.",
      "योजनाको नाम",
      "वडा न.",
      "अनुदान किसिम",
      "बजेट रु.",
      "बजेट कार्यक्रम",
      "योजना किसिम",
      "मुख्य समिति",
      "छानिएको मुख्य आयोजना",
    ]

    // Convert your data to a worksheet with index numbers and exclude the first element in each row
    const worksheetData = [
      headers,
      ...excelDataDt.map((obj, index) => [
        index + 1, // Add index number starting from 1
        ...Object.values(obj).slice(1), // Exclude the first element in each row
      ]),
    ]

    // Create a new worksheet with the custom headers
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

    // Calculate column widths based on the maximum length of data in each column
    const columnWidths = headers.map((header, index) => ({
      wch: Math.max(
        header.length, // Header length
        ...worksheetData.map((row) =>
          row[index] ? row[index].toString().length : 0
        ) // Max length of data in the column
      ),
    }))

    // Set column widths in the worksheet
    worksheet["!cols"] = columnWidths

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff Details")

    // Write the workbook to a file
    XLSX.writeFile(workbook, "योजना.xlsx")
  }

  return (
    <>
      <Modal
        isOpen={isDeleteConfirmationOpen}
        onOpenChange={onDeleteConfirmationOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmation
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this yojana?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={confirmDeleteYojana}>
                Delete
              </Button>
              <Button color="primary" onClick={onDeleteConfirmationOpenChange}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeleteConfirmationOpenSecond}
        onOpenChange={onDeleteConfirmationOpenChangeSecond}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmation
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this yojana?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={confirmDeleteYojanaSecond}>
                Delete
              </Button>
              <Button
                color="primary"
                onClick={onDeleteConfirmationOpenChangeSecond}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <div className="flex flex-col justify-between bg-white">
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
          अपलोड योजनाहरु (एक मुष्ठ रकम बाट सहायक योजनाम बाँडफाड)
        </h1>
        <br />
        <div className="flex w-full flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              label="योजनाको नाम"
              size="sm"
              value={yojanaKoNaam}
              onChange={handleChange(setYojanaKoNaam, "yojanaKoNaam")}
              isInvalid={!!errors.yojanaKoNaam}
              errorMessage={errors.yojanaKoNaam}
            />
            <Input
              type="Number"
              label="वडा न."
              size="sm"
              value={wadaNum}
              onChange={handleChange(setWadaNum, "wadaNum")}
              isInvalid={!!errors.wadaNum}
              errorMessage={errors.wadaNum}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="अनुदान किसिम"
              size="sm"
              value={anudanKisim}
              onChange={handleChange(setAnudanKisim, "anudanKisim")}
              isInvalid={!!errors.anudanKisim}
              errorMessage={errors.anudanKisim}
            />
            <Input
              type="number"
              label=" विनियोजन बजेट"
              size="sm"
              value={biniyojanBudget}
              onChange={handleChange(setBiniyojanBudget, "biniyojanBudget")}
              isInvalid={!!errors.biniyojanBudget}
              errorMessage={errors.biniyojanBudget}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="बजेट कार्यक्रम"
              size="sm"
              value={budgetKaryakram}
              onChange={handleChange(setBudgetKaryakram, "budgetKaryakram")}
              isInvalid={!!errors.budgetKaryakram}
              errorMessage={errors.budgetKaryakram}
            />
            <Input
              type="text"
              label="योजना किसिम "
              size="sm"
              value={yojanaKisim}
              onChange={handleChange(setYojanaKisim, "yojanaKisim")}
              isInvalid={!!errors.yojanaKisim}
              errorMessage={errors.yojanaKisim}
            />
          </div>
          <Input
            type="text"
            label="मुख्य समिति"
            size="sm"
            value={mukhyaSamiti}
            onChange={handleChange(setMukyaSamiti, "mukhyaSamiti")}
            isInvalid={!!errors.mukhyaSamiti}
            errorMessage={errors.mukhyaSamiti}
          />
          <div className="flex gap-2">
            {showEditBtn ? (
              <Button
                color="default"
                startContent={<MdModeEditOutline />}
                className="w-12"
                onClick={editFirst}
              >
                Edit
              </Button>
            ) : (
              <Button
                color="secondary"
                startContent={<FaRegSave />}
                className="w-12"
                onClick={onSubmit}
              >
                Save
              </Button>
            )}
            <Button
              startContent={<AiOutlineClear />}
              onClick={() => {
                setYojanaKoNaam("")
                setWadaNum("")
                setAnudanKisim("")
                setBiniyojanBudget("")
                setBudgetKaryakram("")
                setYojanaKisim("")
                setMukyaSamiti("")
                setShowEditBtn(false)
              }}
              className="w-12"
            >
              Clear
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
              <TableColumn>योजनाको नाम</TableColumn>
              <TableColumn>वडा न.</TableColumn>
              <TableColumn>बजेट रु.</TableColumn>
              <TableColumn>अनुदान किसिम</TableColumn>
              <TableColumn>बजेट कार्यक्रम</TableColumn>
              <TableColumn>योजना किसिम</TableColumn>
              <TableColumn>मुख्य समिति</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.yojanaKoNaam}</TableCell>
                  <TableCell>{item.wadaNum}</TableCell>
                  <TableCell>{item.biniyojanBudget}</TableCell>
                  <TableCell>{item.anudanKisim}</TableCell>
                  <TableCell>{item.budgetKaryakram}</TableCell>
                  <TableCell>{item.yojanaKisim}</TableCell>
                  <TableCell>{item.mukhyaSamiti}</TableCell>
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
                          onPress={() => handleDelete(item.id)}
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
        <div className="mt-4 flex w-full flex-col gap-2">
          <div className="flex items-center gap-2 ">
            <div className="w-full">
              <label className="flex items-center gap-2 whitespace-nowrap">
                {<IoSearch />}आयोजना खोज्नुहोस
              </label>

              <Select
                showSearch
                className="w-full"
                placeholder="Search to Select"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => {
                  // Find the selected item by id
                  const selected = yojanaBudgetData.find(
                    (item) => item.id === value
                  )

                  setSelectedItem(selected || null)
                  // data to fill
                  setAmountCheck(selected.biniyojanBudget || " ")
                  setChaniyekoMukhyaYojana(selected.yojanaKoNaam || "")
                  setAnudanKisimDt(selected.anudanKisim || "")
                  setMukhyaSamitiDt(selected.mukhyaSamiti || "")
                  setYojanaKisimDt(selected.yojanaKisim || "")
                  setBudgetKaryakramDt(selected.budgetKaryakram || "")
                  setSecondId(selected.id || "")
                  setFilterYojanakoNaam(selected.yojanaKoNaam || "")
                  setWadaNumDt(selected.wadaNum)
                }}
                value={selectedItem?.id}
                options={yojanaBudgetData.map((item) => ({
                  value: item.id,
                  label: `${item.yojanaKoNaam} | वडा - ${item.wadaNum}`,
                }))}
              />
            </div>
            <p className="mt-4 w-full text-xl font-semibold text-red-600">
              बाँकी बजेट रु:{" "}
              {selectedItem ? selectedItem.biniyojanBudget : "00.00"}
            </p>
          </div>
          <div className="flex flex-col gap-2 ">
            <p className="w-full">एक मुष्ठ रकम बाट सहायक योजना बाडफाँड</p>
            <div className="flex gap-2">
              <Input
                type="text"
                label="योजनाको नाम"
                size="sm"
                value={yojanaKoNaamDt}
                onChange={handleChangeSecond(
                  setYojanaKoNaamDt,
                  "yojanaKoNaamDt"
                )}
                isInvalid={!!errorsSecond.yojanaKoNaamDt}
                errorMessage={errorsSecond.yojanaKoNaamDt}
              />

              <Input
                type="text"
                label="छानिएको मुख्य आयोजना"
                isDisabled
                size="sm"
                value={selectedItem?.yojanaKoNaam}
                onChange={handleChangeSecond(
                  setChaniyekoMukhyaYojana,
                  "chaniyekoMukhyaYojana"
                )}
                isInvalid={!!errorsSecond.chaniyekoMukhyaYojana}
                errorMessage={errorsSecond.chaniyekoMukhyaYojana}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="Number"
              label="वडा न."
              size="sm"
              value={wadaNumDt}
              onChange={handleChangeSecond(setWadaNumDt, "wadaNumDt")}
              isInvalid={!!errorsSecond.wadaNumDt}
              errorMessage={errorsSecond.wadaNumDt}
            />
            <Input
              type="Number"
              label="विनियोजन बजेट रु. "
              size="sm"
              value={biniyojanBudgetDt}
              onChange={handleChangeSecond(
                setBiniyojanBudgetDt,
                "biniyojanBudgetDt"
              )}
              isInvalid={!!errorsSecond.biniyojanBudgetDt}
              errorMessage={errorsSecond.biniyojanBudgetDt}
            />
          </div>
          <div className="flex gap-2">
            {showSecondEditBtn ? (
              <Button
                color="default"
                startContent={<MdModeEditOutline />}
                className="w-12"
                onClick={editSecond}
              >
                Edit
              </Button>
            ) : (
              <Button
                color="secondary"
                startContent={<FaRegSave />}
                className="w-12"
                onClick={onSubmitDt}
              >
                Save
              </Button>
            )}
            <Button
              startContent={<SiMicrosoftexcel />}
              onClick={exportToExcel}
              className="w-12 bg-green-700 text-white"
            >
              Excel
            </Button>
            <Button
              startContent={<AiOutlineClear />}
              onClick={() => {
                setYojanaKoNaamDt("")
                setWadaNumDt("")
                setAnudanKisimDt("")
                setBiniyojanBudgetDt("")
                setBudgetKaryakramDt("")
                setYojanaKisimDt("")
                setMukhyaSamitiDt("")
                setChaniyekoMukhyaYojana("")
                setSelectedItem(null)
                setSecondShowEditBtn(false)
              }}
              className="w-12"
            >
              Clear
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
            aria-label="Example table with dynamic content"
            className="h-auto min-w-full "
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={pageSecond}
                  total={pagesSecond}
                  onChange={(page) => setPageSecond(page)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>सि.न.</TableColumn>
              <TableColumn>योजनाको नाम</TableColumn>
              <TableColumn>वडा न.</TableColumn>
              <TableColumn>अनुदान किसिम</TableColumn>
              <TableColumn>बजेट रु.</TableColumn>
              <TableColumn>बजेट कार्यक्रम</TableColumn>
              <TableColumn>योजना किसिम</TableColumn>
              <TableColumn>मुख्य समिति</TableColumn>
              <TableColumn>छानिएको मुख्य आयोजना</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {itemsSecond.map((item: any, index: any) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.yojanaKoNaamDt}</TableCell>
                  <TableCell>{item.wadaNumDt}</TableCell>
                  <TableCell>{item.anudanKisimDt}</TableCell>
                  <TableCell>{item.biniyojanBudgetDt}</TableCell>
                  <TableCell>{item.budgetKaryakramDt}</TableCell>
                  <TableCell>{item.yojanaKisimDt}</TableCell>
                  <TableCell>{item.mukhyaSamitiDt}</TableCell>
                  <TableCell>{item.chaniyekoMukhyaYojana}</TableCell>
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
                        <DropdownItem onPress={() => handleEditSecond(item)}>
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onPress={() => handleDeleteSecond(item.id)}
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
    </>
  )
}
