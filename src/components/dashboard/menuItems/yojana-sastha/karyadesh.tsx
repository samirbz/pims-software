"use client"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useEffect, useState } from "react"
import { useMyContext } from "@/context/MyContext"

import {
  fetchYojanaDartaData,
  getYojanaSamjhauta,
  getYojanaDartaForSwikriti,
  getSamjhautaSwikritiTippani,
  saveKaryaDesh,
} from "@/actions/formAction"

import { getStaff } from "@/actions/memberActions"
import { toast } from "react-toastify"

export default function Karyadesh() {
  const [karmachariKoNaamData, setKarmachariKoNaamData] = useState<any[]>([])
  const [patraSankhya, setPatraSankhya] = useState("")
  const [date, setDate] = useState("")
  const [yojanaKaryaKramKoNaam, setYojanaKaryaKramKoNaam] = useState("")
  const [sansthaKoNaam, setSansthaKoNaam] = useState("")
  const [adachyaKoNaam, setAdachyaKoNaam] = useState("")
  const [lagatAnumanRakam, setLagatAnumanRakam] = useState("")
  const [nagarpalikaRu, setNagarpalikaRu] = useState("")
  const [contengencyRakam, setContengencyRakam] = useState("")
  const [khudpauneRakam, setKhudpauneRakam] = useState("")
  const [budgetKitabSNum, setBudgetKitabSNum] = useState("")
  const [gathanMiti, setGathanMiti] = useState("")
  const [mukhyaSamitiKoNaam, setMukhyaSamitiKoNaam] = useState("")
  const [sabhaNirnayaMiti, setSabhaNirnayaMiti] = useState("")
  const [ayojanaSampanaMiti, setAyojanaSampanaMiti] = useState("")
  const [karmachariKoNaam, setKarmachariKoNaam] = useState("")
  const [karmachariKoNaamDt, setKarmachariKoNaamDt] = useState("")
  const [karmachariKoPaad, setKarmachariKoPaad] = useState("")
  const [yojanaKoNaamData, setYojanaKoNaamData] = useState<any[]>([])

  const [pid, setPid] = useState("")

  const { value } = useMyContext()

  const onSubmit = async () => {
    const result = await saveKaryaDesh(
      pid,
      patraSankhya,
      date,
      karmachariKoNaamDt,
      karmachariKoPaad,
      value || ""
    )
    if (result.status === "success") {
      setPid("")
      setPatraSankhya("")
      setDate("")
      setYojanaKaryaKramKoNaam("")
      setSansthaKoNaam("")
      setAdachyaKoNaam("")
      setLagatAnumanRakam("")
      setNagarpalikaRu("")
      setContengencyRakam("")
      setKhudpauneRakam("")
      setBudgetKitabSNum("")
      setGathanMiti("")
      setMukhyaSamitiKoNaam("")
      setSabhaNirnayaMiti("")
      setAyojanaSampanaMiti("")
      setKarmachariKoNaam("")
      setKarmachariKoPaad("")
      toast.success("successfully created")
    } else {
      console.error("Error occurred during save")
    }
  }

  useEffect(() => {
    const fetchYojanaDartaKoNaamData = async () => {
      try {
        const data = await fetchYojanaDartaData(value || "")
        const dataGetStaff = await getStaff()
        setPatraSankhya(value || "")
        setYojanaKoNaamData(data)
        setPid(data[0].id)
        setKarmachariKoNaamData(dataGetStaff || [])
      } catch (e) {
        console.error("Error fetching anudaan data", e)
      }
    }
    fetchYojanaDartaKoNaamData()
  }, [value])

  useEffect(() => {
    const fetchyojanaSamjhautaData = async () => {
      try {
        const dataYojanaDarta = await getYojanaDartaForSwikriti(
          pid,
          value || ""
        )
        // const dataYojanaSamjhuta = await getYojanaSamjhauta(value || "", pid)
        const dataSamjhautaSwikriti = await getSamjhautaSwikritiTippani(
          value || "",
          pid
        )

        const dataYojanaSamjhauta = await getYojanaSamjhauta(value || "", pid)

        setSansthaKoNaam(dataSamjhautaSwikriti[0].upavoktaSamitiKoNaam)
        setAdachyaKoNaam(dataSamjhautaSwikriti[0].adhyachyaKoNaam)
        setLagatAnumanRakam(dataYojanaDarta[0].prabidhikEstimateAmount)
        setContengencyRakam(dataYojanaDarta[0].contengencyResult)
        setNagarpalikaRu(dataYojanaDarta[0].kulAnudaanRakam)
        setKhudpauneRakam(dataYojanaDarta[0].kulAnudaanRakam)
        setBudgetKitabSNum(dataYojanaDarta[0].budgetKitabSnum)
        setGathanMiti(dataSamjhautaSwikriti[0].ushaGathanMiti)
        setSabhaNirnayaMiti(dataYojanaDarta[0].sabhaNirnayaMiti)
        setAyojanaSampanaMiti(dataYojanaSamjhauta[0].yojanaSsampanaHuneMiti)
        setMukhyaSamitiKoNaam(dataYojanaDarta[0].mukhyaSamiti)
      } catch (e) {
        console.error("Error fetching data", e)
      }
    }
    fetchyojanaSamjhautaData()
  }, [value, yojanaKaryaKramKoNaam, pid])

  return (
    <div className="flex flex-col justify-between bg-white ">
      <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
        योजना/कार्यक्रमको कार्यादेश पत्र
      </h1>
      <br />
      <div className="flex w-auto flex-col sm:gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              label="पत्र संख्या"
              size="sm"
              className="w-2/5"
              value={value || patraSankhya}
              onChange={(e) => setPatraSankhya(e.target.value)}
            />
            <form className="flex items-center gap-2 ">
              <label htmlFor="date">मितिः-</label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1 "
                value={date}
                onChange={(value: string) => setDate(value)}
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
            label="उ.स./ सस्थाको नाम"
            size="sm"
            value={sansthaKoNaam}
            onChange={(e) => setSansthaKoNaam(e.target.value)}
          />
          <Input
            type="text"
            label="अध्यक्ष/कर्मचारीको नाम"
            size="sm"
            className="sm:w-1/2"
            value={adachyaKoNaam}
            onChange={(e) => setAdachyaKoNaam(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="text"
              label="लागत अनुमान रकम"
              size="sm"
              value={lagatAnumanRakam}
              onChange={(e) => setLagatAnumanRakam(e.target.value)}
            />
            <Input
              type="text"
              label="नगरपालिका रकम रु"
              size="sm"
              value={nagarpalikaRu}
              onChange={(e) => setNagarpalikaRu(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="कन्टेन्जेन्सी रकम"
              size="sm"
              value={contengencyRakam}
              onChange={(e) => setContengencyRakam(e.target.value)}
            />
            <Input
              type="text"
              label="खुद पाउने रकम"
              size="sm"
              value={khudpauneRakam}
              onChange={(e) => setKhudpauneRakam(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="बजेट किताबको सि.न."
              size="sm"
              value={budgetKitabSNum}
              onChange={(e) => setBudgetKitabSNum(e.target.value)}
            />
            <Input
              type="text"
              label="उ.स. गठन मिति"
              size="sm"
              value={gathanMiti}
              onChange={(e) => setGathanMiti(e.target.value)}
            />
          </div>
          <Input
            type="text"
            label="मुख्य समितिको नाम"
            size="sm"
            className=""
            value={mukhyaSamitiKoNaam}
            onChange={(e) => setMukhyaSamitiKoNaam(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="text"
              label="सभा निर्णय मिति"
              size="sm"
              value={sabhaNirnayaMiti}
              onChange={(e) => setSabhaNirnayaMiti(e.target.value)}
            />
            <Input
              type="text"
              label="आयोजना सम्पन्न मिति"
              size="sm"
              value={ayojanaSampanaMiti}
              onChange={(e) => setAyojanaSampanaMiti(e.target.value)}
            />
          </div>

          <Select
            label="कर्मचारीको नाम"
            size="sm"
            className="sm:w-1/2"
            placeholder="Select an option" // Optional: if you want a placeholder
            selectedKeys={
              karmachariKoNaam ? new Set([karmachariKoNaam]) : new Set()
            }
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(", ")
              // Find the selected item by its id
              const selectedItem = karmachariKoNaamData.find(
                (item) => item.id === selectedValue
              )
              if (selectedItem) {
                console.log(selectedItem.name)
                setKarmachariKoNaam(selectedItem.id) // Save the id
                setKarmachariKoPaad(selectedItem.position) // Set the position
                setKarmachariKoNaamDt(selectedItem.name) // Set the name
              }
            }}
          >
            {karmachariKoNaamData.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </Select>

          <div className="flex items-center justify-between">
            <Input
              type="text"
              label="कर्मचारी पद"
              size="sm"
              value={karmachariKoPaad}
              onChange={(e) => setKarmachariKoPaad(e.target.value)}
            />

            <Button
              color="secondary"
              className=""
              startContent={<FaRegSave />}
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
