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

  const [loading, setLoading] = useState(true)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(yojanaBudgetData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return yojanaBudgetData.slice(start, end)
  }, [page, yojanaBudgetData])

  const fetchBankBivaran = async () => {
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

  useEffect(() => {
    fetchBankBivaran() // Fetch data when the component mounts
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteYojanaBudget(id)
    if (result.status === "success") {
      // Fetch the updated list of fiscal years
      fetchBankBivaran()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
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
      // Fetch the updated list of data
      fetchBankBivaran()
    } else {
      console.error("Error occurred")
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
          />
          <Input
            type="text"
            label="वडा न."
            size="sm"
            value={wadaNum}
            onChange={(e) => setWadaNum(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ">
          <Input
            type="text"
            label="अनुदान किसिम"
            size="sm"
            value={anudanKisim}
            onChange={(e) => setAnudanKisim(e.target.value)}
          />
          <Input
            type="text"
            label=" विनियोजन बजेट रु."
            size="sm"
            value={biniyojanBudget}
            onChange={(e) => setBiniyojanBudget(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            label="बजेट कार्यक्रम"
            size="sm"
            value={budgetKaryakram}
            onChange={(e) => setBudgetKaryakram(e.target.value)}
          />
          <Input
            type="text"
            label="योजना किसिम "
            size="sm"
            value={yojanaKisim}
            onChange={(e) => setYojanaKisim(e.target.value)}
          />
        </div>
        <Input
          type="text"
          label="मुख्य समिति"
          size="sm"
          value={mukhyaSamiti}
          onChange={(e) => setMukyaSamiti(e.target.value)}
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
                console.log("Selected Item:", selected)
                setSelectedItem(selected || null) // Update the state with the selected item
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
            {selectedItem ? selectedItem.biniyojanBudget : "No value selected"}
          </p>
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="w-full">एक मुष्ठ रकम बाट सहायक योजना बाडफाँड</p>
          <div className="flex gap-2">
            <Input
              type="text"
              label="योजनाको नाम"
              size="sm"
              value={anudanKisim}
              onChange={(e) => setAnudanKisim(e.target.value)}
            />

            <Input
              type="text"
              label="छानिएको मुख्य आयोजना"
              size="sm"
              isDisabled
              value={biniyojanBudget}
              onChange={(e) => setBiniyojanBudget(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            label="वडा न."
            size="sm"
            value={budgetKaryakram}
            onChange={(e) => setBudgetKaryakram(e.target.value)}
          />
          <Input
            type="text"
            label="विनियोजन बजेट रु. "
            size="sm"
            value={yojanaKisim}
            onChange={(e) => setYojanaKisim(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            className="w-12"
            onClick={onSubmit}
          >
            Save
          </Button>
          <Button
            startContent={<SiMicrosoftexcel />}
            className="w-12"
            onClick={onSubmit}
          >
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
                <TableCell>{item.anudanKisim}</TableCell>
                <TableCell>{item.biniyojanBudget}</TableCell>
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
    </div>
  )
}
