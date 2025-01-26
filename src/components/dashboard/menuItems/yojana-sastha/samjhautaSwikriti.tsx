"use client"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import NepaliDate from "nepali-date-converter"
import "nepali-datepicker-reactjs/dist/index.css"
import React, { useEffect, useState } from "react"
import { MdOutlineSupervisorAccount } from "react-icons/md"
import { CiSearch } from "react-icons/ci"
import {
  fetchYojanaDartaData,
  saveYojanaSwikritiTippani,
  getYojanaDartaForSwikriti,
  fetchDataByYojanaKaryaKramKoNaam,
  updateYojanaSwikritiTippani,
  getSamjhautaSwikritiTippani,
  fetchMukyaSamitiDataById,
} from "@/actions/formAction"
import { toast } from "react-toastify"
import SamjhautaSwikritiPrint from "@/lib/print/PrintSamjhautaSwikrit"
import {
  useMyContext,
  usePlaceContext,
  useDistrictContext,
  useOfficeContext,
  usePradeshContext,
} from "@/context/MyContext"

// Utility functions
const englishToNepali = (englishNum: string): string => {
  const nepaliDigits = "०१२३४५६७८९";
  const englishDigits = "0123456789";

  return englishNum
    .split("")
    .map((char) => {
      const index = englishDigits.indexOf(char);
      return index !== -1 ? nepaliDigits[index] : char;
    })
    .join("");
};

const nepaliToEnglish = (nepaliNum: string): string => {
  const nepaliDigits = "०१२३४५६७८९";
  const englishDigits = "0123456789";

  return nepaliNum
    .split("")
    .map((char) => {
      const index = nepaliDigits.indexOf(char);
      return index !== -1 ? englishDigits[index] : char;
    })
    .join("");
};

const isValidNumber = (value: string): boolean => {
  const allowedCharacters = /^[०-९0-9]*$/; // Nepali (०-९) and English (0-9) digits
  return allowedCharacters.test(value);
};


const date1 = new NepaliDate()

