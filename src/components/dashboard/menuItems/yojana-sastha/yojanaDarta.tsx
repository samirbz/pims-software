"use client"
import {
  Button,
  Checkbox,
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

import { FaMinus, FaPlus, FaRegSave } from "react-icons/fa"
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

export default function YojanaDarta() {
  const [date, setDate] = useState<string>("")
  const [divs, setDivs] = useState<React.JSX.Element[]>([])

  const addDiv = () => {
    setDivs([
      ...divs,
      <div className="flex w-full items-center gap-2" key={divs.length}>
        <p className="text-sm">लागत&nbsp;श्रोत</p>
        <Select label="" className="w-1/4" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select label="" className="w-1/2" size="sm">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Input type="text" className="w-1/4" size="sm" />
      </div>,
    ])
  }

  const removeDiv = () => {
    setDivs((prevDivs) => {
      const newDivs = [...prevDivs]
      newDivs.pop()
      return newDivs
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-4">
        <h1 className="form-title">
          योजना दर्ता उपभोक्त समिती/संस्थागत/व्यक्तिगत र संस्थागत अनुदान
        </h1>
        <br />
        <div className="flex flex-row justify-center gap-2 overflow-auto ">
          <div className="flex w-[40rem] flex-col gap-2 sm:gap-2">
            <div className="flex justify-between gap-10">
              <form className="flex items-center gap-2 ">
                <label htmlFor="date">सभा निर्णय मिति</label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1 "
                  value={date}
                  onChange={(value: string) => setDate(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
              <Select label="योजनाको वडा" className="w-1/5" size="sm">
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
            </div>
            <Select label="योजनाको नाम" className="w-full" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Select label="मूख्य समिति" className="w-full" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>

            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-2">
                <p className="text-sm">लागत&nbsp;श्रोत</p>
                <Select label="" className="w-1/4" size="sm">
                  {animals.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                  ))}
                </Select>
                <Select label="" className="w-1/2" size="sm">
                  {animals.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                  ))}
                </Select>
                <Input type="text" className="w-1/4" size="sm" />
              </div>
              {divs.map((div, index) => (
                <div key={index}>{div}</div>
              ))}
              <div className="flex justify-end gap-2">
                <FaPlus
                  className="cursor-pointer self-end text-blue-600"
                  onClick={addDiv}
                />
                <FaMinus
                  className="cursor-pointer self-end text-red-600"
                  onClick={removeDiv}
                />
              </div>
            </div>

            <Select label="आयोजना उपक्षेत्र" className="w-full" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <div className="flex w-full justify-between gap-2">
              <Select label="योजनाको किसिम" className="w-1/2" size="sm">
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
              <Select label="वडा न." className="w-1/5" size="sm">
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
            </div>
            <Select label="कार्यागत समुह" className="w-1/2" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <div className="flex w-full justify-between">
              <Input
                type="text"
                label="प्राविधिक इस्टिमेट रकम रु."
                size="sm"
                className="w-1/2"
              />
              <Select label="बजेट Type" size="sm" className="w-[30%]">
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex w-full justify-between">
              <Input
                type="text"
                label="विनियोजित रकम रु."
                size="sm"
                className="w-1/2"
              />
              <Select label="योजना स्वीकृत" size="sm" className="w-[30%] ">
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
            </div>
            <Input
              type="text"
              label="बजेट किताब सि.न."
              color="primary"
              size="sm"
              className="w-36"
            />
          </div>

          <div className="flex w-72 flex-col gap-2">
            <div className="flex gap-1">
              <Input
                type="text"
                labelPlacement="outside-left"
                label="कन्टेन्जेन्सी&nbsp;%"
                size="sm"
                className="w-72"
              />
              <Input type="text" size="sm" />
            </div>
            <div className="flex gap-1">
              <Input
                type="text"
                labelPlacement="outside-left"
                label="मर्मत&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-72"
              />
              <Input type="text" size="sm" />
            </div>
            <div className="flex gap-1">
              <Input
                type="text"
                labelPlacement="outside-left"
                label="धरौटी&nbsp;रकम&nbsp;%"
                size="sm"
                className="w-72"
              />
              <Input type="text" size="sm" />
            </div>
            <Input type="text" label="धरौटी रकम %" size="sm" />
            <Input type="text" label="कुल अनुदान रु." size="sm" />
            <Input type="text" label="जनश्रमदान रु." size="sm" />
            <Input type="text" label="ठेगाना" size="sm" />
            <Input type="text" label="घर परिवार संख्या" size="sm" />
            <Input type="text" label="जनसंख्या" size="sm" />
            <Input type="text" label="कार्य विवरण" size="sm" />
            <div className="flex gap-1">
              <Input
                type="text"
                labelPlacement="outside-left"
                label="उपलब्धि&nbsp;लक्ष्य"
                size="sm"
                className="w-72"
              />
              <Input type="text" size="sm" />
            </div>
            <div className="flex gap-4">
              <Checkbox>वार्षिक&nbsp;योजना</Checkbox>
              <Checkbox>क्रमागत&nbsp;योजना</Checkbox>
            </div>
            <Button
              color="secondary"
              startContent={<FaRegSave />}
              className="mb-1 w-12"
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mb-2 flex max-h-[22rem] w-auto justify-center overflow-auto">
          <table className="w-full border-collapse border">
            <thead className="sticky top-0 z-20 border-r-2 bg-purple-400 ">
              <tr>
                <th className="px-4 py-2">सि.न.</th>
                <th className="px-4 py-2">आयोजना नाम</th>
                <th className="px-4 py-2">आयोजनको प्रकार </th>
                <th className="px-4 py-2">वडा न.</th>
                <th className="px-4 py-2">ल.ई रकम </th>
                <th className="px-4 py-2">अनुदान रकम </th>
                <th className="px-4 py-2">सहभागिता </th>
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
  )
}
