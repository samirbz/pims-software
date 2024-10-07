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
import "nepali-datepicker-reactjs/dist/index.css"
import { useEffect, useState } from "react"
import { MdOutlineSupervisorAccount } from "react-icons/md"
import { CiSearch } from "react-icons/ci"
import {
  fetchYojanaDartaData,
  saveYojanaSwikritiTippani,
  getYojanaDartaForSwikriti,
} from "@/actions/formAction"
import { toast } from "react-toastify"
import SamjhautaSwikritiPrint from "@/lib/print/PrintSamjhautaSwikrit"

export default function SamjhautaSwikriti() {
  const [aawa, setAawa] = useState("")
  const [miti, setMiti] = useState("")
  const [yojanaKaryaKramKoNaam, setYojanaKaryaKramKoNaam] = useState("")
  const [upavoktaSamitiKoNaam, setUpavoktaSamitiKoNaam] = useState("")
  const [adhyachyaKoNaam, setAdhyachyaKoNaam] = useState("")
  const [velamaUpasthitiSankhya, setVelamaUpasthitiSankhya] = useState("")
  const [padakariSankhya, setPadakariSankhya] = useState("")
  const [mahilaSankhya, setMahilaSankhya] = useState("")
  const [lagatAnumanRakam, setLagatAnumanRakam] = useState("")
  const [nagarpalikaRakamRu, setNagarpalikaRakamRu] = useState("")
  const [lagatSramDan, setlagatSramDan] = useState("")
  const [contengencyRakam, setContengencyRakam] = useState("")
  const [khudPauneRakam, setKhudPauneRakam] = useState("")
  const [anugamanSamitikaSadasya, setAnugamanSamitikaSadasya] = useState("")
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

  const [yojanaKoNaam, setYojanaKoNaam] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  // const [btnDisable, setBtnDisable] = useState(false)

  const fetchYojanaDartaKoNaamData = async () => {
    try {
      const data = await fetchYojanaDartaData()
      console.log("Fetched Anudaan Data:", data) // For debugging
      setYojanaKoNaam(data)
    } catch (e) {
      console.error("Error fetching anudaan data", e)
    }
  }

  const onSubmit = async () => {
    const result = await saveYojanaSwikritiTippani(
      aawa,
      miti,
      yojanaKaryaKramKoNaam,
      upavoktaSamitiKoNaam,
      adhyachyaKoNaam,
      velamaUpasthitiSankhya,
      padakariSankhya,
      mahilaSankhya,
      lagatAnumanRakam,
      nagarpalikaRakamRu,
      lagatSramDan,
      contengencyRakam,
      khudPauneRakam,
      anugamanSamitikaSadasya,
      budgetKitabSNum,
      ushaGathanMiti,
      mukhyaSamitiKoNaam,
      ushaNibedandiyiyekoMiti,
      anyaTipaniBivaran,
      yojanakoNaam,
      wadaNum,
      biniyojitRakamRu,
      sanyojak,
      sadasyaOne,
      sadasyaTwo
    )
    if (result.status === "success") {
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

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await getYojanaDartaForSwikriti(yojanaKaryaKramKoNaam)

        console.log(data)

        if (data && data.length > 0) {
          const estimateAmount = data[0].prabidhikEstimateAmount
          const kulAnudaan = data[0].kulAnudaanRakam
          const janaSramdan = data[0].janaSramdanRakam
          const contengency = data[0].dharautiRakamResult

          setLagatAnumanRakam(estimateAmount)
          setNagarpalikaRakamRu(kulAnudaan)
          setlagatSramDan(janaSramdan)
          setContengencyRakam(contengency)
          setKhudPauneRakam(kulAnudaan)
          setUpavoktaSamitiKoNaam(
            data[0].karyagatSamuha === "उपभोक्ता समिति"
              ? yojanaKaryaKramKoNaam + " (उपभोक्ता समिति)"
              : ""
          )
        }
      } catch (error) {
        console.error("Error fetching Yojana Darta data:", error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [yojanaKaryaKramKoNaam])

  useEffect(() => {
    fetchYojanaDartaKoNaamData()
  }, [])

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
                value={aawa}
                onChange={(e) => setAawa(e.target.value)}
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
              }}
            >
              {yojanaKoNaam.map((item) => (
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
              <Input
                type="Number"
                label="भेलामा उपस्थिती संख्या"
                size="sm"
                value={velamaUpasthitiSankhya}
                onChange={(e) => setVelamaUpasthitiSankhya(e.target.value)}
              />
              <Input
                type="Number"
                label="पदाधिकारी संख्या"
                size="sm"
                value={padakariSankhya}
                onChange={(e) => setPadakariSankhya(e.target.value)}
              />
              <Input
                type="Number"
                label="महिला संख्या"
                size="sm"
                value={mahilaSankhya}
                onChange={(e) => setMahilaSankhya(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Input
                isReadOnly
                type="Number"
                label=" लागत अनुमान रकम "
                size="sm"
                color="success"
                value={lagatAnumanRakam}
              />
              <Input
                isReadOnly
                type="Number"
                label=" नगरपालिका रकम रु. "
                color="success"
                size="sm"
                value={nagarpalikaRakamRu}
              />
              <Input
                isReadOnly
                type="Number"
                label=" लागत श्रमदान "
                size="sm"
                color="success"
                value={lagatSramDan}
              />
            </div>
            <div className="flex gap-2">
              <Input
                isReadOnly
                type="Number"
                label="कन्टेन्जेन्सी रकम"
                color="success"
                size="sm"
                value={contengencyRakam}
              />
              <Input
                isReadOnly
                type="Number"
                label=" खुद पाउने रकम"
                color="success"
                size="sm"
                value={khudPauneRakam}
              />
              <Input
                type="Number"
                label="अनुगमन समितिका सदस्य"
                size="sm"
                value={anugamanSamitikaSadasya}
                onChange={(e) => setAnugamanSamitikaSadasya(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                label="बजेट किताबको सि.न."
                size="sm"
                className="w-1/2"
                value={budgetKitabSNum}
                onChange={(e) => setVudgetKitabSNum(e.target.value)}
              />
              <form className="flex items-center gap-2 ">
                <label htmlFor="date">उ.स. गठन मिति:-</label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1 "
                  value={ushaGathanMiti}
                  onChange={(value: string) => setUshaGathanMiti(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                label="मुख्य समितिको नाम"
                className="w-1/2"
                size="sm"
                value={mukhyaSamitiKoNaam}
                onChange={(e) => setMukhyaSamitiKoNaam(e.target.value)}
              />

              <form className="flex items-center gap-2 ">
                <label htmlFor="date" className="whitespace-nowrap">
                  उ.स. निवेदन दिईएको मिति:-
                </label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1 "
                  value={ushaNibedandiyiyekoMiti}
                  onChange={(value: string) =>
                    setUshaNibedandiyiyekoMiti(value)
                  }
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
              <Button
                className="bg-pink-500 text-white "
                startContent={
                  <MdOutlineSupervisorAccount size={18} className="mb-1" />
                }
                onPress={onOpen}
              >
                Add Member
              </Button>
            </div>
            <Textarea
              label="अन्य टिप्पणी विवरण"
              className="w-full"
              variant="bordered"
              value={anyaTipaniBivaran}
              onChange={(e) => setAnyaTipaniBivaran(e.target.value)}
            />
            <div className="flex justify-between">
              <Button color="default" className="flex justify-start">
                Reset Form
              </Button>
              <div className="flex justify-end gap-2">
                <Button
                  color="secondary"
                  startContent={<FaRegSave />}
                  onClick={onSubmit}
                >
                  Save
                </Button>
                <Button
                  color="default"
                  startContent={<FaRegSave />}
                  onClick={() => SamjhautaSwikritiPrint("sameer")}
                >
                  Print
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
                    {yojanaKoNaam.map((item) => (
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
