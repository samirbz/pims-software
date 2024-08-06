"use client"
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState } from "react"

export default function MyadThapPatra() {
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
    <div className="flex w-auto flex-col items-center overflow-auto">
      <div className="w-auto px-4 ">
        <h1 className="form-title">योजनाको म्याद थप टिप्पणी र चिठ्ठी</h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <Input type="text" label="आ.व." size="sm" className="w-1/4" />
              <Checkbox className="mr-8">यदी पुरानो आ.व. को योजना</Checkbox>
              <form className="flex items-center gap-2 ">
                <label htmlFor="date">मिति</label>
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
              className="w-1/2"
            />

            <form className="flex items-center gap-2 ">
              <label htmlFor="date">आयोजना सम्पन्न हुने मिति</label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1 "
                value={date}
                onChange={(value: string) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
            <div className="flex gap-8">
              <form className="flex items-center gap-2  ">
                <label htmlFor="date">म्याद थप हुने अन्तिम मिति</label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1 "
                  value={date}
                  onChange={(value: string) => setDate(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
              <form className="flex items-center gap-2 ">
                <label htmlFor="date">निवेदन प्राप्त भएको मिति</label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1 "
                  value={date}
                  onChange={(value: string) => setDate(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
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
    </div>
  )
}
