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
  Pagination,
  ModalFooter,
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
  saveYojanaDarta,
  fetchYojanaDartaData,
  deleteYojanaDarta,
} from "@/actions/formAction"
import { ConvertToNepaliNumerals } from "@/lib/util"
import { toast } from "react-toastify"

const qtyDataList = [
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
const karyagatSamuhaList = [
  { key: "1", label: "उपभोक्ता समिति" },
  { key: "2", label: "व्यक्तिगत " },
  { key: "3", label: "संस्थागत" },
  { key: "4", label: "संस्थागत " },
  { key: "5", label: "अनुदान" },
]
const yojanaKoKisimList = [
  { key: "1", label: "अनुदान (गाउँ/नगरपालिका)" },
  { key: "2", label: "९०% अनुदान (९०/१० )" },
  { key: "3", label: "८०% अनुदान (८०/२० )" },
  { key: "4", label: "६०% अनुदान (६०/४०)" },
  { key: "5", label: "५०% अनुदान (५०/५०)" },
  { key: "6", label: "४०% अनुदान (४०/६०)" },
]
const budgetTypeList = [
  { key: "1", label: "ल.ई." },
  { key: "2", label: "प्रस्तावना" },
  { key: "3", label: "निवेदन" },
  { key: "4", label: "तोक आदेश" },
  { key: "5", label: "अन्य" },
]

export default function YojanaDarta() {
  // const [date, setDate] = useState<string>("")
  const [wadaN, setWadaN] = useState<any[]>([])

  // fill data
  const [yojanaKoNaamData, setYojanaKoNaamData] = useState<any[]>([])
  const [mukhyaSamitiData, setMukhyaSamitiData] = useState<any[]>([])

  // First lagat srot
  const [aunudaanKisimData, setAunudaanKisimData] = useState<any[]>([])
  const [lagatSrotData, setLagatSrotData] = useState<any[]>([])
  // const [budget, setBudget] = useState("")
  // Second lagat srot
  const [aunudaanKisimSecondData, setAunudaanKisimSecondData] = useState<any[]>(
    []
  )
  const [lagatSrotSecondData, setLagatSrotSecondData] = useState<any[]>([])
  // const [budgetSecond, setBudgetSecond] = useState("")

  // Third lagat srot
  const [aunudaanKisimThirdData, setAunudaanKisimThirdData] = useState<any[]>(
    []
  )
  const [lagatSrotThirdData, setLagatSrotThirdData] = useState<any[]>([])
  // const [budgetThird, setBudgetThird] = useState("")

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

  const [sabhaNirnayaMiti, setSabhaNirnayaMiti] = useState("")
  const [yojanaKoWada, setYojanaKoWada] = useState("")
  const [yojanaKoNaam, setYojanaKoNaam] = useState("")
  const [budgetKitabSnum, setBudgetKitabSnum] = useState("")
  const [mukhyaSamiti, setMukhyaSamiti] = useState("")
  const [anudanKoNaam, setAnudanKoNaam] = useState("")
  const [lagatSrotHaru, setLagatSrotHaru] = useState("")
  const [lagatSrotAmount, setLagatSrotAmount] = useState("")
  const [anudanKoNaam2, setAnudanKoNaam2] = useState("")
  const [lagatSrotHaru2, setLagatSrotHaru2] = useState("")
  const [lagatSrotAmount2, setLagatSrotAmount2] = useState("")
  const [anudanKoNaam3, setAnudanKoNaam3] = useState("")
  const [lagatSrotHaru3, setLagatSrotHaru3] = useState("")
  const [lagatSrotAmount3, setLagatSrotAmount3] = useState("")
  const [yojanaUpachetra, setYojanaUpachetra] = useState("")
  const [yojanaKoKisim, setYojanaKoKisim] = useState("")
  const [wada, setWada] = useState("")
  const [karyagatSamuha, setKaryagatSamuha] = useState("")
  const [prabidhikEstimateAmount, setPrabidhikEstimateAmount] = useState("")
  const [budgetType, setBudgetType] = useState("")
  const [biniyojitRakam, setBiniyojitRakam] = useState(totalSum.toString())
  const [yojanaSwikrit, setYojanaSwikrit] = useState("")
  const [contengency, setContengency] = useState("")
  const [contengencyResult, setContengencyResult] = useState("")
  const [marmatRakam, setMarmatRakam] = useState("")
  const [markmatRakamResult, setMarkmatRakamResult] = useState("")
  const [dharautiRakam, setDharautiRakam] = useState("")
  const [dharautiRakamResult, setDharautiRakamResult] = useState("")
  const [kulAnudaanRakam, setKulAnudaanRakam] = useState("")
  const [janaSramdanRakam, setJanaSramdanRakam] = useState("")
  const [thegana, setThegana] = useState("")
  const [gharPariwarSankhya, setGharPariwarSankhya] = useState("")
  const [janaSankhya, setJanaSankhya] = useState("")
  const [karyaBivaran, setKaryaBivaran] = useState("")
  const [upalabdhiLakshya, setUpalabdhiLakshya] = useState("")
  const [uplabdhiLakhshyaQty, setUplabdhiLakhshyaQty] = useState("")
  const [barsikYojana, setBarsikYojana] = useState(false)
  const [kramagatYojana, setKramagatYojana] = useState(false)

  const [yojanaDartaData, setYojanaDartaData] = useState<any[]>([])

  const [fetchTable, setFetchTable] = useState(false)

  const [btnDisable, setBtnDisable] = useState(false)

  // two checkboxed
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(
    "barsik"
  )

  const handleBarsikYojanaChange = () => {
    setSelectedCheckbox("barsik")
  }

  const handleKramagatYojanaChange = () => {
    setSelectedCheckbox("kramagat")
  }

  // input and select
  // const [inputValue, setInputValue] = useState<string>("")

  const [showDropdown, setShowDropdown] = useState<boolean>(false) // Control dropdown visibility

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(event.target.value)
    console.log(filteredOptions)
    setYojanaKoNaam(event.target.value)
    setShowDropdown(true) // Show dropdown when typing
  }

  // Handle item selection from dropdown
  const handleSelect = (option: string) => {
    // setInputValue(option)
    setYojanaKoNaam(option) // Bind the selected value
    setShowDropdown(false) // Close dropdown after selection
    fetchBudget(option) // Call fetchBudget when an item is selected
  }

  // Filter the options based on the input value
  const filteredOptions = yojanaKoNaamData.filter((option) =>
    option.yojanaKoNaamDt.toLowerCase().includes(yojanaKoNaam.toLowerCase())
  )
  // end

  const [page, setPage] = useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(yojanaDartaData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return yojanaDartaData.slice(start, end)
  }, [page, yojanaDartaData])

  const fetchWadaData = async () => {
    try {
      const data = await fetchWadaNumData()
      setWadaN(data)
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

  const fetchBudget = async (yojanaKoNaamDt: any) => {
    try {
      const data = await fetchYojanaBudgetDataSecond()
      const filteredData = data.filter(
        (item: any) => item.yojanaKoNaamDt === yojanaKoNaamDt
      )

      // Check if filteredData is not empty
      if (filteredData.length > 0) {
        // Assuming you want the first item if there are multiple matches
        const budgetData = filteredData[0].biniyojanBudgetDt
        setLagatSrotAmount(budgetData)
      } else {
        // Handle the case where no data was found
        setLagatSrotAmount("") // Or whatever default value makes sense
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

  const fetchYojanaDarta = async () => {
    try {
      const data = await fetchYojanaDartaData()
      setYojanaDartaData(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  const onSubmit = async () => {
    setBtnDisable(true)
    setBiniyojitRakam(totalSum.toString())
    const result = await saveYojanaDarta(
      sabhaNirnayaMiti,
      yojanaKoWada,
      yojanaKoNaam,
      budgetKitabSnum,
      mukhyaSamiti,
      anudanKoNaam,
      lagatSrotHaru,
      lagatSrotAmount,
      anudanKoNaam2,
      lagatSrotHaru2,
      lagatSrotAmount2,
      anudanKoNaam3,
      lagatSrotHaru3,
      lagatSrotAmount3,
      yojanaUpachetra,
      yojanaKoKisim,
      wada,
      karyagatSamuha,
      prabidhikEstimateAmount,
      budgetType,
      biniyojitRakam,
      yojanaSwikrit,
      contengency,
      contengencyResult,
      marmatRakam,
      markmatRakamResult,
      dharautiRakam,
      dharautiRakamResult,
      kulAnudaanRakam,
      janaSramdanRakam,
      thegana,
      gharPariwarSankhya,
      janaSankhya,
      karyaBivaran,
      upalabdhiLakshya,
      uplabdhiLakhshyaQty,
      barsikYojana,
      kramagatYojana
    )
    if (result.status === "success") {
      setSabhaNirnayaMiti("")
      setYojanaKoWada("")
      setYojanaKoNaam("")
      setBudgetKitabSnum("")
      setMukhyaSamiti("")
      setAnudanKoNaam("")
      setLagatSrotHaru("")
      setLagatSrotAmount("")
      setAnudanKoNaam2("")
      setLagatSrotHaru2("")
      setLagatSrotAmount2("")
      setAnudanKoNaam3("")
      setLagatSrotHaru3("")
      setLagatSrotAmount3("")
      setYojanaUpachetra("")
      setYojanaKoKisim("")
      setWada("")
      setKaryagatSamuha("")
      setPrabidhikEstimateAmount("")
      setBudgetType("")
      setBiniyojitRakam("")
      setYojanaSwikrit("")
      setContengency("")
      setContengencyResult("")
      setMarmatRakam("")
      setMarkmatRakamResult("")
      setDharautiRakam("")
      setDharautiRakamResult("")
      setKulAnudaanRakam("")
      setJanaSramdanRakam("")
      setThegana("")
      setGharPariwarSankhya("")
      setJanaSankhya("")
      setKaryaBivaran("")
      setUpalabdhiLakshya("")
      setUplabdhiLakhshyaQty("")
      setBarsikYojana(false)
      setKramagatYojana(false)
      setYojanaKoNaamData([])
      toast.success("successfully created")
    } else {
      console.error("Error occurred during save")
    }
    setBtnDisable(false)
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
          fetchYojanaDarta(),
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
    setTotalSum(
      Number(lagatSrotAmount) +
        Number(lagatSrotAmount2) +
        Number(lagatSrotAmount3)
    )
  }, [lagatSrotAmount, lagatSrotAmount2, lagatSrotAmount3])

  useEffect(() => {
    setContengencyResult(
      ((Number(contengency) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [contengency, totalSum])

  useEffect(() => {
    setMarkmatRakamResult(
      ((Number(marmatRakam) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [marmatRakam, totalSum])

  useEffect(() => {
    setDharautiRakamResult(
      ((Number(dharautiRakam) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [dharautiRakam, totalSum])

  useEffect(() => {
    setKulAnudaanRakam(
      (
        Number(totalSum) -
        (Number(contengencyResult) +
          Number(markmatRakamResult) +
          Number(dharautiRakamResult))
      ).toString()
    )
  }, [contengencyResult, markmatRakamResult, dharautiRakamResult, totalSum])

  useEffect(() => {
    setJanaSramdanRakam(
      (
        Number(contengencyResult) +
        Number(markmatRakamResult) +
        Number(prabidhikEstimateAmount) -
        Number(totalSum)
      ).toString()
    )
  }, [
    contengencyResult,
    markmatRakamResult,
    dharautiRakamResult,
    totalSum,
    prabidhikEstimateAmount,
  ])

  useEffect(() => {
    setBiniyojitRakam(totalSum.toString())
  }, [totalSum])

  useEffect(() => {
    setContengencyResult(contengencyResult)
  }, [contengencyResult])

  useEffect(() => {
    setMarkmatRakamResult(markmatRakamResult)
  }, [markmatRakamResult])

  useEffect(() => {
    setDharautiRakamResult(dharautiRakamResult)
  }, [dharautiRakamResult])

  useEffect(() => {
    fetchYojanaDarta()
  }, [fetchTable])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteYojanaDarta(deleteId)
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchYojanaDarta()
      } else {
        console.error("Delete unsuccessful")
      }
      setIsModalOpen(false)
      setDeleteId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner color="primary" className="mb-36" />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between bg-white ">
      <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
        योजना दर्ता उपभोक्ता समिती/संस्थागत/व्यक्तिगत र संस्थागत अनुदान
      </h1>
      <br />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                योजना दर्ता उपभोक्ता समिती/संस्थागत/व्यक्तिगत र संस्थागत अनुदान
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="my-4 flex w-full justify-center">
                    <Spinner color="primary" />
                  </div>
                ) : (
                  <Table
                    aria-label="Example static collection table"
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
                      <TableColumn>आयोजना नाम</TableColumn>
                      <TableColumn>आयोजनको प्रकार</TableColumn>
                      <TableColumn>वडा न.</TableColumn>
                      <TableColumn>ल.ई रकम</TableColumn>
                      <TableColumn>अनुदान रकम</TableColumn>
                      <TableColumn>सहभागिता</TableColumn>
                      <TableColumn>Edit</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {items.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {(page - 1) * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell>{item.yojanaKoNaam}</TableCell>
                          <TableCell>{item.yojanaUpachetra}</TableCell>
                          <TableCell>
                            {ConvertToNepaliNumerals(item.wada)}
                          </TableCell>
                          <TableCell>N.a</TableCell>
                          <TableCell>
                            {ConvertToNepaliNumerals(item.kulAnudaanRakam)}
                          </TableCell>
                          <TableCell>N.a</TableCell>
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

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
                value={sabhaNirnayaMiti}
                onChange={(value: string) => setSabhaNirnayaMiti(value)}
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
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={yojanaKoWada ? new Set([yojanaKoWada]) : new Set()} // Binding the selected value
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setYojanaKoWada(selectedValue)
              }}
            >
              {wadaN.map((item) => (
                <SelectItem key={item.wadaNum}>
                  {ConvertToNepaliNumerals(item.wadaNum)}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative mx-auto w-full">
              <input
                type="text"
                value={yojanaKoNaam} // Bind the input value to state
                onChange={handleInputChange} // Handle input change
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Delay dropdown close on blur
                onFocus={() => setShowDropdown(true)} // Show dropdown on input focus
                placeholder="योजनाको नाम"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {showLoadingYojanaNaam && (
                <div className="absolute right-2 top-2">
                  {/* Loading spinner when fetching data */}
                  <svg
                    className="size-5 animate-spin text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </div>
              )}

              {showDropdown && filteredOptions.length > 0 && (
                <ul className="absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
                  {filteredOptions.map((item, index) => (
                    <li
                      key={index}
                      className="cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
                      onMouseDown={() => handleSelect(item.yojanaKoNaamDt)} // Handle selection
                    >
                      {item.yojanaKoNaamDt}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* <Select
              label="योजनाको नाम"
              size="sm"
              className="w-full"
              onChange={(e) => {
                fetchBudget(e.target.value)
              }}
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={yojanaKoNaam ? new Set([yojanaKoNaam]) : new Set()} // Binding the selected value
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setYojanaKoNaam(selectedValue)
              }}
              endContent={showLoadingYojanaNaam ? <Spinner size="sm" /> : ""}
            >
              {yojanaKoNaamData.map((item) => (
                <SelectItem key={item.yojanaKoNaamDt}>
                  {item.yojanaKoNaamDt}
                </SelectItem>
              ))}
            </Select> */}
            <Input
              type="text"
              label="बजेट किताब सि.न."
              size="sm"
              className="w-full sm:w-1/3"
              color="primary"
              value={budgetKitabSnum}
              onChange={(e) => setBudgetKitabSnum(e.target.value)}
            />
          </div>
          <Select
            label="मूख्य समिति"
            size="sm"
            className="w-full"
            placeholder="Select an option" // Optional: if you want a placeholder
            selectedKeys={mukhyaSamiti ? new Set([mukhyaSamiti]) : new Set()} // Binding the selected value
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(", ")
              setMukhyaSamiti(selectedValue)
            }}
          >
            {mukhyaSamitiData.map((item) => (
              <SelectItem key={item.mukhyaSamitiKoNaam}>
                {item.mukhyaSamitiKoNaam}
              </SelectItem>
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
                selectedKeys={
                  anudanKoNaam ? new Set([anudanKoNaam]) : new Set()
                } // Binding the selected value
                onSelectionChange={(keys) => {
                  const selectedValue = Array.from(keys).join(", ")
                  setAnudanKoNaam(selectedValue)
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
                selectedKeys={
                  lagatSrotHaru ? new Set([lagatSrotHaru]) : new Set()
                }
                onSelectionChange={(keys) => {
                  const selectedValue = Array.from(keys).join(", ")
                  setLagatSrotHaru(selectedValue)
                }}
                endContent={showLoadingLagatSrot1 ? <Spinner size="sm" /> : ""}
              >
                {lagatSrotData.map((item) => (
                  <SelectItem key={item.lagatSrotKoNaam}>
                    {item.lagatSrotKoNaam}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="Number"
                label="रकम "
                size="sm"
                className="w-1/4"
                value={lagatSrotAmount}
                onChange={(e) => {
                  setLagatSrotAmount(e.target.value)
                }}
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
                  selectedKeys={
                    anudanKoNaam2 ? new Set([anudanKoNaam2]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys).join(", ")
                    setAnudanKoNaam2(selectedValue)
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
                  selectedKeys={
                    lagatSrotHaru2 ? new Set([lagatSrotHaru2]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys).join(", ")
                    setLagatSrotHaru2(selectedValue)
                  }}
                  endContent={
                    showLoadingLagatSrot2 ? <Spinner size="sm" /> : ""
                  }
                >
                  {lagatSrotSecondData.map((item) => (
                    <SelectItem key={item.lagatSrotKoNaam}>
                      {item.lagatSrotKoNaam}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  type="Number"
                  label="रकम "
                  size="sm"
                  className="w-1/4"
                  value={lagatSrotAmount2}
                  onChange={(e) => {
                    setLagatSrotAmount2(e.target.value)
                  }}
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
                  selectedKeys={
                    anudanKoNaam3 ? new Set([anudanKoNaam3]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys).join(", ")
                    setAnudanKoNaam3(selectedValue)
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
                  selectedKeys={
                    lagatSrotHaru3 ? new Set([lagatSrotHaru3]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys).join(", ")
                    setLagatSrotHaru3(selectedValue)
                  }}
                  endContent={
                    showLoadingLagatSrot3 ? <Spinner size="sm" /> : ""
                  }
                >
                  {lagatSrotThirdData.map((item) => (
                    <SelectItem key={item.lagatSrotKoNaam}>
                      {item.lagatSrotKoNaam}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  type="Number"
                  label="रकम "
                  size="sm"
                  className="w-1/4"
                  value={lagatSrotAmount3}
                  onChange={(e) => {
                    setLagatSrotAmount3(e.target.value)
                  }}
                />
              </div>
            )}

            {/* Toggle buttons aligned right */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowSecond((prev) => !prev)
                  if (showSecond) setLagatSrotAmount2("")
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
                  if (showThird) setLagatSrotAmount3("")
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

          <Select
            label="आयोजना उपक्षेत्र"
            size="sm"
            className="w-full"
            placeholder="Select an option" // Optional: if you want a placeholder
            selectedKeys={
              yojanaUpachetra ? new Set([yojanaUpachetra]) : new Set()
            } // Binding the selected value
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(", ")
              setYojanaUpachetra(selectedValue)
            }}
          >
            {ayojanaUpachetraData.map((item) => (
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
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={
                yojanaKoKisim ? new Set([yojanaKoKisim]) : new Set()
              } // Binding the selected value
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setYojanaKoKisim(selectedValue)
              }}
            >
              {yojanaKoKisimList.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
            <Select
              label="वडा न."
              className="w-full sm:w-1/5"
              size="sm"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={wada ? new Set([wada]) : new Set()} // Binding the selected value
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setWada(selectedValue)
              }}
            >
              {wadaN.map((item) => (
                <SelectItem key={item.wadaNum}>
                  {ConvertToNepaliNumerals(item.wadaNum)}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Select
            label="कार्यागत समुह"
            className="w-full"
            size="sm"
            placeholder="Select an option" // Optional: if you want a placeholder
            selectedKeys={
              karyagatSamuha ? new Set([karyagatSamuha]) : new Set()
            } // Binding the selected value
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(", ")
              setKaryagatSamuha(selectedValue)
            }}
          >
            {karyagatSamuhaList.map((item) => (
              <SelectItem key={item.label}>{item.label}</SelectItem>
            ))}
          </Select>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="Number"
              label="प्राविधिक इस्टिमेट रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
              // onChange={(e) => {
              //   setPravidik(e.target.value)
              // }}
              value={prabidhikEstimateAmount}
              onChange={(e) => {
                setPrabidhikEstimateAmount(e.target.value)
              }}
              // value={pravidik}
            />
            <Select
              label="बजेट Type"
              size="sm"
              className="w-full sm:w-1/2"
              color="success"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={budgetType ? new Set([budgetType]) : new Set()} // Binding the selected value
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setBudgetType(selectedValue)
              }}
            >
              {budgetTypeList.map((item) => (
                <SelectItem key={item.label}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="Number"
              label="विनियोजित रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
              value={biniyojitRakam}
              readOnly
            />
            <Select
              label="योजना स्वीकृत"
              size="sm"
              className="w-full sm:w-1/2"
              color="success"
              placeholder="Select an option"
              selectedKeys={
                yojanaSwikrit ? new Set([yojanaSwikrit]) : new Set()
              }
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setYojanaSwikrit(selectedValue)
              }}
            >
              {yojanaChanotNikaya.map((item) => (
                <SelectItem key={item.yojanaChanotNikaya}>
                  {item.yojanaChanotNikaya}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Button
            onPress={onOpen}
            onClick={() =>
              fetchTable ? setFetchTable(false) : setFetchTable(true)
            }
            className="mt-4 w-full sm:w-1/4"
          >
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
                value={contengency}
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
                onChange={(e) => {
                  setContengencyResult(e.target.value)
                  setContengency("")
                }}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="Number"
                label="मर्मत&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-full"
                value={marmatRakam}
                onChange={(e) => {
                  setMarmatRakam(e.target.value)
                }}
              />
              <Input
                type="Number"
                label="&nbsp;"
                size="sm"
                className="w-full"
                value={markmatRakamResult.toString()}
                onChange={(e) => {
                  setMarkmatRakamResult(e.target.value)
                  setMarmatRakam("")
                }}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="Number"
                label="धरौटी&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-full"
                value={dharautiRakam}
                onChange={(e) => {
                  setDharautiRakam(e.target.value)
                }}
              />
              <Input
                type="Number"
                label="&nbsp;"
                size="sm"
                className="w-full"
                value={dharautiRakamResult.toString()}
                onChange={(e) => {
                  setDharautiRakamResult(e.target.value)
                  setDharautiRakam("")
                }}
              />
            </div>
            <Input
              type="Number"
              label="कुल अनुदान रु."
              size="sm"
              className="w-full"
              value={kulAnudaanRakam}
              readOnly
            />
            <Input
              type="Number"
              label="जनश्रमदान रु."
              size="sm"
              className="w-full"
              // value={janaSramDan}
              value={janaSramdanRakam}
              readOnly
            />
            <Input
              type="text"
              label="ठेगाना"
              size="sm"
              className="w-full"
              value={thegana}
              onChange={(e) => setThegana(e.target.value)}
            />
            <Input
              type="Number"
              label="घर परिवार संख्या"
              size="sm"
              className="w-full"
              value={gharPariwarSankhya}
              onChange={(e) => setGharPariwarSankhya(e.target.value)}
            />
            <Input
              type="Number"
              label="जनसंख्या"
              size="sm"
              className="w-full"
              value={janaSankhya}
              onChange={(e) => setJanaSankhya(e.target.value)}
            />
            <Select
              label="कार्य बिवरण "
              size="sm"
              className="w-full"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={karyaBivaran ? new Set([karyaBivaran]) : new Set()} // Binding the selected value
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setKaryaBivaran(selectedValue)
              }}
            >
              {yojanaKaryaBivaranData.map((item) => (
                <SelectItem key={item.yojanaKoKarya}>
                  {item.yojanaKoKarya}
                </SelectItem>
              ))}
            </Select>
            <div className="flex gap-2">
              <Input
                type="text"
                label="उपलब्धि&nbsp;लक्ष्य"
                size="sm"
                className="w-full"
                value={upalabdhiLakshya}
                onChange={(e) => setUpalabdhiLakshya(e.target.value)}
              />
              <Select
                label="उपलब्धि&nbsp;किसिम"
                size="sm"
                className="w-full"
                placeholder="Select an option" // Optional: if you want a placeholder
                selectedKeys={
                  uplabdhiLakhshyaQty
                    ? new Set([uplabdhiLakhshyaQty])
                    : new Set()
                } // Binding the selected value
                onSelectionChange={(keys) => {
                  const selectedValue = Array.from(keys).join(", ")
                  setUplabdhiLakhshyaQty(selectedValue)
                }}
              >
                {qtyDataList.map((item) => (
                  <SelectItem key={item.label}>{item.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex gap-4">
            <Checkbox
              isSelected={selectedCheckbox === "barsik"}
              onChange={(e) => {
                setBarsikYojana(e.target.checked)
                handleBarsikYojanaChange()
              }}
            >
              वार्षिक&nbsp;योजना
            </Checkbox>

            <Checkbox
              isSelected={selectedCheckbox === "kramagat"}
              onChange={(e) => {
                setKramagatYojana(e.target.checked)
                handleKramagatYojanaChange()
              }}
            >
              क्रमागत&nbsp;योजना
            </Checkbox>
          </div>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            className="w-full"
            onClick={onSubmit}
            isDisabled={!yojanaKoNaam || btnDisable}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
