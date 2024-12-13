"use client"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState, useEffect } from "react"
import { useMyContext } from "@/context/MyContext"

import {
  getYojanaSamjhautaData,
  getYojanaSamjhauta,
  fetchBankBivaranData,
  fetchBankBivaranByBank,
} from "@/actions/formAction"
import { getStaff } from "@/actions/memberActions"

export default function BankKhataSifaris() {
  const [yojanaKoNaamData, setYojanaKoNaamData] = useState<any[]>([])
  const [karmachariKoNaamData, setKarmachariKoNaamData] = useState<any[]>([])
  const [patraSankhya, setpatraSankhya] = useState<string>("")
  const [sifarisMiti, setsifarisMiti] = useState<string>("")
  const [yojanakoNaam, setyojanakoNaam] = useState<string>("")
  const [ushakoNaam, setushakoNaam] = useState<string>("")
  const [adasyakoNaam, setadasyakoNaam] = useState<string>("")
  const [kosadasyaKoNaam, setkosadasyaKoNaam] = useState<string>("")
  const [sachibkoNaam, setsachibkoNaam] = useState<string>("")
  const [bankKoNaam, setbankKoNaam] = useState("")
  const [bankKoNaamData, setbankKoNaamData] = useState<any[]>([])
  const [bankKoSakha, setbankKoSakha] = useState<string>("")
  const [karmacharikoNaam, setkarmacharikoNaam] = useState<string>("")
  const [karmachariKoPaad, setkarmachariKoPaad] = useState<string>("")

  const [pid, setPid] = useState("")

  const { value } = useMyContext()

  useEffect(() => {
    const fetchYojanaKoNaam = async () => {
      try {
        const data = await getYojanaSamjhautaData(value || "")
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
        console.log(data)
        setPid(data[0].pid)

        setkosadasyaKoNaam(data[0].kosaAdakshya)
        setsachibkoNaam(data[0].sachib)
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
        console.log(data)
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
        बैक खाता खोल्ने सिफारिस
      </h1>
      <br />
      <div className="flex w-auto flex-col sm:gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Input
              type="text"
              label="पत्र संख्या"
              size="sm"
              className="w-1/2"
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
          {/* <Select label="योजनाको मिति" size="sm" fullWidth>
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select> */}
          <Select
            label="योजना / कार्यक्रमको नाम"
            size="sm"
            className="w-1/2"
            placeholder="Select an option" // Optional: if you want a placeholder
            selectedKeys={yojanakoNaam ? new Set([yojanakoNaam]) : new Set()}
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(", ")
              setyojanakoNaam(selectedValue)
            }}
          >
            {yojanaKoNaamData.map((item) => (
              <SelectItem
                key={item.yojanaKaryaKramKoNaam}
                value={item.yojanaKaryaKramKoNaam}
              >
                {item.yojanaKaryaKramKoNaam}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="text"
            label="उ.सको नाम"
            className="w-auto"
            size="sm"
            value={ushakoNaam}
            onChange={(e) => setushakoNaam(e.target.value)}
          />
          <Input
            type="text"
            label="अध्यक्षको नाम"
            size="sm"
            className="w-auto"
            value={adasyakoNaam}
            onChange={(e) => setadasyakoNaam(e.target.value)}
          />

          <Input
            type="text"
            label="कोषाध्यक्ष नाम"
            size="sm"
            className="w-auto"
            value={kosadasyaKoNaam}
            onChange={(e) => setkosadasyaKoNaam(e.target.value)}
          />
          <Input
            type="text"
            label="सचिवको नाम"
            size="sm"
            className="w-auto"
            value={sachibkoNaam}
            onChange={(e) => setsachibkoNaam(e.target.value)}
          />

          <div className="flex gap-2">
            {/* <Select label="बैकको नाम" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select> */}

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
          {/* <Select label="कर्मचारीको नाम" size="sm" className="w-1/2">
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select> */}

          <Select
            label="कर्मचारीको नाम"
            size="sm"
            className="sm:w-auto"
            placeholder="Select an option" // Optional: if you want a placeholder
            selectedKeys={
              karmacharikoNaam ? new Set([karmacharikoNaam]) : new Set()
            }
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(", ")
              setkarmacharikoNaam(selectedValue)
            }}
          >
            {karmachariKoNaamData.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </Select>

          <div className="relative flex items-center gap-2">
            <Select
              size="sm"
              label="कर्मचारी पद "
              placeholder="select"
              className="w-1/2"
              value={karmachariKoPaad}
              onChange={(e) => setkarmachariKoPaad(e.target.value)}
            >
              <SelectItem key="प्रमुख प्रशासकिय अधिकृत">
                प्रमुख प्रशासकिय अधिकृत
              </SelectItem>
              <SelectItem key=" निमित्त प्रमुख प्रशासकिय अधिकृत">
                निमित्त प्रमुख प्रशासकिय अधिकृत
              </SelectItem>
              <SelectItem key="प्रशासकीय  अधिकृत ">प्रशासकीय अधिकृत</SelectItem>
              <SelectItem key="अधिकृतस्तर आठौँ">अधिकृतस्तर आठौँ</SelectItem>
              <SelectItem key="अधिकृतस्तर सातौँ">अधिकृतस्तर सातौँ</SelectItem>
              <SelectItem key="लेखा अधिकृत">लेखा अधिकृत</SelectItem>
              <SelectItem key="अधिकृतस्तर छैठौँ">अधिकृतस्तर छैठौँ</SelectItem>
              <SelectItem key="कार्यक्रम अधिकृत">कार्यक्रम अधिकृत</SelectItem>
              <SelectItem key="योजना अधिकृत">योजना अधिकृत</SelectItem>
              <SelectItem key="शाखा अधिकृत">शाखा अधिकृत </SelectItem>
              <SelectItem key="इन्जिनियर">इन्जिनियर</SelectItem>
              <SelectItem key="सहायकस्तर पाचौँ">सहायकस्तर पाचौँ</SelectItem>
              <SelectItem key="सहायकस्तर चौथो">सहायकस्तर चौथो</SelectItem>
            </Select>

            <Button color="secondary" startContent={<FaRegSave />}>
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
