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
    <div>
      <div className="flex flex-col items-center">
        <div className="w-auto px-4 ">
          <h1 className="form-title">बोलपत्र/दरभाउ पत्र/कोटेशन दररेट माग</h1>
          <br />
          <div className="flex w-auto max-w-[90rem] flex-col gap-12 overflow-auto lg:flex-row">
            <div className="flex w-[40rem] flex-col gap-2 sm:gap-2">
              <div className="flex justify-between gap-10">
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
                <Select label="कार्यको किसिम" size="sm">
                  {animals.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                  ))}
                </Select>
                <Input type="text" label="दररेट पेश गर्ने दिन" size="sm" />
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
                className="mb-1 w-12"
              >
                Save
              </Button>
            </div>
          </div>
          <div className="mb-2 flex max-h-[22rem] w-auto justify-center overflow-auto ">
            <table className=" border-collapse border ">
              <thead className="sticky top-0 z-20 border-r-2 bg-purple-400 ">
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
                        <Button variant="solid" size="sm" className="z-10 w-2 ">
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
        </div>
      </div>
    </div>
  )
}
