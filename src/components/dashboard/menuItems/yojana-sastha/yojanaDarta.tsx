"use client"
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"

import { FaMinus, FaPlus, FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import "nepali-datepicker-reactjs/dist/index.css"
import { RiArrowDownDoubleFill } from "react-icons/ri"
import {
  fetchWadaNumData,
  fetchAnudaanKoNaamData,
  fetchFilterLagatSrotData,
  fetchYojanaPrakarData,
  fetchYojanaBudgetDataSecond,
} from "@/actions/formAction"
import mukhyaSamiti from "../setup/mukhyaSamiti"

const animals = [
  { key: "cat", label: "1234567890123456789" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
]

export default function YojanaDarta() {
  const [date, setDate] = useState<string>("")
  const [divs, setDivs] = useState<React.JSX.Element[]>([])

  const [wada, setWada] = useState<any[]>([])
  const [aunudaanKisim, setAunudaanKisim] = useState("")
  const [aunudaanKisimData, setAunudaanKisimData] = useState<any[]>([])
  const [lagatSrot, setLagatSrot] = useState("")
  const [lagatSrotData, setlagatSrotData] = useState<any[]>([])
  const [yojanaPrakar, setYojanaPrakar] = useState("")
  const [yojanaPrakarData, setYojanaPrakarData] = useState<any[]>([])

  // fill data
  const [yojanaKoNaamData, setYojanaKoNaamData] = useState<any[]>([])
  const [mukhyaSamitiData, setMukhyaSamitiData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const fetchWadaData = async () => {
    try {
      const data = await fetchWadaNumData()
      console.log("Fetched Anudaan Data:", data) // For debugging
      setWada(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  const fetchanudaanKisimData = async () => {
    try {
      const data = await fetchAnudaanKoNaamData()
      setAunudaanKisimData(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  const fetchlagatSrotData = async (anudaanKoNaam: string) => {
    try {
      const data = await fetchFilterLagatSrotData(anudaanKoNaam)
      setlagatSrotData(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  const fetchyojanaPrakarData = async () => {
    try {
      const data = await fetchYojanaPrakarData()
      setYojanaPrakarData(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  // fetch for auto fill according to yojana wadaNum
  const fetchYojanaNaam = async (wadaNum: any) => {
    try {
      const data = await fetchYojanaBudgetDataSecond()
      const filteredData = data.filter(
        (item: any) => item.wadaNumDt === wadaNum
      )
      setYojanaKoNaamData(filteredData)
    } catch (e) {
      console.error("Error fetching Yojana data", e)
    }
  }

  const fetchMukhyaSamiti = async (id: any) => {
    try {
      const data = await fetchYojanaBudgetDataSecond()
      // Filter the data based on the provided ID
      const filteredData = data.filter((item: any) => item.id === id)
      setMukhyaSamitiData(filteredData)
    } catch (e) {
      console.error("Error fetching Mukhya Samiti data", e)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all data concurrently
        await Promise.all([
          fetchWadaData(),
          fetchanudaanKisimData(),
          fetchyojanaPrakarData(),
        ])
      } catch (e) {
        console.error("Error fetching data", e)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const addDiv = () => {
    setDivs([
      ...divs,
      <div className="flex w-full items-center gap-2" key={divs.length}>
        <p className="text-sm">लागत&nbsp;श्रोत</p>
        <Select label="&nbsp;" className="w-1/4" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select label="&nbsp;" className="w-1/2" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Input type="text" label="&nbsp;" className="w-1/4" size="sm" />
      </div>,
    ])
  }

  const removeDiv = () => {
    setDivs((prevDivs) => {
      const newDivs = [...prevDivs]
      newDivs.pop()
      return newDivs
    })
  }

  const onSubmit = async () => {
    console.log(mukhyaSamiti, aunudaanKisim, lagatSrot, yojanaPrakar)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col justify-between bg-white ">
      <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
        योजना दर्ता उपभोक्त समिती/संस्थागत/व्यक्तिगत र संस्थागत अनुदान
      </h1>
      <br />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                योजना दर्ता उपभोक्त समिती/संस्थागत/व्यक्तिगत र संस्थागत अनुदान
              </ModalHeader>
              <ModalBody>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>सि.न.</TableColumn>
                    <TableColumn>आयोजना नाम</TableColumn>
                    <TableColumn>आयोजनको प्रकार</TableColumn>
                    <TableColumn>वडा न.</TableColumn>
                    <TableColumn>ल.ई रकम</TableColumn>
                    <TableColumn>अनुदान रकम</TableColumn>
                    <TableColumn>सहभागिता</TableColumn>
                    <TableColumn>Edit</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="">
                      <TableCell>1</TableCell>
                      <TableCell>e</TableCell>
                      <TableCell>e</TableCell>
                      <TableCell>e</TableCell>
                      <TableCell>e</TableCell>
                      <TableCell>e</TableCell>
                      <TableCell>e</TableCell>
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
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-2 sm:w-2/3">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <form className="flex items-center gap-2 pl-2 sm:p-0">
              <label htmlFor="date" className="block text-sm">
                सभा निर्णय मिति
              </label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1"
                value={date}
                onChange={(value: string) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
            <Select
              label="योजनाको वडा"
              className="w-full sm:w-1/5"
              size="sm"
              onChange={(e) => {
                fetchYojanaNaam(e.target.value)
              }}
            >
              {wada.map((item) => (
                <SelectItem key={item.wadaNum}>{item.wadaNum}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-2">
            <Select
              label="योजनाको नाम"
              size="sm"
              className="w-full"
              onChange={(e) => fetchMukhyaSamiti(e.target.value)}
            >
              {yojanaKoNaamData.map((item) => (
                <SelectItem key={item.id}>{item.yojanaKoNaamDt}</SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="बजेट किताब सि.न."
              size="sm"
              className="w-full sm:w-1/3"
              color="primary"
            />
          </div>
          <Select label="मूख्य समिति" size="sm" className="w-full">
            {mukhyaSamitiData.map((item) => (
              <SelectItem key={item.id}>{item.mukhyaSamitiDt}</SelectItem>
            ))}
          </Select>

          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center gap-2">
              <p className="text-sm">लागत&nbsp;श्रोत</p>
              <Select
                label="अनुदानको नाम"
                size="sm"
                onChange={(e) => {
                  setAunudaanKisim(e.target.value)
                  fetchlagatSrotData(e.target.value)
                }}
                className="w-1/4"
              >
                {aunudaanKisimData.map((item) => (
                  <SelectItem
                    key={item.anudaanKoNaam}
                    value={item.anudaanKoNaam}
                  >
                    {item.anudaanKoNaam}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="लागत श्रोत रकम  "
                size="sm"
                onChange={(e) => setLagatSrot(e.target.value)}
                className="w-1/2"
              >
                {lagatSrotData.map((item) => (
                  <SelectItem key={item.lagatSrotKoNaam}>
                    {item.lagatSrotKoNaam}
                  </SelectItem>
                ))}
              </Select>
              <Input type="text" label="&nbsp;" size="sm" className="w-1/4" />
            </div>
            {divs.map((div, index) => (
              <div key={index}>{div}</div>
            ))}
            <div className="flex justify-end gap-2">
              <FaPlus
                className="cursor-pointer self-end text-blue-600"
                onClick={addDiv}
                size={18}
              />
              <FaMinus
                className="cursor-pointer self-end text-red-600"
                onClick={removeDiv}
                size={18}
              />
            </div>
          </div>

          <Select
            label="आयोजना उपक्षेत्र"
            size="sm"
            className="w-full"
            onChange={(e) => setYojanaPrakar(e.target.value)} // Correct this line
          >
            {yojanaPrakarData.map((item) => (
              <SelectItem key={item.yojanaPrakar}>
                {item.yojanaPrakar}
              </SelectItem>
            ))}
          </Select>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select
              label="योजनाको किसिम"
              className="w-full sm:w-1/2"
              size="sm"
              color="success"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Select label="वडा न." className="w-full sm:w-1/5" size="sm">
              {wada.map((animal) => (
                <SelectItem key={animal.id}>{animal.wadaNum}</SelectItem>
              ))}
            </Select>
          </div>
          <Select label="कार्यागत समुह" className="w-full" size="sm">
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label="प्राविधिक इस्टिमेट रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
            />
            <Select
              label="बजेट Type"
              size="sm"
              className="w-full sm:w-1/2"
              color="success"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label="विनियोजित रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
            />
            <Select
              label="योजना स्वीकृत"
              size="sm"
              className="w-full sm:w-1/2"
              color="success"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>

          <Button onPress={onOpen} className="mt-4 w-full sm:w-1/4">
            Open table <RiArrowDownDoubleFill />
          </Button>
        </div>

        <div className="flex w-full flex-col gap-4 sm:w-1/3">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="text"
                label="कन्टेन्जेन्सी&nbsp;%"
                size="sm"
                className="w-full"
              />
              <Input type="text" label="&nbsp;" size="sm" className="w-full" />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="मर्मत&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-full"
              />
              <Input type="text" label="&nbsp;" size="sm" className="w-full" />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="धरौटी&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-full"
              />
              <Input type="text" label="&nbsp;" size="sm" className="w-full" />
            </div>
            <Input
              type="text"
              label="कुल अनुदान रु."
              size="sm"
              className="w-full"
            />
            <Input
              type="text"
              label="जनश्रमदान रु."
              size="sm"
              className="w-full"
            />
            <Input type="text" label="ठेगाना" size="sm" className="w-full" />
            <Input
              type="text"
              label="घर परिवार संख्या"
              size="sm"
              className="w-full"
            />
            <Input type="text" label="जनसंख्या" size="sm" className="w-full" />
            <Select label="Select an animal" size="sm" className="w-full">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <div className="flex gap-2">
              <Input
                type="text"
                label="उपलब्धि&nbsp;लक्ष्य"
                size="sm"
                className="w-full"
              />
              <Select label="Select an animal" size="sm" className="w-full">
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex gap-4">
            <Checkbox>वार्षिक&nbsp;योजना</Checkbox>
            <Checkbox>क्रमागत&nbsp;योजना</Checkbox>
          </div>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            className="w-full"
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
