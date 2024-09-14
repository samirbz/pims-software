"use client"
import {
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import React, { useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"

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
      <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
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
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
