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
import NepaliDate from 'nepali-date-converter'

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
  editYojanaDarta,
} from "@/actions/formAction"
import { ConvertToNepaliNumerals } from "@/lib/util"
import { toast } from "react-toastify"
import { AiOutlineClear } from "react-icons/ai"
import { useMyContext, usePlaceContext } from "@/context/MyContext"

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
  { key: "3", label: "संस्थागत " },
  { key: "4", label: "अनुदान" },
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
  const [prastabSwikritMiti, setPrastabSwikritMiti] = useState("")
  const [yojanaKoWada, setYojanaKoWada] = useState("")
  const [yojanaKoNaam, setYojanaKoNaam] = useState("")

  const [budgetKitabSnum, setBudgetKitabSnum] = useState("")
  const [savedBudgetKitabSnum, setSavedBudgetKitabSnum] = useState("")


  const [mukhyaSamiti, setMukhyaSamiti] = useState("")
  const [anudanKoNaam, setAnudanKoNaam] = useState("")
  const [lagatSrotHaru, setLagatSrotHaru] = useState("")

  const [lagatSrotAmount, setLagatSrotAmount] = useState("")
  const [savedLagatSrotAmount, setSavedLagatSrotAmount] = useState("")

  const [anudanKoNaam2, setAnudanKoNaam2] = useState("")
  const [lagatSrotHaru2, setLagatSrotHaru2] = useState("")

  const [lagatSrotAmount2, setLagatSrotAmount2] = useState("")
  const [savedLagatSrotAmount2, setSavedLagatSrotAmount2] = useState("")

  const [anudanKoNaam3, setAnudanKoNaam3] = useState("")
  const [lagatSrotHaru3, setLagatSrotHaru3] = useState("")

  const [lagatSrotAmount3, setLagatSrotAmount3] = useState("")
  const [savedLagatSrotAmount3, setSavedLagatSrotAmount3] = useState("")

  const [yojanaUpachetra, setYojanaUpachetra] = useState("")
  const [yojanaKoKisim, setYojanaKoKisim] = useState("अनुदान (गाउँ/नगरपालिका)")
  const [wada, setWada] = useState("")
  const [karyagatSamuha, setKaryagatSamuha] = useState("उपभोक्ता समिति")

  const [prabidhikEstimateAmount, setPrabidhikEstimateAmount] = useState("")
  const [savedPrabidhikEstimateAmount, setSavedPrabidhikEstimateAmount] = useState("")


  const [budgetType, setBudgetType] = useState("ल.ई.")

  const [biniyojitRakam, setBiniyojitRakam] = useState(totalSum.toString())
  const [savedBiniyojitRakam, setSavedBiniyojitRakam] = useState(totalSum.toString())

  const [yojanaSwikrit, setYojanaSwikrit] = useState("")

  const [contengency, setContengency] = useState("")
  const [savedContengency, setSavedContengency] = useState("")

  const [contengencyResult, setContengencyResult] = useState("")
  const [savedContengencyResult, setSavedContengencyResult] = useState("")

  const [marmatRakam, setMarmatRakam] = useState("")
  const [savedMarmatRakam, setSavedMarmatRakam] = useState("")

  const [markmatRakamResult, setMarkmatRakamResult] = useState("")
  const [savedMarkmatRakamResult, setSavedMarkmatRakamResult] = useState("")

  const [dharautiRakam, setDharautiRakam] = useState("")
  const [savedDharautiRakam, setSavedDharautiRakam] = useState("")

  const [dharautiRakamResult, setDharautiRakamResult] = useState("")
  const [savedDharautiRakamResult, setSavedDharautiRakamResult] = useState("")

  const [kulAnudaanRakam, setKulAnudaanRakam] = useState("")
  const [janaSramdanRakam, setJanaSramdanRakam] = useState("")
  const [thegana, setThegana] = useState("")
  const [gharPariwarSankhya, setGharPariwarSankhya] = useState("")
  const [janaSankhya, setJanaSankhya] = useState("")
  const [karyaBivaran, setKaryaBivaran] = useState("")
  const [upalabdhiLakshya, setUpalabdhiLakshya] = useState("")
  const [uplabdhiLakhshyaQty, setUplabdhiLakhshyaQty] = useState("")
  const [barsikYojana, setBarsikYojana] = useState(true)
  const [kramagatYojana, setKramagatYojana] = useState(false)

  const [yojanaDartaData, setYojanaDartaData] = useState<any[]>([])

  const [fetchTable, setFetchTable] = useState(false)

  const [totalBudget, setTotalBudget] = useState("")

  const [btnDisable, setBtnDisable] = useState(false)

  const [editId, setEditId] = useState("")
  const [showEditBtn, setShowEditBtn] = useState(false)

  // two checkboxed
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(
    "barsik"
  )

  const [dateDisabled, setDateDisabled] = useState("उपभोक्ता समिति")

  const [clearAndCancelBtn, setClearAndCancelBtn] = useState(false)

  const { value } = useMyContext()
  const { place } = usePlaceContext()

  const handleBarsikYojanaChange = async () => {
    setSelectedCheckbox("barsik")
    setBarsikYojana(true)
    setKramagatYojana(false)
  }

  const handleKramagatYojanaChange = async () => {
    setSelectedCheckbox("kramagat")
    setKramagatYojana(true)
    setBarsikYojana(false)
  }

  useEffect(() => {
    const handleBarsikYojanaChange = async () => {
      setSelectedCheckbox("barsik")
      setBarsikYojana(true)
      setKramagatYojana(false)
    }

    const handleKramagatYojanaChange = async () => {
      setSelectedCheckbox("kramagat")
      setKramagatYojana(true)
      setBarsikYojana(false)
    }

    if (barsikYojana) {
      handleBarsikYojanaChange()
    } else {
      handleKramagatYojanaChange()
    }
  }, [barsikYojana, kramagatYojana])

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

  // fetch for auto fill according to yojana wadaNum
  const fetchYojanaNaam = async (wadaNum: any) => {
    setShowLoadingYojanaNaam(true)
    try {
      const data = await fetchYojanaBudgetDataSecond(value || "")
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
      const data = await fetchYojanaBudgetDataSecond(value || "")
      const filteredData = data.filter(
        (item: any) => item.yojanaKoNaamDt === yojanaKoNaamDt
      )

      // Check if filteredData is not empty
      if (filteredData.length > 0) {
        // Assuming you want the first item if there are multiple matches
        const budgetData = filteredData[0].biniyojanBudgetDt
        setLagatSrotAmount(englishToNepali(budgetData))
        setTotalBudget(budgetData)
      } else {
        // Handle the case where no data was found
        setLagatSrotAmount("") // Or whatever default value makes sense
      }
    } catch (e) {
      console.error("Error fetching Yojana data", e)
    }
  }

  const fetchLagatSrotHaru = async (anudaanKoNaam: any) => {
    try {
      // Fetch the data from the API or data source
      const data = await fetchFilterLagatSrotData(anudaanKoNaam, value || "")

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
      const data = await fetchFilterLagatSrotData(anudaanKoNaam, value || "")

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
      const data = await fetchFilterLagatSrotData(anudaanKoNaam, value || "")

      // Set the filtered data in the state
      setLagatSrotThirdData(data)
    } catch (e) {
      // Handle any errors that occur during the fetch or filtering process
      console.error("Error fetching data", e)
    } finally {
      setShowLoadingLagatSrot3(false)
    }
  }

  const fetchYojanaDarta = async () => {
    try {
      const data = await fetchYojanaDartaData(value || "")
      setYojanaDartaData(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  const clearAll = () => {
    setSabhaNirnayaMiti("")
    setPrastabSwikritMiti("")
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
    setWada("")
    setDateDisabled("उपभोक्ता समिति")
    setPrabidhikEstimateAmount("")
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
    setYojanaKoNaamData([])
    setShowEditBtn(false)
    setClearAndCancelBtn(false)
  }

  const onSubmit = async () => {
    const trimmedyojanaKoNaam = yojanaKoNaam.trimEnd()
    const budgetKistabSnumConvert = savedBudgetKitabSnum.trim()
    const lagatSrotAmountConvert = savedLagatSrotAmount.trim()
    const lagatSrotAmount2Convert = savedLagatSrotAmount2.trim()
    const lagatSrotAmount3Convert = savedLagatSrotAmount3.trim()
    const biniyojitRakamConvert = savedBiniyojitRakam.trim()
    const prabidhikEstimateAmountConvert = savedPrabidhikEstimateAmount.trim()
    const contengencyConvert = savedContengency.trim()
    const contengencyResultConvert = savedContengencyResult.trim()
    const marmatRakamConvert = savedMarmatRakam.trim()
    const markmatRakamResultConvert = savedMarkmatRakamResult.trim()
    const dharautiRakamConvert = savedDharautiRakam.trim()
    const dharautiRakamResultConvert = savedDharautiRakamResult.trim()

    const existsYojanaKoNaam = yojanaDartaData.some(
      (data) => data.yojanaKoNaam === trimmedyojanaKoNaam
    )

    const existYojanaKoWada = yojanaDartaData.some((data) => data.wada === wada)

    console.log(existsYojanaKoNaam, existYojanaKoWada)

    if (existsYojanaKoNaam && existYojanaKoWada) {
      toast.error("duplicate yojana ko naam in same woda")
      return
    }

    console.log(totalBudget)

    setBiniyojitRakam(englishToNepali(totalSum.toString()))
    const checkAmount = Number(prabidhikEstimateAmount) < Number(biniyojitRakam)
    if (karyagatSamuha === "उपभोक्ता समिति") {
      if (checkAmount) {
        toast.error(
          "prabidik estimate amount is less than total biniyojit amount"
        )
        return
      }
    }
    const result = await saveYojanaDarta(
      sabhaNirnayaMiti || date1.format("YYYY-MM-DD"),
      prastabSwikritMiti || date1.format("YYYY-MM-DD"),
      yojanaKoWada,
      trimmedyojanaKoNaam,
      budgetKistabSnumConvert,
      mukhyaSamiti,
      anudanKoNaam,
      lagatSrotHaru,
      lagatSrotAmountConvert,
      anudanKoNaam2,
      lagatSrotHaru2,
      lagatSrotAmount2Convert,
      anudanKoNaam3,
      lagatSrotHaru3,
      lagatSrotAmount3Convert,
      yojanaUpachetra,
      yojanaKoKisim,
      wada,
      karyagatSamuha,
      prabidhikEstimateAmountConvert,
      budgetType,
      biniyojitRakamConvert,
      yojanaSwikrit,
      contengencyConvert,
      contengencyResultConvert,
      marmatRakamConvert,
      markmatRakamResultConvert,
      dharautiRakamConvert,
      dharautiRakamResultConvert,
      kulAnudaanRakam,
      janaSramdanRakam,
      thegana,
      gharPariwarSankhya,
      janaSankhya,
      karyaBivaran,
      upalabdhiLakshya,
      uplabdhiLakhshyaQty,
      barsikYojana,
      kramagatYojana,
      value || ""
    )
    if (result.status === "success") {
      setSabhaNirnayaMiti("")
      setPrastabSwikritMiti("")
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
      setYojanaKoKisim("अनुदान (गाउँ/नगरपालिका)")
      setWada("")
      setKaryagatSamuha("उपभोक्ता समिति")
      setDateDisabled("उपभोक्ता समिति")
      setPrabidhikEstimateAmount("")
      setBudgetType("ल.ई.")
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
      setYojanaKoNaamData([])
      toast.success("successfully created")
    } else {
      console.error("Error occurred during save")
    }
  }

  const handleEdit = async (item: any, onClose: any) => {
    onClose()
    setShowEditBtn(true)
    setEditId(item.id)
    setSabhaNirnayaMiti(item.sabhaNirnayaMiti)
    setPrastabSwikritMiti(item.prastabSwikritMiti)
    setYojanaKoWada(item.yojanaKoWada)
    setYojanaKoNaam(item.yojanaKoNaam)
    setBudgetKitabSnum(englishToNepali(item.budgetKitabSnum))
    setMukhyaSamiti(item.mukhyaSamiti)
    setAnudanKoNaam(item.anudanKoNaam)
    setLagatSrotHaru(item.lagatSrotHaru)
    setLagatSrotAmount(englishToNepali(item.lagatSrotAmount))
    setAnudanKoNaam2(item.anudanKoNaam2)
    setLagatSrotHaru2(item.lagatSrotHaru2)
    setLagatSrotAmount2(englishToNepali(item.lagatSrotAmount2))
    setAnudanKoNaam3(item.anudanKoNaam3)
    setLagatSrotHaru3(item.lagatSrotHaru3)
    setLagatSrotAmount3(englishToNepali(item.lagatSrotAmount3))
    setYojanaUpachetra(item.yojanaUpachetra)
    setYojanaKoKisim(item.yojanaKoKisim)
    setWada(item.wada)
    setKaryagatSamuha(item.karyagatSamuha)
    setDateDisabled(item.karyagatSamuha)
    setPrabidhikEstimateAmount(englishToNepali(item.prabidhikEstimateAmount))
    setBudgetType(item.budgetType)
    setBiniyojitRakam(englishToNepali(item.biniyojitRakam))
    setYojanaSwikrit(item.yojanaSwikrit)
    setContengency(englishToNepali(item.contengency))
    setContengencyResult(englishToNepali(item.contengencyResult))
    setMarmatRakam(englishToNepali(item.marmatRakam))
    setMarkmatRakamResult(englishToNepali(item.markmatRakamResult))
    setDharautiRakam(englishToNepali(item.dharautiRakam))
    setDharautiRakamResult(englishToNepali(item.dharautiRakamResult))
    setKulAnudaanRakam(item.kulAnudaanRakam)
    setJanaSramdanRakam(item.janaSramdanRakam)
    setThegana(item.thegana)
    setGharPariwarSankhya(item.gharPariwarSankhya)
    setJanaSankhya(item.janaSankhya)
    setKaryaBivaran(item.karyaBivaran)
    setUpalabdhiLakshya(item.upalabdhiLakshya)
    setUplabdhiLakhshyaQty(item.uplabdhiLakhshyaQty)
    setBarsikYojana(item.barsikYojana)
    setKramagatYojana(item.kramagatYojana)
    setYojanaKoNaamData([])
    setClearAndCancelBtn(true)
  }

  useEffect(() => {
    lagatSrotAmount2 === "" ? setShowSecond(false) : setShowSecond(true)
    lagatSrotAmount3 === "" ? setShowThird(false) : setShowThird(true)
  }, [lagatSrotAmount2, lagatSrotAmount3])

  const edit = async () => {
    const result = await editYojanaDarta(
      editId,
      sabhaNirnayaMiti,
      prastabSwikritMiti,
      yojanaKoWada,
      yojanaKoNaam,
      nepaliToEnglish(budgetKitabSnum),
      mukhyaSamiti,
      anudanKoNaam,
      lagatSrotHaru,
      nepaliToEnglish(lagatSrotAmount),
      anudanKoNaam2,
      lagatSrotHaru2,
      nepaliToEnglish(lagatSrotAmount2),
      anudanKoNaam3,
      lagatSrotHaru3,
      nepaliToEnglish(lagatSrotAmount3),
      yojanaUpachetra,
      yojanaKoKisim,
      wada,
      karyagatSamuha,
      nepaliToEnglish(prabidhikEstimateAmount),
      budgetType,
      nepaliToEnglish(biniyojitRakam),
      yojanaSwikrit,
      nepaliToEnglish(contengency),
      nepaliToEnglish(contengencyResult),
      nepaliToEnglish(marmatRakam),
      nepaliToEnglish(markmatRakamResult),
      nepaliToEnglish(dharautiRakam),
      nepaliToEnglish(dharautiRakamResult),
      kulAnudaanRakam,
      janaSramdanRakam,
      thegana,
      gharPariwarSankhya,
      janaSankhya,
      karyaBivaran,
      upalabdhiLakshya,
      uplabdhiLakhshyaQty,
      barsikYojana,
      kramagatYojana,
      value || ""
    )
    if (result.status === "success") {
      setClearAndCancelBtn(false)
      clearAll()
      toast.success("successfully edited")
    } else {
      console.error("Error occurred")
    }
  }

  useEffect(() => {
    const fetchWadaData = async () => {
      try {
        const data = await fetchWadaNumData(value || "")
        setWadaN(data)
      } catch (e) {
        console.error("Error fetching anudaan data", e)
      }
    }

    const fetchMukhyaSamiti = async () => {
      try {
        const data = await fetchMukyaSamitiData(value || "")
        // Filter the data based on the provided ID

        setMukhyaSamitiData(data)
      } catch (e) {
        console.error("Error fetching Mukhya Samiti data", e)
      }
    }

    const fetchAnudaanKoNaam = async () => {
      try {
        const data = await fetchAnudaanKoNaamData(value || "")
        // Filter the data based on the provided ID
        // const filteredData = data.filter((item: any) => item.id === id)
        setAunudaanKisimData(data)
      } catch (e) {
        console.error("Error fetching Mukhya Samiti data", e)
      }
    }

    const fetchSecondAnudaanKoNaam = async () => {
      try {
        const data = await fetchAnudaanKoNaamData(value || "")
        // Filter the data based on the provided ID
        // const filteredData = data.filter((item: any) => item.id === id)
        setAunudaanKisimSecondData(data)
      } catch (e) {
        console.error("Error fetching Mukhya Samiti data", e)
      }
    }

    const fetchThirdAnudaanKoNaam = async () => {
      try {
        const data = await fetchAnudaanKoNaamData(value || "")
        // Filter the data based on the provided ID
        // const filteredData = data.filter((item: any) => item.id === id)
        setAunudaanKisimThirdData(data)
      } catch (e) {
        console.error("Error fetching Mukhya Samiti data", e)
      }
    }

    const fetchYojanaKaryaBivaran = async () => {
      try {
        const data = await fetchYojanaKaryaBivaranData(value || "")
        setYojanaKaryaBivaranData(data)
      } catch (e) {
        // Handle any errors that occur during the fetch or filtering process
        console.error("Error fetching data", e)
      }
    }

    const ayojanaUpachetra = async () => {
      try {
        const data = await fetchYojanaPrakarData(value || "")
        setAyojanaUpachetraData(data)
      } catch (e) {
        // Handle any errors that occur during the fetch or filtering process
        console.error("Error fetching data", e)
      }
    }

    const fetYojanaChanotNikaya = async () => {
      try {
        const data = await fetchYojanaChanotNikayaData(value || "")
        setYojanaChanotNikaya(data)
      } catch (e) {
        // Handle any errors that occur during the fetch or filtering process
        console.error("Error fetching data", e)
      }
    }

    const fetchYojanaDarta = async () => {
      try {
        const data = await fetchYojanaDartaData(value || "")
        setYojanaDartaData(data)
      } catch (e) {
        console.error("Error fetching anudaan data", e)
      }
    }

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
  }, [value])

  useEffect(() => {
    setTotalSum(
      Number(nepaliToEnglish(lagatSrotAmount)) +
        Number(nepaliToEnglish(lagatSrotAmount2)) +
        Number(nepaliToEnglish(lagatSrotAmount3))
    )
  }, [lagatSrotAmount, lagatSrotAmount2, lagatSrotAmount3])

  useEffect(() => {
    setContengencyResult(
      ((Number(nepaliToEnglish(contengency)) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [contengency, totalSum])

  useEffect(() => {
    setMarkmatRakamResult(
      ((Number(nepaliToEnglish(marmatRakam)) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [marmatRakam, totalSum])

  useEffect(() => {
    setDharautiRakamResult(
      ((Number(nepaliToEnglish(dharautiRakam)) / 100) * Number(totalSum)).toFixed(2).toString()
    )
  }, [dharautiRakam, totalSum])

  useEffect(() => {
    setKulAnudaanRakam(
      (
        Number(totalSum) -
        (Number(nepaliToEnglish(contengencyResult)) +
          Number(nepaliToEnglish(markmatRakamResult)) +
          Number(nepaliToEnglish(dharautiRakamResult)))
      ).toString()
    )
  }, [contengencyResult, markmatRakamResult, dharautiRakamResult, totalSum])

  useEffect(() => {
    setJanaSramdanRakam(
      (
        Number(nepaliToEnglish(contengencyResult)) +
        Number(nepaliToEnglish(markmatRakamResult)) +
        Number(nepaliToEnglish(prabidhikEstimateAmount)) -
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
    setBiniyojitRakam(englishToNepali(totalSum.toString()))
  }, [totalSum])

  useEffect(() => {
    setContengencyResult(nepaliToEnglish(contengencyResult))
  }, [contengencyResult])

  useEffect(() => {
    setMarkmatRakamResult(nepaliToEnglish(markmatRakamResult))
  }, [markmatRakamResult])

  useEffect(() => {
    setDharautiRakamResult(nepaliToEnglish(dharautiRakamResult))
  }, [dharautiRakamResult])

  useEffect(() => {
    const fetchYojanaDarta = async () => {
      try {
        const data = await fetchYojanaDartaData(value || "")
        setYojanaDartaData(data)
      } catch (e) {
        console.error("Error fetching anudaan data", e)
      }
    }
    fetchYojanaDarta()
  }, [value])

  useEffect(() => {
    setBtnDisable(yojanaKoNaam.trim() === "")
    const fetchYojanaDarta = async () => {
      try {
        const data = await fetchYojanaDartaData(value || "")
        setYojanaDartaData(data)
      } catch (e) {
        console.error("Error fetching anudaan data", e)
      }
    }
    fetchYojanaDarta()
  }, [yojanaKoNaam, value])

  useEffect(() => {
    setThegana(`${place} - ${wada}`)
  }, [place, wada])

  useEffect(() => {
    const fetchLagatSrotHaru = async (anudaanKoNaam: any) => {
      try {
        // Fetch the data from the API or data source
        const data = await fetchFilterLagatSrotData(anudaanKoNaam, value || "")

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
        const data = await fetchFilterLagatSrotData(anudaanKoNaam, value || "")

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
        const data = await fetchFilterLagatSrotData(anudaanKoNaam, value || "")

        // Set the filtered data in the state
        setLagatSrotThirdData(data)
      } catch (e) {
        // Handle any errors that occur during the fetch or filtering process
        console.error("Error fetching data", e)
      } finally {
        setShowLoadingLagatSrot3(false)
      }
    }

    fetchLagatSrotHaru(anudanKoNaam)
    fetchSecondLagatSrotHaru(anudanKoNaam2)
    fetchThirdLagatSrotHaru(anudanKoNaam3)
  }, [anudanKoNaam, anudanKoNaam2, anudanKoNaam3, value])

  useEffect(() => {
    if (sabhaNirnayaMiti) {
      const selectedDate = new NepaliDate(sabhaNirnayaMiti);
      const today = new NepaliDate();
  
      if (selectedDate > today) {
        alert("Future dates are not allowed");
        setSabhaNirnayaMiti(today.format("YYYY-MM-DD"));
      }
    }
    },[sabhaNirnayaMiti])
  useEffect(() => {
   if(prastabSwikritMiti){
      const selectedDate = new NepaliDate(prastabSwikritMiti);
      const today = new NepaliDate();
  
      if (selectedDate > today) {
        alert("Future dates are not allowed");
        setPrastabSwikritMiti(today.format("YYYY-MM-DD"));
      }
    }
    },[prastabSwikritMiti])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteYojanaDarta(deleteId, value || "")
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

   // Input change handler
    const handleInputChangeBudgetKitabSnum = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setBudgetKitabSnum(nepaliValue);
        setSavedBudgetKitabSnum(englishValue);
      }
    };

    const handleInputChangelagatSrotAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setLagatSrotAmount(nepaliValue);
        setSavedLagatSrotAmount(englishValue);
      }
    };

    const handleInputChangelagatSrotAmount2 = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setLagatSrotAmount2(nepaliValue);
        setSavedLagatSrotAmount2(englishValue);
      }
    };
    const handleInputChangelagatSrotAmount3 = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setLagatSrotAmount3(nepaliValue);
        setSavedLagatSrotAmount3(englishValue);
      }
    };
    const handleInputChangeBiniyojitRakam = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setBiniyojitRakam(nepaliValue);
        setSavedBiniyojitRakam(englishValue);
      }
    };
    const handleInputChangePrabidhikEstimateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setPrabidhikEstimateAmount(nepaliValue);
        setSavedPrabidhikEstimateAmount(englishValue);
      }
    };
    const handleInputChangeContengency = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setContengency(nepaliValue);
        setSavedContengency(englishValue);
      }
    };
    const handleInputChangeContengencyResult = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setContengencyResult(nepaliValue);
        setSavedContengencyResult(englishValue);
        setContengency("")
      }
    };
    const handleInputChangeMarmatRakam = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setMarmatRakam(nepaliValue);
        setSavedMarmatRakam(englishValue);
      }
    };
    const handleInputChangeMarmatRakamResult = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setMarkmatRakamResult(nepaliValue);
        setSavedMarkmatRakamResult(englishValue);
        setMarmatRakam("")
      }
    };
    const handleInputChangeDharautiRakam = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setDharautiRakam(nepaliValue);
        setSavedDharautiRakam(englishValue);
      }
    };
    const handleInputChangeDharautiRakamResult = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
  
      if (isValidNumber(input)) {
        const englishValue = nepaliToEnglish(input);
        const nepaliValue = englishToNepali(englishValue);
  
        setDharautiRakamResult(nepaliValue);
        setSavedDharautiRakamResult(englishValue);
        setDharautiRakam("")
      }
    };

  const [filterAyojanaKoNaam, setFilterAyojanaKoNaam] = useState("")
  const [page, setPage] = useState(1)
  const rowsPerPage = 7

  // Filter the full dataset first
  const filteredYojanaDartaData = React.useMemo(() => {
    return yojanaDartaData.filter((item) =>
      item.yojanaKoNaam
        .toLowerCase()
        .includes(filterAyojanaKoNaam.toLowerCase())
    )
  }, [filterAyojanaKoNaam, yojanaDartaData])

  // Paginate the filtered data
  const paginatedItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredYojanaDartaData.slice(start, end)
  }, [page, filteredYojanaDartaData])

  const totalPages = Math.ceil(filteredYojanaDartaData.length / rowsPerPage)

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
                <div className="flex flex-col gap-4">
                  {/* Filter Input */}
                  <Input
                    type="text"
                    placeholder="आयोजना नाम खोज्नुहोस्..."
                    value={filterAyojanaKoNaam}
                    onChange={(e) => setFilterAyojanaKoNaam(e.target.value)}
                    size="sm"
                    className="w-full"
                  />

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
                            total={totalPages}
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
                        {paginatedItems.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {(page - 1) * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell>{item.yojanaKoNaam}</TableCell>
                            {/* <TableCell>{item.yojanaUpachetra}</TableCell> */}
                            <TableCell>
                              {ayojanaUpachetraData.find((data) => {
                                return (
                                  data.id === item.yojanaUpachetra
                                )
                              })?.yojanaPrakar || "Loading..."}
                            </TableCell>
                            <TableCell>
                              {ConvertToNepaliNumerals(item.wada)}
                            </TableCell>
                            <TableCell>
                              {item.prabidhikEstimateAmount}
                            </TableCell>
                            <TableCell>
                              {ConvertToNepaliNumerals(item.kulAnudaanRakam)}
                            </TableCell>
                            <TableCell>{item.janaSramdanRakam}</TableCell>
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
                                  <DropdownItem
                                    onPress={() => handleEdit(item, onClose)}
                                  >
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
              endContent={loading && <Spinner color="primary" />}
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

            <Input
              type="text"
              label="बजेट किताब सि.न."
              size="sm"
              className="w-full sm:w-1/3"
              color="primary"
              value={budgetKitabSnum}
              onChange={handleInputChangeBudgetKitabSnum}
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
            startContent={loading && <Spinner color="primary" />}
          >
            {mukhyaSamitiData.map((item) => (
              <SelectItem key={item.id} value={item.id}>
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
                  setShowLoadingLagatSrot1(true)
                }}
                startContent={loading && <Spinner color="primary" />}
              >
                {aunudaanKisimData.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
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
                endContent={showLoadingLagatSrot1 && <Spinner size="sm" />}
              >
                {lagatSrotData.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.lagatSrotKoNaam}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="text"
                label="रकम "
                size="sm"
                className="w-1/4"
                value={lagatSrotAmount}
                onChange={handleInputChangelagatSrotAmount}
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
                    <SelectItem key={item.id} value={item.id}>
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
                    <SelectItem key={item.id} value={item.id}>
                      {item.lagatSrotKoNaam}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  type="text"
                  label="रकम "
                  size="sm"
                  className="w-1/4"
                  value={lagatSrotAmount2}
                  onChange={handleInputChangelagatSrotAmount2}
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
                    <SelectItem key={item.id} value={item.id}>
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
                    <SelectItem key={item.id} value={item.id}>
                      {item.lagatSrotKoNaam}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  type="text"
                  label="रकम "
                  size="sm"
                  className="w-1/4"
                  value={lagatSrotAmount3}
                  onChange={handleInputChangelagatSrotAmount3}
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
            startContent={loading && <Spinner color="primary" />}
          >
            {ayojanaUpachetraData.map((item) => (
              <SelectItem key={item.id} value={item.id}>
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
                <SelectItem key={item.label}>{item.label}</SelectItem>
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

          <div className="flex flex-col gap-2 sm:flex-row">
            <Select
              label="कार्यागत समुह"
              className="w-full sm:w-1/2"
              size="sm"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={
                karyagatSamuha ? new Set([karyagatSamuha]) : new Set()
              } // Binding the selected value
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setKaryagatSamuha(selectedValue)
                setDateDisabled(selectedValue)
              }}
            >
              {karyagatSamuhaList.map((item) => (
                <SelectItem key={item.label}>{item.label}</SelectItem>
              ))}
            </Select>
            {dateDisabled !== "उपभोक्ता समिति" && (
              <form className="flex items-center gap-2 pl-2 sm:p-0">
                <label htmlFor="date" className="block text-sm">
                  प्रस्ताव स्वीकृत मिति
                </label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1"
                  value={prastabSwikritMiti}
                  onChange={(value: string) => setPrastabSwikritMiti(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label={
                karyagatSamuha === "उपभोक्ता समिति" || karyagatSamuha === ""
                  ? "प्राविधिक इस्टिमेट रकम रु."
                  : "प्रस्तावित रकम "
              }
              size="sm"
              className="w-full sm:w-1/2"
              // onChange={(e) => {
              //   setPravidik(e.target.value)
              // }}
              value={prabidhikEstimateAmount}
              onChange={handleInputChangePrabidhikEstimateAmount}
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
              type="text"
              label="विनियोजित रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
              value={englishToNepali(biniyojitRakam)}
              onChange={handleInputChangeBiniyojitRakam}
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
            color="primary"
            className="mt-4 w-full sm:w-1/4"
          >
            Open table <RiArrowDownDoubleFill />
          </Button>
          {/* <Button
            color="default"
            className="mt-2 w-full sm:w-1/4"
            onPress={clearAll}
          >
            Reset Form
          </Button> */}
        </div>

        <div className="flex w-full flex-col gap-4 sm:w-1/3">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="text"
                label="कन्टेन्जेन्सी&nbsp;%"
                size="sm"
                className="w-full"
                value={contengency}
                onChange={handleInputChangeContengency}
              />
              <Input
                type="text"
                label="&nbsp;"
                size="sm"
                className="w-full"
                value={englishToNepali(contengencyResult.toString())}
                onChange={handleInputChangeContengencyResult}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="मर्मत&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-full"
                value={englishToNepali(marmatRakam)}
                onChange={handleInputChangeMarmatRakam}
              />
              <Input
                type="text"
                label="&nbsp;"
                size="sm"
                className="w-full"
                value={englishToNepali(markmatRakamResult.toString())}
                onChange={handleInputChangeMarmatRakamResult}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="धरौटी&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-full"
                value={englishToNepali(dharautiRakam)}
                onChange={handleInputChangeDharautiRakam}
              />
              <Input
                type="text"
                label="&nbsp;"
                size="sm"
                className="w-full"
                value={englishToNepali(dharautiRakamResult.toString())}
                onChange={handleInputChangeDharautiRakamResult}
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
              // label="जनश्रमदान रु."
              label={
                karyagatSamuha === "उपभोक्ता समिति"
                  ? "जनश्रमदान रु."
                  : "लागत सहभागिता "
              }
              size="sm"
              className="w-full"
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
                type="Number"
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
              onChange={() => {
                handleBarsikYojanaChange()
              }}
            >
              वार्षिक&nbsp;योजना
            </Checkbox>

            <Checkbox
              isSelected={selectedCheckbox === "kramagat"}
              onChange={() => {
                handleKramagatYojanaChange()
              }}
            >
              क्रमागत&nbsp;योजना
            </Checkbox>
          </div>
          <div className="flex gap-2">
            {showEditBtn ? (
              <Button
                color="secondary"
                startContent={<MdModeEditOutline />}
                className="w-12"
                onClick={edit}
              >
                Edit
              </Button>
            ) : (
              <Button
                color="secondary"
                startContent={<FaRegSave />}
                className="w-12"
                onClick={onSubmit}
                isDisabled={!yojanaKoNaam.trimEnd() || btnDisable}
              >
                Save
              </Button>
            )}
            <Button
              startContent={<AiOutlineClear />}
              onPress={clearAll}
              className="w-12"
            >
              {clearAndCancelBtn ? "Cancel" : "Clear"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
