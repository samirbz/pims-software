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

export default function UpvoktaDarta() {
  const [date, setDate] = useState<string>("")

  return (
    <div className="flex flex-col justify-between bg-white">
      <h1 className="form-title text-xl font-semibold sm:text-2xl text-center">
        उपभोक्ता समिति दर्ता प्रमाण पत्र
      </h1>
      <br />
      <div className="flex flex-col gap-2 overflow-auto lg:flex-row">
        <div className="flex w-full flex-col gap-2 sm:gap-2">
          <div className="flex  gap-10">
            <Input type="text" label="दर्ता न." size="sm" className="w-36" />
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
          <Select label="योजनाको नाम" className="w-full" size="sm">
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Input type="text" label="उ.सको नाम" size="sm" className="" />
          <div className="flex gap-2">
            <Input type="text" label="अध्यक्षको नाम" size="sm" className="" />
            <Input type="text" label="मोवाइल न." size="sm" className="" />
          </div>
          <div className="flex gap-2">
            <Input type="text" label="अध्यक्षको नाम" size="sm" className="" />
            <Input type="text" label="मोवाइल न." size="sm" className="" />
          </div>
          <div className="flex gap-2">
            <Input type="text" label="अध्यक्षको नाम" size="sm" className="" />
            <Input type="text" label="मोवाइल न." size="sm" className="" />
          </div>
          <div className="flex gap-2">
            <Select
              label="स्वीकृत दिने कर्मचारीको नाम"
              className="w-full"
              size="sm"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Select label="कर्मचारी पद" className="w-full" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <br />
      <div className="mb-2 max-h-[22rem] w-auto overflow-auto sm:mb-0">
        <table className="border-collapse border ">
          <thead className="sticky top-0 z-20 border-r-2 bg-purple-400 ">
            <tr>
              <th className="px-4 py-2">सि.न.</th>
              <th className="px-4 py-2">दर्ता न.</th>
              <th className="px-4 py-2">योजनाको नाम</th>
              <th className="px-4 py-2">उ.स.को नाम</th>
              <th className="px-4 py-2">अध्यक्षको नाम</th>
              <th className="px-4 py-2">फोन न.</th>
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
  )
}
