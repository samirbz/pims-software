"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react"
import React, { useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"

import { MdModeEditOutline } from "react-icons/md"
import "nepali-datepicker-reactjs/dist/index.css"
import { FaRegSave } from "react-icons/fa"

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

export default function DarRatePeshPatra() {
  const [date, setDate] = useState<string>("")

  return (
    <div className="flex flex-col justify-between bg-white ">
      <h1 className="form-title text-xl font-semibold sm:text-2xl">
        बोलपत्र/दरभाउ पत्र/कोटेशन दररेट माग
      </h1>
      <br />
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <label htmlFor="date">मिति</label>
            <NepaliDatePicker
              inputClassName="form-control w-full"
              className="w-full rounded-lg border p-1"
              value={date}
              onChange={(value: string) => setDate(value)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="w-full md:w-1/3">
            <Select label="कार्यको किसिम" size="sm" className="w-full">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full md:w-1/3">
            <Input
              type="text"
              label="दररेट पेश गर्ने दिन"
              size="sm"
              className="w-full"
            />
          </div>
        </div>
        <Select label="योजना/कार्यको नाम" className="w-full" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select label="पहिलो कम्पनी" className="w-full" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select label="दोश्रो कम्पनी" className="w-full" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select label="तेश्रो कम्पनी" className="w-full" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="TOR/Bill of Quantity/Quotation"
          className="w-full"
          size="sm"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select label="कर्मचारीको नाम" className="w-full" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select label="कर्मचारीको पद" className="w-full" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Button
          color="secondary"
          startContent={<FaRegSave />}
          className="w-10 self-end"
        >
          Save
        </Button>
      </form>

      <table className="mt-6 w-full border-collapse border">
        <thead className="sticky top-0 z-20 border-r-2 bg-purple-400">
          <tr>
            <th className="px-4 py-2">सि.न.</th>
            <th className="px-4 py-2">आयोजना/कार्यक्रमको नाम</th>
            <th className="px-4 py-2">पहिलो कम्पनी </th>
            <th className="px-4 py-2">दोश्रो कम्पनी</th>
            <th className="px-4 py-2">तेश्रो कम्पनी </th>
            <th className="px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="solid" size="sm" className="z-10 w-full">
                    <MdModeEditOutline />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
