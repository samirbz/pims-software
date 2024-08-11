"use client"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState } from "react"

export default function Karyadesh() {
  const [date, setDate] = useState<string>("")

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

  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="form-title">योजना/कार्यक्रमको कार्यादेश पत्र</h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <Input
                type="text"
                label="पत्र संख्या"
                size="sm"
                className="w-2/5"
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
            <Select label="योजना/कार्यक्रमको नाम" size="sm" fullWidth>
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Input type="text" label="उ.स./ सस्थाको नाम" size="sm" />
            <Input
              type="text"
              label="अध्यक्ष/कर्मचारीको नाम"
              size="sm"
              className="w-[66.66%]"
            />
            <div className="flex gap-2">
              <Input
                type="text"
                label="लागत अनुमान रकम"
                size="sm"
                className="w-2/5"
              />
              <Input
                type="text"
                label="नगरपालिका रकम रु"
                size="sm"
                className="w-2/5"
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="कन्टेन्जेन्सी रकम"
                size="sm"
                className="w-2/5"
              />
              <Input
                type="text"
                label="खुद पाउने रकम"
                size="sm"
                className="w-2/5"
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="बजेट किताबको सि.न."
                size="sm"
                className="w-2/5"
              />
              <Input
                type="text"
                label="उ.स. गठन मिति"
                size="sm"
                className="w-2/5"
              />
            </div>
            <Input
              type="text"
              label="मुख्य समितिको नाम"
              size="sm"
              className=""
            />
            <div className="flex gap-2">
              <Input
                type="text"
                label="सभा निर्णय मिति"
                size="sm"
                className="w-2/5"
              />
              <Input
                type="text"
                label="आयोजना सम्पन्न मिति"
                size="sm"
                className="w-2/5"
              />
            </div>
            <Select label="कर्मचारीको नाम" size="sm" fullWidth>
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Select label="कर्मचारीको पद" size="sm" fullWidth>
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>

            <Button
              color="secondary"
              className="w-10 self-center"
              startContent={<FaRegSave />}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}