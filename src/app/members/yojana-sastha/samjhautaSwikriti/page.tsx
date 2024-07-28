"use client"
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState } from "react"

export default function SamjhautaSwikriti() {
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
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="form-title">
          योजना / कार्यक्रम प्रस्ताव स्वीकृत टिप्पणी
        </h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <Input type="text" label=" आ.व " size="sm" className="w-2/5" />
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
            <Select label="योजना / कार्यक्रमको नाम" size="sm" fullWidth>
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Input type="text" label="संस्था वा व्यक्तिको नाम" size="sm" />
            <Input
              type="text"
              label="संस्थाको व्यक्तिको नाम"
              size="sm"
              className="w-[66.66%]"
              value="12345"
            />
            <br />
            <div className="flex gap-2">
              <Input
                isDisabled
                type="text"
                label=" लागत अनुमान रकम "
                size="sm"
                value="12345"
              />
              <Input
                isDisabled
                type="text"
                label=" नगरपालिका रकम रु. "
                size="sm"
                value="12345"
              />
              <Input
                isDisabled
                type="text"
                label=" लागत श्रमदान "
                value="12345"
                size="sm"
              />
            </div>
            <div className="flex gap-2">
              <Input
                isDisabled
                type="text"
                label="कन्टेन्जेन्सी रकम"
                size="sm"
                value="12345"
                className="w-[33.33%]"
              />
              <Input
                isDisabled
                type="text"
                label=" खुद पाउने रकम "
                size="sm"
                value="12345"
                className="w-[33.33%]"
              />
            </div>
            <Input
              type="text"
              label="बजेट किताबको सि.न."
              size="sm"
              className="w-2/5"
            />
            <Input type="text" label="मुख्य समितिको नाम" size="sm" />
            <br />
            <Textarea label="अन्य टिप्पणी विवरण" className="w-full" />

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
