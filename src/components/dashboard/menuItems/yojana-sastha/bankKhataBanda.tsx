"use client"
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState, useEffect } from "react"

import { useMyContext } from "@/context/MyContext"

import {
  fetchYojanaDartaData,
  getYojanaSamjhauta,
  getSamjhautaSwikritiTippani,
  fetchBankBivaranData,
  fetchBankBivaranByBank,
} from "@/actions/formAction"
import { getStaff } from "@/actions/memberActions"

export default function BankKhataBanda() {
  const [patraSankhya, setpatraSankhya] = useState<string>("")
  const [sifarisMiti, setsifarisMiti] = useState<string>("")
  const [yojanaKoNaamData, setYojanaKoNaamData] = useState<any[]>([])
  const [yojanakoNaam, setyojanakoNaam] = useState<string>("")
  const [yediPuranoAawaKoYojana, setyediPuranoAawaKoYojana] =
    useState<boolean>(false)
  const [ushakoNaam, setushakoNaam] = useState<string>("")
  const [wodaNum, setwodaNum] = useState<string>("")
  const [bankKhataNum, setbankKhataNum] = useState<string>("")
  const [bankKoNaamData, setbankKoNaamData] = useState<any[]>([])
  const [bankKoNaam, setbankKoNaam] = useState("")
  const [bankKoSakha, setbankKoSakha] = useState<string>("")
  const [karmachariKoNaamData, setKarmachariKoNaamData] = useState<any[]>([])
  const [karmacharikoNaam, setkarmacharikoNaam] = useState<string>("")
  const [karmachariKoPaad, setkarmachariKoPaad] = useState<string>("")

  const [pid, setPid] = useState("")

  const { value } = useMyContext()

  useEffect(() => {
    const fetchYojanaKoNaam = async () => {
      try {
        const data = await fetchYojanaDartaData(value || "")
        const dataBank = await fetchBankBivaranData(value || "")
        const dataGetStaff = await getStaff()
        setYojanaKoNaamData(data)
        setpatraSankhya(value || "")
        setbankKoNaamData(dataBank)
        setKarmachariKoNaamData(dataGetStaff || [])
      } catch (err) {
        console.log(err)
      }
    }
    fetchYojanaKoNaam()
  }, [value])

  useEffect(() => {
    const fetchYojanaSamkhautaData = async () => {
      try {
        const data = await getYojanaSamjhauta(value || "", pid)
        const dk = await getSamjhautaSwikritiTippani(value || "", pid)
        setPid(data[0].pid)
        setushakoNaam(dk[0].upavoktaSamitiKoNaam)
      } catch (err) {
        console.log(err)
      }
    }
    fetchYojanaSamkhautaData()
  }, [value, yojanakoNaam, pid])

  useEffect(() => {
    const fetchYojanaSamkhautaData = async () => {
      try {
        const data = await fetchBankBivaranByBank(value || "", bankKoNaam)
        setbankKoSakha(data[0].sakha)
      } catch (err) {
        console.log(err)
      }
    }
    fetchYojanaSamkhautaData()
  }, [value, bankKoNaam])

  return (
    <div className="flex flex-col justify-between bg-white ">
      <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
        योजनाको बैक खाता बन्द सिफारिस
      </h1>
      <br />
      <div className="flex w-auto flex-col sm:gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Input
              type="text"
              label="पत्र संख्या"
              size="sm"
              className="w-auto"
              value={patraSankhya}
              onChange={(e) => setpatraSankhya(e.target.value)}
            />
            <form className="flex items-center gap-2 ">
              <label htmlFor="date">सिफारिस&nbsp;मिति</label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1 "
                value={sifarisMiti}
                onChange={(value: string) => setsifarisMiti(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
          </div>

          <div className="flex gap-2">
            <Select
              label="योजना / कार्यक्रमको नाम"
              size="sm"
              className="w-full"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={yojanakoNaam ? new Set([yojanakoNaam]) : new Set()}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setyojanakoNaam(selectedValue)
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
            <Checkbox
              className="whitespace-nowrap"
              checked={yediPuranoAawaKoYojana}
              onChange={(e) => {
                setyediPuranoAawaKoYojana(e.target.checked)
              }}
            >
              यदी पुरानो आ.व.को योजना
            </Checkbox>
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              label="उ.सको नाम"
              size="sm"
              value={ushakoNaam}
              onChange={(e) => setushakoNaam(e.target.value)}
            />
            <Input
              type="text"
              label="वडा न."
              size="sm"
              value={wodaNum}
              onChange={(e) => setwodaNum(e.target.value)}
            />
          </div>
          <Input
            type="text"
            label="बैक खाता न."
            size="sm"
            value={bankKhataNum}
            onChange={(e) => setbankKhataNum(e.target.value)}
          />

          <div className="flex gap-2">
            <Select
              label="बैकको नाम"
              size="sm"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={bankKoNaam ? new Set([bankKoNaam]) : new Set()}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setbankKoNaam(selectedValue)
              }}
            >
              {bankKoNaamData.map((item) => (
                <SelectItem key={item.bankKoNaam} value={item.bankKoNaam}>
                  {item.bankKoNaam}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="शाखा"
              size="sm"
              value={bankKoSakha}
              onChange={(e) => setbankKoSakha(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              label="कर्मचारीको नाम"
              size="sm"
              className="w-1/2"
              placeholder="Select an option" // Optional: if you want a placeholder
              selectedKeys={
                karmacharikoNaam ? new Set([karmacharikoNaam]) : new Set()
              }
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join(", ")
                setkarmacharikoNaam(selectedValue) // Save the id
                // Find the selected item by its id
                const selectedItem = karmachariKoNaamData.find(
                  (item) => item.id === selectedValue
                )
                if (selectedItem) {
                  setkarmachariKoPaad(selectedItem.position) // Set the position
                }
              }}
            >
              {karmachariKoNaamData.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </Select>

            <Input
              type="text"
              label="कर्मचारी पद"
              className="w-1/2"
              size="sm"
              value={karmachariKoPaad}
              onChange={(e) => setkarmachariKoPaad(e.target.value)}
            />
          </div>

          <Button
            color="secondary"
            startContent={<FaRegSave />}
            className="flex w-28 self-end"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
