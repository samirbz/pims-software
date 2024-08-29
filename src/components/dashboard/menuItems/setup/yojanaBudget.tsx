"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
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
import { SiMicrosoftexcel } from "react-icons/si"
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
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"

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

  const [errors, setErrors] = useState<any>({})

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
    const start = (pageSecond - 1) * rowsPerPageSecond
    const end = start + rowsPerPageSecond

    return yojanaBudgetDataDt.slice(start, end)
  }, [pageSecond, yojanaBudgetDataDt])

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

  const handleDelete = async (id: string) => {
    const result = await deleteYojanaBudget(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchYojanaBudgetLocal()
    } else {
      console.error("Delete unsuccessful:")
    }
  }
  const handleDeleteSecond = async (id: string) => {
    const result = await deleteYojanaBudgetSecond(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchYojanaBudgetSecondLocal()
    } else {
      console.error("Delete unsuccessful:")
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
      if (result.status === "success") {
        // Reset the input field after successful submission
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
      } else {
        console.error("Error occurred")
      }
    }
  }

  const onSubmitDt = async () => {
    try {
      // Find the matching budget for the given `secondId`
      const matchedItem = yojanaBudgetData.find((data) => data.id === secondId)

      // If no matching item is found, return or handle the case accordingly
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
      console.log("New Budget:", resNew)

      // Update the budget in the database
      await updateBiniyojanBudget(secondId, resNew)

      // Refresh the data after the update
      await fetchYojanaBudgetLocal()

      // Save the new budget data
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
        // Reset the input fields after successful submission
        setYojanaKoNaamDt("")
        setWadaNumDt("")
        setAnudanKisimDt("")
        setBiniyojanBudgetDt("")
        setBudgetKaryakramDt("")
        setYojanaKisimDt("")
        setMukhyaSamitiDt("")
        setChaniyekoMukhyaYojana("")

        // Fetch the updated list of data
        await fetchYojanaBudgetSecondLocal()
        setSelectedItem(null)
      } else {
        console.error("Error occurred during saveYojanaBudgetDt")
      }
    } catch (error: any) {
      console.error("Error in onSubmitDt:", error.message)
    }
  }

  return (
    <div className="flex flex-col justify-between bg-white">
      <h1 className="form-title text-xl font-semibold sm:text-2xl">
        अपलोड योजनाहरु (एक मुष्ठ रकम बाट सहायक योजनाम बाँडफाड)
      </h1>
      <br />
      <div className="flex w-full flex-col gap-2">
        <div className="flex  gap-2 ">
          <Input
            type="text"
            label="योजनाको नाम"
            size="sm"
            value={yojanaKoNaam}
            onChange={(e) => setYojanaKoNaam(e.target.value)}
            isInvalid={!!errors.yojanaKoNaam}
            errorMessage={errors.yojanaKoNaam}
          />
          <Input
            type="Number"
            label="वडा न."
            size="sm"
            value={wadaNum}
            onChange={(e) => setWadaNum(e.target.value)}
            isInvalid={!!errors.wadaNum}
            errorMessage={errors.wadaNum}
          />
        </div>
        <div className="flex gap-2 ">
          <Input
            type="text"
            label="अनुदान किसिम"
            size="sm"
            value={anudanKisim}
            onChange={(e) => setAnudanKisim(e.target.value)}
            isInvalid={!!errors.anudanKisim}
            errorMessage={errors.anudanKisim}
          />
          <Input
            type="Number"
            label=" विनियोजन बजेट रु."
            size="sm"
            value={biniyojanBudget}
            onChange={(e) => setBiniyojanBudget(e.target.value)}
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
            onChange={(e) => setBudgetKaryakram(e.target.value)}
            isInvalid={!!errors.budgetKaryakram}
            errorMessage={errors.budgetKaryakram}
          />
          <Input
            type="text"
            label="योजना किसिम "
            size="sm"
            value={yojanaKisim}
            onChange={(e) => setYojanaKisim(e.target.value)}
            isInvalid={!!errors.yojanaKisim}
            errorMessage={errors.yojanaKisim}
          />
        </div>
        <Input
          type="text"
          label="मुख्य समिति"
          size="sm"
          value={mukhyaSamiti}
          onChange={(e) => setMukyaSamiti(e.target.value)}
          isInvalid={!!errors.mukhyaSamiti}
          errorMessage={errors.mukhyaSamiti}
        />
        <Button
          color="secondary"
          startContent={<FaRegSave />}
          className="w-12"
          onClick={onSubmit}
        >
          Save
        </Button>
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
                      <DropdownItem>Edit</DropdownItem>
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
                setChaniyekoMukhyaYojana(selected.yojanaKoNaam || "")
                setAnudanKisimDt(selected.anudanKisim || "")
                setMukhyaSamitiDt(selected.mukhyaSamiti || "")
                setYojanaKisimDt(selected.yojanaKisim || "")
                setBudgetKaryakramDt(selected.budgetKaryakram || "")
                setSecondId(selected.id || "")
              }}
              value={selectedItem?.id}
              options={yojanaBudgetData.map((item) => ({
                value: item.id,
                label: item.yojanaKoNaam,
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
              onChange={(e) => setYojanaKoNaamDt(e.target.value)}
            />

            <Input
              type="text"
              label="छानिएको मुख्य आयोजना"
              isDisabled
              size="sm"
              value={selectedItem?.yojanaKoNaam}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            type="Number"
            label="वडा न."
            size="sm"
            value={wadaNumDt}
            onChange={(e) => setWadaNumDt(e.target.value)}
          />
          <Input
            type="Number"
            label="विनियोजन बजेट रु. "
            size="sm"
            value={biniyojanBudgetDt}
            onChange={(e) => setBiniyojanBudgetDt(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            className="w-12"
            onClick={onSubmitDt}
          >
            Save
          </Button>
          <Button startContent={<SiMicrosoftexcel />} className="w-12">
            Excel
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
            <TableColumn>बजेट रु.</TableColumn>
            <TableColumn>अनुदान किसिम</TableColumn>
            <TableColumn>बजेट कार्यक्रम</TableColumn>
            <TableColumn>योजना किसिम</TableColumn>
            <TableColumn>मुख्य समिति</TableColumn>
            <TableColumn>छानिएको मुख्य आयोजना</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {itemsSecond.map((item, index) => (
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
                      <DropdownItem>Edit</DropdownItem>
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
  )
}