export default function SamjhautaSwikriti() {
  const [pid, setPid] = useState("")

  const [aawa, setAawa] = useState("")
  const [savedAawa, setSavedAawa] = useState("")

  const [miti, setMiti] = useState("")
  const [yojanaKaryaKramKoNaam, setYojanaKaryaKramKoNaam] = useState("")
  const [upavoktaSamitiKoNaam, setUpavoktaSamitiKoNaam] = useState("")
  const [adhyachyaKoNaam, setAdhyachyaKoNaam] = useState("")

  const [velamaUpasthitiSankhya, setVelamaUpasthitiSankhya] = useState("")
  const [savedVelamaUpasthitiSankhya, setSavedVelamaUpasthitiSankhya] = useState("")

  const [padakariSankhya, setPadakariSankhya] = useState("")
  const [savedPadakariSankhya, setSavedPadakariSankhya] = useState("")

  const [mahilaSankhya, setMahilaSankhya] = useState("")
  const [savedMahilaSankhya, setSavedMahilaSankhya] = useState("")
  const [lagatAnumanRakam, setLagatAnumanRakam] = useState("")
  const [nagarpalikaRakamRu, setNagarpalikaRakamRu] = useState("")
  const [lagatSramDan, setlagatSramDan] = useState("")
  const [contengencyRakam, setContengencyRakam] = useState("")
  const [khudPauneRakam, setKhudPauneRakam] = useState("")

  const [anugamanSamitikaSadasya, setAnugamanSamitikaSadasya] = useState("")
  const [savedAnugamanSamitikaSadasya, setSavedAnugamanSamitikaSadasya] = useState("")

  const [budgetKitabSNum, setVudgetKitabSNum] = useState("")
  const [ushaGathanMiti, setUshaGathanMiti] = useState("")
  const [mukhyaSamitiKoNaam, setMukhyaSamitiKoNaam] = useState("")
  const [ushaNibedandiyiyekoMiti, setUshaNibedandiyiyekoMiti] = useState("")
  const [anyaTipaniBivaran, setAnyaTipaniBivaran] = useState("")
  const [yojanakoNaam, setYojanakoNaam] = useState("")
  const [wadaNum, setWadaNum] = useState("")
  const [biniyojitRakamRu, setBiniyojitRakamRu] = useState("")
  const [sanyojak, setSanyojak] = useState("")
  const [sadasyaOne, setSadasyaOne] = useState("")
  const [sadasyaTwo, setSadasyaTwo] = useState("")

  const [yojanaKoNaamData, setYojanaKoNaamData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [saveOrEdit, setSaveOrEdit] = useState("Save")

  const { value } = useMyContext()
  const { place } = usePlaceContext()
  const { district } = useDistrictContext()
  const { office } = useOfficeContext()
  const { pradesh } = usePradeshContext()

  const [hide, setHide] = useState(false)

  // const [btnDisable, setBtnDisable] = useState(false)

  const handleAlertData = async (yojanaKaryaKramKoNaam: string) => {
    if (!yojanaKaryaKramKoNaam) {
      alert("Please select yojana")
      return
    }

    try {
      alert(
        `
 aawa = ${aawa},
 miti = ${miti},
 yojanaKaryaKramKoNaam = ${yojanaKaryaKramKoNaam},
 upavoktaSamitiKoNaam = ${upavoktaSamitiKoNaam},
 adhyachyaKoNaam = ${adhyachyaKoNaam},
 velamaUpasthitiSankhya = ${velamaUpasthitiSankhya},
 padakariSankhya = ${padakariSankhya},
 mahilaSankhya = ${mahilaSankhya},
 lagatAnumanRakam = ${lagatAnumanRakam},
 nagarpalikaRakamRu = ${nagarpalikaRakamRu},
 lagatSramDan = ${lagatSramDan},
 contengencyRakam = ${contengencyRakam},
 khudPauneRakam = ${khudPauneRakam},
 anugamanSamitikaSadasya = ${anugamanSamitikaSadasya},
 budgetKitabSNum = ${budgetKitabSNum},
 ushaGathanMiti = ${ushaGathanMiti},
 mukhyaSamitiKoNaam = ${mukhyaSamitiKoNaam},
 ushaNibedandiyiyekoMiti = ${ushaNibedandiyiyekoMiti},
 anyaTipaniBivaran = ${anyaTipaniBivaran},
 wadaNum = ${wadaNum},
 biniyojitRakamRu = ${biniyojitRakamRu},
 sanyojak = ${sanyojak},
 sadasyaOne = ${sadasyaOne},
 sadasyaTwo = ${sadasyaTwo},
 place = ${place},
 district = ${district},
 office = ${office},
 pradesh = ${pradesh},
  `
      )
    } catch (error) {
      console.error("Error in handleAlertData:", error)
      alert("An unexpected error occurred.")
    }
  }

  const onSubmit = async () => {
    const aawaConvert = savedAawa.trim()
    const velamaUpasthitiSankhyaConvert = savedVelamaUpasthitiSankhya.trim()
    const padakariSankhyaConvert = savedPadakariSankhya.trim() 
    const mahilaSankhyaConvert = savedMahilaSankhya.trim() 
    const anugamanSamitikaSadasyaConvert = savedAnugamanSamitikaSadasya.trim()
    if (!yojanaKaryaKramKoNaam) {
      alert("Please fill form select yojana")
      return
    }
    if (saveOrEdit === "Edit") {
      const result = await updateYojanaSwikritiTippani(
        pid,
        value || "",
        nepaliToEnglish(aawa),
        miti,
        upavoktaSamitiKoNaam,
        adhyachyaKoNaam,
        nepaliToEnglish(velamaUpasthitiSankhya),
        nepaliToEnglish(padakariSankhya),
        nepaliToEnglish(mahilaSankhya),
        nepaliToEnglish(anugamanSamitikaSadasya),
        ushaGathanMiti,
        ushaNibedandiyiyekoMiti,
        anyaTipaniBivaran,
        wadaNum,
        biniyojitRakamRu,
        sanyojak,
        sadasyaOne,
        sadasyaTwo
      )
      if (result.status === "success") {
        setPid("")
        setAawa("")
        setMiti("")
        setYojanaKaryaKramKoNaam("")
        setUpavoktaSamitiKoNaam("")
        setAdhyachyaKoNaam("")
        setVelamaUpasthitiSankhya("")
        setPadakariSankhya("")
        setMahilaSankhya("")
        setLagatAnumanRakam("")
        setNagarpalikaRakamRu("")
        setlagatSramDan("")
        setContengencyRakam("")
        setKhudPauneRakam("")
        setAnugamanSamitikaSadasya("")
        setVudgetKitabSNum("")
        setUshaGathanMiti("")
        setMukhyaSamitiKoNaam("")
        setUshaNibedandiyiyekoMiti("")
        setAnyaTipaniBivaran("")
        setWadaNum("")
        setBiniyojitRakamRu("")
        setSanyojak("")
        setSadasyaOne("")
        setSadasyaTwo("")
        setSaveOrEdit("Save")
        toast.success("successfully Edited")
      } else {
        console.error("Error occurred during save")
      }
    } else {
      const result = await saveYojanaSwikritiTippani(
        pid,
        value || "",
        aawaConvert || aawa,
        miti || date1.format("YYYY-MM-DD"),
        upavoktaSamitiKoNaam,
        adhyachyaKoNaam,
        velamaUpasthitiSankhyaConvert,
        padakariSankhyaConvert,
        mahilaSankhyaConvert,
        anugamanSamitikaSadasyaConvert,
        ushaGathanMiti || date1.format("YYYY-MM-DD"),
        ushaNibedandiyiyekoMiti || date1.format("YYYY-MM-DD"),
        anyaTipaniBivaran,
        wadaNum,
        biniyojitRakamRu,
        sanyojak,
        sadasyaOne,
        sadasyaTwo
      )
      if (result.status === "success") {
        setPid("")
        setAawa("")
        setMiti("")
        setYojanaKaryaKramKoNaam("")
        setUpavoktaSamitiKoNaam("")
        setAdhyachyaKoNaam("")
        setVelamaUpasthitiSankhya("")
        setPadakariSankhya("")
        setMahilaSankhya("")
        setLagatAnumanRakam("")
        setNagarpalikaRakamRu("")
        setlagatSramDan("")
        setContengencyRakam("")
        setKhudPauneRakam("")
        setAnugamanSamitikaSadasya("")
        setVudgetKitabSNum("")
        setUshaGathanMiti("")
        setMukhyaSamitiKoNaam("")
        setUshaNibedandiyiyekoMiti("")
        setAnyaTipaniBivaran("")
        setYojanakoNaam("")
        setWadaNum("")
        setBiniyojitRakamRu("")
        setSanyojak("")
        setSadasyaOne("")
        setSadasyaTwo("")
        toast.success("successfully created")
      } else {
        console.error("Error occurred during save")
      }
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        setAawa(value || "")
        const response = await getYojanaDartaForSwikriti(pid, value || "")

        const mukhyaSamitiDt = await fetchMukyaSamitiDataById(
          response[0].mukhyaSamiti,
          value || ""
        )

        if (response && response.length > 0) {
          const data = response[0]
          setPid(data.id)
          setLagatAnumanRakam(data.prabidhikEstimateAmount)
          setNagarpalikaRakamRu(data.kulAnudaanRakam)
          setlagatSramDan(data.janaSramdanRakam)
          setContengencyRakam(data.dharautiRakamResult)
          setKhudPauneRakam(data.kulAnudaanRakam)
          setMukhyaSamitiKoNaam(mukhyaSamitiDt[0].mukhyaSamitiKoNaam)
          setVudgetKitabSNum(data.budgetKitabSnum)
          // setUpavoktaSamitiKoNaam(
          //   data.karyagatSamuha === "उपभोक्ता समिति"
          //     ? yojanaKaryaKramKoNaam + " (उपभोक्ता समिति)"
          //     : yojanaKaryaKramKoNaam
          // )
          setUpavoktaSamitiKoNaam(
            `${yojanaKaryaKramKoNaam} (${data.karyagatSamuha})`
          )
          setHide(data.karyagatSamuha !== "उपभोक्ता समिति")
        }
      } catch (error) {
        console.error("Error fetching Yojana Darta data:", error)
      } finally {
        setLoading(false)
      }
    }

    const handleSaveOrEdit = async () => {
      try {
        const response = await fetchDataByYojanaKaryaKramKoNaam(
          value || "",
          pid
        )
        const data = await getSamjhautaSwikritiTippani(value || "", pid)

        if (
          response.status === "success" &&
          response.data &&
          data &&
          response.data.length > 0
        ) {
          const data = response.data[0]
          setMiti(data.miti)
          setUpavoktaSamitiKoNaam(data.upavoktaSamitiKoNaam)
          setAdhyachyaKoNaam(data.adhyachyaKoNaam)
          setVelamaUpasthitiSankhya(englishToNepali(data.velamaUpasthitiSankhya))
          setPadakariSankhya(englishToNepali(data.padakariSankhya))
          setMahilaSankhya(englishToNepali(data.mahilaSankhya))

          setAnugamanSamitikaSadasya(englishToNepali(data.anugamanSamitikaSadasya))
          setUshaGathanMiti(data.ushaGathanMiti)
          setUshaNibedandiyiyekoMiti(data.ushaNibedandiyiyekoMiti)
          setAnyaTipaniBivaran(data.anyaTipaniBivaran)
          setWadaNum(data.wadaNum)
          setBiniyojitRakamRu(data.biniyojitRakamRu)
          setSanyojak(data.sanyojak)
          setSadasyaOne(data.sadasyaOne)
          setSadasyaTwo(data.sadasyaTwo)
          setSaveOrEdit("Edit")
        } else {
          setMiti("")
          setAdhyachyaKoNaam("")
          setVelamaUpasthitiSankhya("")
          setPadakariSankhya("")
          setMahilaSankhya("")
          setAnugamanSamitikaSadasya("")
          setUshaGathanMiti("")
          setUshaNibedandiyiyekoMiti("")
          setAnyaTipaniBivaran("")
          setSaveOrEdit("Save")
        }
      } catch (error) {
        console.error("Error in handleAlertData:", error)
        alert("An unexpected error occurred.")
      }
    }
    handleSaveOrEdit()
    getData()
  }, [yojanaKaryaKramKoNaam, value, pid, hide])

  useEffect(() => {
    const fetchYojanaDartaKoNaamData = async () => {
      try {
        const data = await fetchYojanaDartaData(value || "")
        setAawa(value || "")
        setYojanaKoNaamData(data)
      } catch (e) {
        console.error("Error fetching anudaan data", e)
      }
    }
    fetchYojanaDartaKoNaamData()
  }, [value])

  useEffect(() => {
    if (miti) {
      const selectedDate = new NepaliDate(miti)
      const today = new NepaliDate()

      if (selectedDate > today) {
        alert("Future dates are not allowed")
        setMiti(today.format("YYYY-MM-DD"))
      }
    } 
  }, [miti])

  useEffect(() => {
   if (ushaGathanMiti) {
      const selectedDate = new NepaliDate(ushaGathanMiti)
      const today = new NepaliDate()

      if (selectedDate > today) {
        alert("Future dates are not allowed")
        setUshaGathanMiti(today.format("YYYY-MM-DD"))
      }
    }
  }, [ushaGathanMiti])

  useEffect(() => {
   if (ushaNibedandiyiyekoMiti) {
      const selectedDate = new NepaliDate(ushaNibedandiyiyekoMiti)
      const today = new NepaliDate()

      if (selectedDate > today) {
        alert("Future dates are not allowed")
        setUshaNibedandiyiyekoMiti(today.format("YYYY-MM-DD"))
      }
    }
  }, [ushaNibedandiyiyekoMiti])


      const handleInputChangeAawa = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
    
        if (isValidNumber(input)) {
          const englishValue = nepaliToEnglish(input);
          const nepaliValue = englishToNepali(englishValue);
    
          setAawa(nepaliValue);
          setSavedAawa(englishValue);
        }
      };
      const handleInputChangeVelamaUpasthitiSankhya = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
    
        if (isValidNumber(input)) {
          const englishValue = nepaliToEnglish(input);
          const nepaliValue = englishToNepali(englishValue);
    
          setVelamaUpasthitiSankhya(nepaliValue);
          setSavedVelamaUpasthitiSankhya(englishValue);
        }
      };
      const handleInputChangePadakariSankhya = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
    
        if (isValidNumber(input)) {
          const englishValue = nepaliToEnglish(input);
          const nepaliValue = englishToNepali(englishValue);
    
          setPadakariSankhya(nepaliValue);
          setSavedPadakariSankhya(englishValue);
        }
      };
      const handleInputChangeMahilaSankhya = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
    
        if (isValidNumber(input)) {
          const englishValue = nepaliToEnglish(input);
          const nepaliValue = englishToNepali(englishValue);
    
          setMahilaSankhya(nepaliValue);
          setSavedMahilaSankhya(englishValue);
        }
      };
      const handleInputChangeAnugamanSamitikaSadasya = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
    
        if (isValidNumber(input)) {
          const englishValue = nepaliToEnglish(input);
          const nepaliValue = englishToNepali(englishValue);
    
          setAnugamanSamitikaSadasya(nepaliValue);
          setSavedAnugamanSamitikaSadasya(englishValue);
        }
      };

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
        <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
          योजना / कार्यक्रम प्रस्ताव स्वीकृत टिप्पणी
        </h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="text"
                label=" आ.व "
                size="sm"
                className="w-1/2"
                value={englishToNepali(aawa)}
                onChange={handleInputChangeAawa}
              />
              <form className="flex items-center gap-2 ">
                <label htmlFor="date">मितिः-</label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1 "
                  value={miti}
                  onChange={(value: string) => setMiti(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
            </div>
            <Select
              label="योजना / कार्यक्रमको नाम"
              size="sm"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={
                yojanaKaryaKramKoNaam
                  ? new Set([yojanaKaryaKramKoNaam])
                  : new Set()
              }
              endContent={loading ? "loading..." : null}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setYojanaKaryaKramKoNaam(selectedValue)

                // Find the selected item by its name and set the pid
                const selectedItem = yojanaKoNaamData.find(
                  (item) => item.yojanaKoNaam === selectedValue
                )
                if (selectedItem) {
                  setPid(selectedItem.id)
                }
              }}
            >
              {yojanaKoNaamData.map((item) => (
                <SelectItem key={item.yojanaKoNaam} value={item.yojanaKoNaam}>
                  {item.yojanaKoNaam}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="उपभोक्ता समितिको नाम "
              size="sm"
              value={upavoktaSamitiKoNaam}
              onChange={(e) => setUpavoktaSamitiKoNaam(e.target.value)}
            />
            <Input
              type="text"
              label="अध्यक्षको नाम"
              size="sm"
              value={adhyachyaKoNaam}
              onChange={(e) => setAdhyachyaKoNaam(e.target.value)}
            />
            <div className="flex gap-2">
              {!hide && (
                <Input
                  type="text"
                  label="भेलामा उपस्थिती संख्या"
                  size="sm"
                  value={velamaUpasthitiSankhya}
                  onChange={handleInputChangeVelamaUpasthitiSankhya}
                />
              )}
              {!hide && (
                <Input
                  type="text"
                  label="पदाधिकारी संख्या"
                  size="sm"
                  value={padakariSankhya}
                  onChange={handleInputChangePadakariSankhya}
                />
              )}
              {!hide && (
                <Input
                  type="text"
                  label="महिला संख्या"
                  size="sm"
                  value={mahilaSankhya}
                  onChange={handleInputChangeMahilaSankhya}
                />
              )}
            </div>
            <div className="flex gap-2">
              <Input
                isReadOnly
                type="text"
                label=" लागत अनुमान रकम "
                size="sm"
                color="success"
                value={englishToNepali(lagatAnumanRakam)}
              />
              <Input
                isReadOnly
                type="text"
                label=" नगरपालिका रकम रु. "
                color="success"
                size="sm"
                value={englishToNepali(nagarpalikaRakamRu)}
              />
              <Input
                isReadOnly
                type="text"
                label=" लागत श्रमदान "
                size="sm"
                color="success"
                value={englishToNepali(lagatSramDan)}
              />
            </div>
            <div className="flex gap-2">
              <Input
                isReadOnly
                type="text"
                label="कन्टेन्जेन्सी रकम"
                color="success"
                size="sm"
                value={englishToNepali(contengencyRakam)}
              />
              <Input
                isReadOnly
                type="text"
                label=" खुद पाउने रकम"
                color="success"
                size="sm"
                value={englishToNepali(khudPauneRakam)}
              />
              <Input
                type="text"
                label="अनुगमन समितिका सदस्य"
                size="sm"
                value={anugamanSamitikaSadasya}
                onChange={handleInputChangeAnugamanSamitikaSadasya}
              />
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                label="बजेट किताबको सि.न."
                size="sm"
                className="w-1/2"
                value={englishToNepali(budgetKitabSNum)}
                onChange={(e) => setVudgetKitabSNum(e.target.value)}
              />

              {!hide && (
                <form className="flex items-center gap-2 ">
                  <label htmlFor="date">उ.स. गठन मिति:-</label>

                  <NepaliDatePicker
                    inputClassName="form-control"
                    className="rounded-lg border p-1"
                    value={ushaGathanMiti}
                    onChange={(value: string) => {
                      setUshaGathanMiti(value)
                    }}
                    options={{
                      calenderLocale: "ne",
                      valueLocale: "en",
                    }}
                  />
                </form>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                label="मुख्य समितिको नाम"
                className="w-1/2"
                size="sm"
                value={mukhyaSamitiKoNaam}
              />

              {!hide && (
                <form className="flex items-center gap-2 ">
                  <label htmlFor="date" className="whitespace-nowrap">
                    उ.स. निवेदन दिईएको मिति:-
                  </label>

                  <NepaliDatePicker
                    inputClassName="form-control"
                    className="rounded-lg border p-1"
                    value={ushaNibedandiyiyekoMiti}
                    onChange={(value: string) => {
                      setUshaNibedandiyiyekoMiti(value)
                    }}
                    options={{
                      calenderLocale: "ne",
                      valueLocale: "en",
                    }}
                  />
                </form>
              )}
              {!hide && (
                <Button
                  className="bg-pink-500 text-white "
                  startContent={
                    <MdOutlineSupervisorAccount size={18} className="mb-1" />
                  }
                  onPress={onOpen}
                >
                  Add Member
                </Button>
              )}
            </div>
            <Textarea
              label="अन्य टिप्पणी विवरण"
              className="w-full"
              variant="bordered"
              value={anyaTipaniBivaran}
              onChange={(e) => setAnyaTipaniBivaran(e.target.value)}
            />
            <div className="">
              <div className="flex justify-end gap-2">
                <Button
                  color="secondary"
                  startContent={<FaRegSave />}
                  onClick={onSubmit}
                >
                  {saveOrEdit}
                </Button>
                <Button
                  color="default"
                  startContent={<FaRegSave />}
                  onClick={async () => {
                    if (!yojanaKaryaKramKoNaam) {
                      alert("Please select yojana")
                      return
                    }
                    SamjhautaSwikritiPrint(
                      englishToNepali(aawa),
                      miti,
                      yojanaKaryaKramKoNaam,
                      upavoktaSamitiKoNaam,
                      adhyachyaKoNaam,
                      englishToNepali(velamaUpasthitiSankhya),
                      englishToNepali(padakariSankhya),
                      englishToNepali(mahilaSankhya),
                      englishToNepali(lagatAnumanRakam),
                      englishToNepali(nagarpalikaRakamRu),
                      englishToNepali(lagatSramDan),
                      englishToNepali(contengencyRakam),
                      englishToNepali(khudPauneRakam),
                      englishToNepali(anugamanSamitikaSadasya),
                      englishToNepali(budgetKitabSNum),
                      ushaGathanMiti,
                      mukhyaSamitiKoNaam,
                      ushaNibedandiyiyekoMiti,
                      anyaTipaniBivaran,
                      yojanakoNaam,
                      wadaNum,
                      biniyojitRakamRu,
                      sanyojak,
                      sadasyaOne,
                      sadasyaTwo,
                      place,
                      district,
                      office,
                      pradesh
                    )
                  }}
                >
                  Print
                </Button>

                <Button
                  color="default"
                  startContent={<FaRegSave />}
                  onClick={() => handleAlertData(yojanaKaryaKramKoNaam)}
                >
                  show data for Print
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                योजनामा अनुगमन समितिको सदस्यको विवरण
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2">
                  <Select
                    label="योजनाको नाम"
                    size="sm"
                    selectedKeys={
                      yojanakoNaam ? new Set([yojanakoNaam]) : new Set()
                    } // Binding the selected value
                    onSelectionChange={(keys) => {
                      const selectedValue = Array.from(keys).join(", ")
                      setYojanakoNaam(selectedValue)
                    }}
                  >
                    {yojanaKoNaamData.map((item) => (
                      <SelectItem
                        key={item.yojanaKoNaam}
                        value={item.yojanaKoNaam}
                      >
                        {item.yojanaKoNaam}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="text"
                    label="वडा न."
                    className="w-1/2"
                    size="sm"
                    value={wadaNum}
                    onChange={(e) => setWadaNum(e.target.value)}
                  />
                  <Input
                    type="number"
                    label="विनियोजित रकम रु."
                    className="w-1/2"
                    size="sm"
                    value={biniyojitRakamRu}
                    onChange={(e) => setBiniyojitRakamRu(e.target.value)}
                  />
                </div>

                <p>योजनामा अनुगमन समितिका पदाधिकारी विवरण</p>

                <div className="flex gap-2">
                  <Input
                    type="text"
                    label="संयोजक"
                    className="w-1/2"
                    size="sm"
                    value={sanyojak}
                    onChange={(e) => setSanyojak(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="सदस्य- १"
                    className="w-1/2"
                    size="sm"
                    value={sadasyaOne}
                    onChange={(e) => setSadasyaOne(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="सदस्य- २"
                    className="w-1/2"
                    size="sm"
                    value={sadasyaTwo}
                    onChange={(e) => setSadasyaTwo(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="secondary"
                  onPress={onClose}
                  startContent={<FaRegSave />}
                >
                  Save
                </Button>
                <Button
                  color="default"
                  onPress={onClose}
                  startContent={<CiSearch color="black" size={18} />}
                >
                  Search List
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
