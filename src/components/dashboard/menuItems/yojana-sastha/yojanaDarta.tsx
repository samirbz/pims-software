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
  Spinner,
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"

import { FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import "nepali-datepicker-reactjs/dist/index.css"
import { RiArrowDownDoubleFill } from "react-icons/ri"
import {
  fetchWadaNumData,
  fetchYojanaBudgetDataSecond,
  fetchMukyaSamitiData,
  fetchAnudaanKoNaamData,
  fetchFilterLagatSrotData,
  fetchYojanaKaryaBivaranData,
  fetchYojanaPrakarData,
  fetchYojanaChanotNikayaData,
} from "@/actions/formAction"
import { ConvertToNepaliNumerals } from "@/lib/util"

const qtyData = [
  { key: "1", label: "वटा" },
  { key: "2", label: "कि.मि" },
  { key: "3", label: "जना" },
  { key: "4", label: "मि." },
  { key: "5", label: "हे." },
  { key: "6", label: "र.मि." },
  { key: "7", label: "घ.मि." },
  { key: "8", label: "के.जि." },
  { key: "9", label: "थान " },
]
const karyagatSamuha = [
  { key: "1", label: "उपभोक्ता समिति" },
  { key: "2", label: "व्यक्तिगत " },
  { key: "3", label: "संस्थागत" },
  { key: "4", label: "संस्थागत " },
  { key: "5", label: "अनुदान" },
]
const yojanaKoKisim = [
  { key: "1", label: "अनुदान (गाउँ/नगरपालिका)" },
  { key: "2", label: "९०% अनुदान (९०/१० )" },
  { key: "3", label: "८०% अनुदान (८०/२० )" },
  { key: "4", label: "६०% अनुदान (६०/४०)" },
  { key: "5", label: "५०% अनुदान (५०/५०)" },
  { key: "6", label: "४०% अनुदान (४०/६०)" },
]
const budgetType = [
  { key: "1", label: "ल.ई." },
  { key: "2", label: "प्रस्तावना" },
  { key: "3", label: "निवेदन" },
  { key: "4", label: "तोक आदेश" },
  { key: "5", label: "अन्य" },
]

export default function YojanaDarta() {
  const [date, setDate] = useState<string>("")
  const [wada, setWada] = useState<any[]>([])

  // fill data
  const [yojanaKoNaamData, setYojanaKoNaamData] = useState<any[]>([])
  const [mukhyaSamitiData, setMukhyaSamitiData] = useState<any[]>([])

  // First lagat srot
  const [aunudaanKisimData, setAunudaanKisimData] = useState<any[]>([])
  const [lagatSrotData, setLagatSrotData] = useState<any[]>([])
  const [budget, setBudget] = useState("")
  // Second lagat srot
  const [aunudaanKisimSecondData, setAunudaanKisimSecondData] = useState<any[]>(
    []
  )
  const [lagatSrotSecondData, setLagatSrotSecondData] = useState<any[]>([])
  const [budgetSecond, setBudgetSecond] = useState("")

  // Third lagat srot
  const [aunudaanKisimThirdData, setAunudaanKisimThirdData] = useState<any[]>(
    []
  )
  const [lagatSrotThirdData, setLagatSrotThirdData] = useState<any[]>([])
  const [budgetThird, setBudgetThird] = useState("")

  const [yojanaKaryaBivaranData, setYojanaKaryaBivaranData] = useState<any[]>(
    []
  )

  const [ayojanaUpachetraData, setAyojanaUpachetraData] = useState<any[]>([])

  const [yojanaChanotNikaya, setYojanaChanotNikaya] = useState<any[]>([])

  const [totalSum, setTotalSum] = useState(0)

  const [loading, setLoading] = useState(true)
  const [showLoadingYojanaNaam, setShowLoadingYojanaNaam] = useState(false)
  const [showLoadingLagatSrot1, setShowLoadingLagatSrot1] = useState(false)
  const [showLoadingLagatSrot2, setShowLoadingLagatSrot2] = useState(false)
  const [showLoadingLagatSrot3, setShowLoadingLagatSrot3] = useState(false)

  const [showSecond, setShowSecond] = useState(false)
  const [showThird, setShowThird] = useState(false)

  const [contengency, setContengency] = useState("")
  const [contengencyResult, setContengencyResult] = useState("")
  const [marmat, setMarmat] = useState("")
  const [marmatResult, setmarmatResult] = useState("")
  const [dharauti, setDharauti] = useState("")
  const [dharautiResult, setDharautiResult] = useState("")
  const [kulanudanResult, setKulanudan] = useState("")
  const [janaSramDan, setJanaSramDan] = useState("")
  const [pravidik, setPravidik] = useState("")

  const fetchWadaData = async () => {
    try {
      const data = await fetchWadaNumData()
      setWada(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  // fetch for auto fill according to yojana wadaNum
  const fetchYojanaNaam = async (wadaNum: any) => {
    setShowLoadingYojanaNaam(true)
    try {
      const data = await fetchYojanaBudgetDataSecond()
      const filteredData = data.filter(
        (item: any) => item.wadaNumDt === wadaNum
      )
      setYojanaKoNaamData(filteredData)
    } catch (e) {
      console.error("Error fetching Yojana data", e)
    } finally {
      setShowLoadingYojanaNaam(false)
    }
  }

  const fetchBudget = async (id: any) => {
    try {
      const data = await fetchYojanaBudgetDataSecond()
      const filteredData = data.filter((item: any) => item.id === id)

      // Check if filteredData is not empty
      if (filteredData.length > 0) {
        // Assuming you want the first item if there are multiple matches
        const budgetData = filteredData[0].biniyojanBudgetDt
        setBudget(budgetData)
      } else {
        // Handle the case where no data was found
        setBudget("") // Or whatever default value makes sense
      }
    } catch (e) {
      console.error("Error fetching Yojana data", e)
    }
  }

  const fetchMukhyaSamiti = async () => {
    try {
      const data = await fetchMukyaSamitiData()
      // Filter the data based on the provided ID

      setMukhyaSamitiData(data)
    } catch (e) {
      console.error("Error fetching Mukhya Samiti data", e)
    }
  }

  const fetchAnudaanKoNaam = async () => {
    try {
      const data = await fetchAnudaanKoNaamData()
      // Filter the data based on the provided ID
      // const filteredData = data.filter((item: any) => item.id === id)
      setAunudaanKisimData(data)
    } catch (e) {
      console.error("Error fetching Mukhya Samiti data", e)
    }
  }
  const fetchSecondAnudaanKoNaam = async () => {
    try {
      const data = await fetchAnudaanKoNaamData()
      // Filter the data based on the provided ID
      // const filteredData = data.filter((item: any) => item.id === id)
      setAunudaanKisimSecondData(data)
    } catch (e) {
      console.error("Error fetching Mukhya Samiti data", e)
    }
  }
  const fetchThirdAnudaanKoNaam = async () => {
    try {
      const data = await fetchAnudaanKoNaamData()
      // Filter the data based on the provided ID
      // const filteredData = data.filter((item: any) => item.id === id)
      setAunudaanKisimThirdData(data)
    } catch (e) {
      console.error("Error fetching Mukhya Samiti data", e)
    }
  }

  const fetchLagatSrotHaru = async (anudaanKoNaam: any) => {
    setShowLoadingLagatSrot1(true)
    try {
      // Fetch the data from the API or data source
      const data = await fetchFilterLagatSrotData(anudaanKoNaam)

      // Set the filtered data in the state
      setLagatSrotData(data)
    } catch (e) {
      // Handle any errors that occur during the fetch or filtering process
      console.error("Error fetching Lagat Srot data", e)
    } finally {
      setShowLoadingLagatSrot1(false)
    }
  }
  const fetchSecondLagatSrotHaru = async (anudaanKoNaam: any) => {
    setShowLoadingLagatSrot2(true)
    try {
      // Fetch the data from the API or data source
      const data = await fetchFilterLagatSrotData(anudaanKoNaam)

      // Set the filtered data in the state
      setLagatSrotSecondData(data)
    } catch (e) {
      // Handle any errors that occur during the fetch or filtering process
      console.error("Error fetching Lagat Srot data", e)
    } finally {
      setShowLoadingLagatSrot2(false)
    }
  }
  const fetchThirdLagatSrotHaru = async (anudaanKoNaam: any) => {
    setShowLoadingLagatSrot3(true)
    try {
      // Fetch the data from the API or data source
      const data = await fetchFilterLagatSrotData(anudaanKoNaam)

      // Set the filtered data in the state
      setLagatSrotThirdData(data)
    } catch (e) {
      // Handle any errors that occur during the fetch or filtering process
      console.error("Error fetching data", e)
    } finally {
      setShowLoadingLagatSrot3(false)
    }
  }

  const ayojanaUpachetra = async () => {
    try {
      const data = await fetchYojanaPrakarData()
      setAyojanaUpachetraData(data)
    } catch (e) {
      // Handle any errors that occur during the fetch or filtering process
      console.error("Error fetching data", e)
    }
  }

  const fetchYojanaKaryaBivaran = async () => {
    try {
      const data = await fetchYojanaKaryaBivaranData()
      setYojanaKaryaBivaranData(data)
    } catch (e) {
      // Handle any errors that occur during the fetch or filtering process
      console.error("Error fetching data", e)
    }
  }

  const fetYojanaChanotNikaya = async () => {
    try {
      const data = await fetchYojanaChanotNikayaData()
      setYojanaChanotNikaya(data)
    } catch (e) {
      // Handle any errors that occur during the fetch or filtering process
      console.error("Error fetching data", e)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all data concurrently
        await Promise.all([
          fetchWadaData(),
          fetchMukhyaSamiti(),
          fetchAnudaanKoNaam(),
          fetchSecondAnudaanKoNaam(),
          fetchThirdAnudaanKoNaam(),
          fetchYojanaKaryaBivaran(),
          ayojanaUpachetra(),
          fetYojanaChanotNikaya(),
        ])
      } catch (e) {
        console.error("Error fetching data", e)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  useEffect(() => {
    setTotalSum(Number(budget) + Number(budgetSecond) + Number(budgetThird))
  }, [budget, budgetSecond, budgetThird])

  useEffect(() => {
    setContengencyResult(
      ((Number(contengency) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [contengency, totalSum])

  useEffect(() => {
    setmarmatResult(
      ((Number(marmat) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [marmat, totalSum])

  useEffect(() => {
    setDharautiResult(
      ((Number(dharauti) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [dharauti, totalSum])

  useEffect(() => {
    setKulanudan(
      (
        Number(totalSum) -
        (Number(contengencyResult) +
          Number(marmatResult) +
          Number(dharautiResult))
      ).toString()
    )
  }, [contengencyResult, marmatResult, dharautiResult, totalSum])

  useEffect(() => {
    setJanaSramDan(
      (
        Number(contengencyResult) +
        Number(marmatResult) +
        Number(pravidik) -
        Number(totalSum)
      ).toString()
    )
  }, [contengencyResult, marmatResult, dharautiResult, totalSum, pravidik])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
                <SelectItem key={item.wadaNum}>
                  {ConvertToNepaliNumerals(item.wadaNum)}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-2">
            <Select
              label="योजनाको नाम"
              size="sm"
              className="w-full"
              onChange={(e) => {
                fetchBudget(e.target.value)
              }}
              endContent={showLoadingYojanaNaam ? <Spinner size="sm" /> : ""}
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
              <SelectItem key={item.id}>{item.mukhyaSamitiKoNaam}</SelectItem>
            ))}
          </Select>

          {/* First div  */}
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center gap-2">
              <p className="text-sm ">लागत&nbsp;श्रोत&nbsp;1</p>
              <Select
                label="अनुदानको नाम"
                size="sm"
                className="w-1/4"
                onChange={(e) => {
                  fetchLagatSrotHaru(e.target.value)
                }}
              >
                {aunudaanKisimData.map((item) => (
                  <SelectItem key={item.anudaanKoNaam}>
                    {item.anudaanKoNaam}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="लागत श्रोतहरु"
                size="sm"
                className="w-1/2"
                endContent={showLoadingLagatSrot1 ? <Spinner size="sm" /> : ""}
              >
                {lagatSrotData.map((item) => (
                  <SelectItem key={item.id}>{item.lagatSrotKoNaam}</SelectItem>
                ))}
              </Select>
              <Input
                type="Number"
                label="&nbsp;"
                size="sm"
                className="w-1/4"
                onChange={(e) => {
                  setBudget(e.target.value)
                }}
                value={budget}
              />
            </div>

            {/* Second div - toggleable */}
            {showSecond && (
              <div className="flex w-full items-center gap-2">
                <p className="text-sm ">लागत&nbsp;श्रोत&nbsp;2</p>
                <Select
                  label="अनुदानको नाम"
                  size="sm"
                  className="w-1/4"
                  onChange={(e) => {
                    fetchSecondLagatSrotHaru(e.target.value)
                  }}
                >
                  {aunudaanKisimSecondData.map((item) => (
                    <SelectItem key={item.anudaanKoNaam}>
                      {item.anudaanKoNaam}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="लागत श्रोतहरु"
                  size="sm"
                  className="w-1/2"
                  endContent={
                    showLoadingLagatSrot2 ? <Spinner size="sm" /> : ""
                  }
                >
                  {lagatSrotSecondData.map((item) => (
                    <SelectItem key={item.id}>
                      {item.lagatSrotKoNaam}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  type="Number"
                  label="&nbsp;"
                  size="sm"
                  className="w-1/4"
                  onChange={(e) => {
                    setBudgetSecond(e.target.value)
                  }}
                  value={budgetSecond}
                />
              </div>
            )}

            {/* Third div - toggleable */}
            {showThird && (
              <div className="flex w-full items-center gap-2">
                <p className="text-sm ">लागत&nbsp;श्रोत&nbsp;3</p>
                <Select
                  label="अनुदानको नाम"
                  size="sm"
                  className="w-1/4"
                  onChange={(e) => {
                    fetchThirdLagatSrotHaru(e.target.value)
                  }}
                >
                  {aunudaanKisimThirdData.map((item) => (
                    <SelectItem key={item.anudaanKoNaam}>
                      {item.anudaanKoNaam}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="लागत श्रोतहरु"
                  size="sm"
                  className="w-1/2"
                  endContent={
                    showLoadingLagatSrot3 ? <Spinner size="sm" /> : ""
                  }
                >
                  {lagatSrotThirdData.map((item) => (
                    <SelectItem key={item.id}>
                      {item.lagatSrotKoNaam}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  type="Number"
                  label="&nbsp;"
                  size="sm"
                  className="w-1/4"
                  onChange={(e) => {
                    setBudgetThird(e.target.value)
                  }}
                  value={budgetThird}
                />
              </div>
            )}

            {/* Toggle buttons aligned right */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowSecond((prev) => !prev)
                  if (showSecond) setBudgetSecond("")
                }}
                className={`rounded-md px-4 py-2 text-white ${
                  showSecond
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {showSecond ? "-" : "+"} लागत श्रोत २
              </button>

              <button
                onClick={() => {
                  setShowThird((prev) => !prev)
                  if (showThird) setBudgetThird("")
                }}
                className={`rounded-md px-4 py-2 font-medium text-white ${
                  showThird
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {showThird ? "-" : "+"} लागत श्रोत ३
              </button>
            </div>
          </div>

          <Select label="आयोजना उपक्षेत्र" size="sm" className="w-full">
            {ayojanaUpachetraData.map((item) => (
              <SelectItem key={item.id}>{item.yojanaPrakar}</SelectItem>
            ))}
          </Select>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select
              label="योजनाको किसिम"
              className="w-full sm:w-1/2"
              size="sm"
              color="success"
            >
              {yojanaKoKisim.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
            <Select label="वडा न." className="w-full sm:w-1/5" size="sm">
              {wada.map((item) => (
                <SelectItem key={item.id}>
                  {ConvertToNepaliNumerals(item.wadaNum)}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Select label="कार्यागत समुह" className="w-full" size="sm">
            {karyagatSamuha.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="Number"
              label="प्राविधिक इस्टिमेट रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
              onChange={(e) => {
                setPravidik(e.target.value)
              }}
              value={pravidik}
            />
            <Select
              label="बजेट Type"
              size="sm"
              className="w-full sm:w-1/2"
              color="success"
            >
              {budgetType.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="Number"
              label="विनियोजित रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
              value={totalSum.toString()}
            />
            <Select
              label="योजना स्वीकृत"
              size="sm"
              className="w-full sm:w-1/2"
              color="success"
            >
              {yojanaChanotNikaya.map((item) => (
                <SelectItem key={item.id}>{item.yojanaChanotNikaya}</SelectItem>
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
                type="Number"
                label="कन्टेन्जेन्सी&nbsp;%"
                size="sm"
                className="w-full"
                onChange={(e) => {
                  setContengency(e.target.value)
                }}
              />
              <Input
                type="Number"
                label="&nbsp;"
                size="sm"
                className="w-full"
                value={contengencyResult.toString()}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="Number"
                label="मर्मत&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-full"
                onChange={(e) => {
                  setMarmat(e.target.value)
                }}
              />
              <Input
                type="Number"
                label="&nbsp;"
                size="sm"
                className="w-full"
                value={marmatResult.toString()}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="Number"
                label="धरौटी&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-full"
                onChange={(e) => {
                  setDharauti(e.target.value)
                }}
              />
              <Input
                type="Number"
                label="&nbsp;"
                size="sm"
                className="w-full"
                value={dharautiResult.toString()}
              />
            </div>
            <Input
              type="Number"
              label="कुल अनुदान रु."
              size="sm"
              className="w-full"
              value={kulanudanResult.toString()}
            />
            <Input
              type="Number"
              label="जनश्रमदान रु."
              size="sm"
              className="w-full"
              value={janaSramDan}
            />
            <Input type="text" label="ठेगाना" size="sm" className="w-full" />
            <Input
              type="Number"
              label="घर परिवार संख्या"
              size="sm"
              className="w-full"
            />
            <Input
              type="Number"
              label="जनसंख्या"
              size="sm"
              className="w-full"
            />
            <Select label="कार्य बिवरण " size="sm" className="w-full">
              {yojanaKaryaBivaranData.map((item) => (
                <SelectItem key={item.id}>{item.yojanaKoKarya}</SelectItem>
              ))}
            </Select>
            <div className="flex gap-2">
              <Input
                type="text"
                label="उपलब्धि&nbsp;लक्ष्य"
                size="sm"
                className="w-full"
              />
              <Select label="&nbsp;" size="sm" className="w-full">
                {qtyData.map((item) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
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
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
