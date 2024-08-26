"use client"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState } from "react"

export default function BankKhataSifaris() {
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
    <div className="flex flex-col justify-between bg-white ">
      <h1 className="form-title text-xl font-semibold sm:text-2xl">
        बैक खाता खोल्ने सिफारिस
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
            />
            <form className="flex items-center gap-2 ">
              <label htmlFor="date">सिफारिस&nbsp;मिति</label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1 "
                value={date}
                onChange={(value: string) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
          </div>
          <Select label="योजनाको मिति" size="sm" fullWidth>
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Input type="text" label="उसको नाम" size="sm" />
          <Input
            type="text"
            label="अध्यक्षको नाम"
            size="sm"
            className="w-1/2"
          />

          <Input
            type="text"
            label="कोषाध्यक्ष नाम"
            size="sm"
            className="w-1/2"
          />
          <Input type="text" label="सचिवको नाम" size="sm" className="w-1/2" />

          <div className="flex gap-2">
            <Select label="बैकको नाम" size="sm" className="w-3/5">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Input type="text" label=" " size="sm" className="w-2/5" />
          </div>
          <Select label="कर्मचारीको नाम" size="sm" className="w-1/2">
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Select label="कर्मचारीको पद" size="sm" className="w-1/2">
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
  )
}
