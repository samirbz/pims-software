"use client"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState } from "react"

export default function LayiSwikritiPatra() {
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
    <div className="flex flex-col justify-between bg-white">
      <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
        लागत अनुमान स्वीकृत टिप्पणी
      </h1>
      <br />
      <div className="flex w-auto flex-col sm:gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
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
          <Input type="text" label="वडा न." size="sm" className="w-1/2" />
          <div className="flex gap-2">
            <Select label="अनुदान किसिम" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>

            <Select label="लागतश्रोत  " size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Input type="text" label="रकम " size="sm" />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="विनियोजित वजेट रकम रु."
              size="sm"
              className="w-1/2"
            />
            <Input
              type="text"
              label="बजेट क्र.स./ सि.न."
              size="sm"
              className="w-1/2"
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="लई रकम रु. (भ्याट बाहेक)"
              size="sm"
              className="w-1/2"
            />
            <Input
              type="text"
              label="भ्याट रकम रु."
              size="sm"
              className="w-1/2"
            />
          </div>
          <Input
            type="text"
            label="भ्याट नलाग्ने रकम रु."
            size="sm"
            className="w-1/2"
          />
          <div className="flex gap-2">
            <div className="flex w-full gap-2">
              <Input type="text" label="कन्टेन्जेन्सी रु." size="sm" />
              <Input type="text" label="&nbsp;" size="sm" />
            </div>
            <Input type="text" label="जम्मा रु." size="sm" />
          </div>

          <div className="flex justify-between">
            <div className="flex justify-end gap-2">
              <Button color="secondary" startContent={<FaRegSave />}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
