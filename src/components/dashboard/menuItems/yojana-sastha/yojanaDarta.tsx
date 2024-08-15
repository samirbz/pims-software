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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react"
import React, { useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"

import { FaMinus, FaPlus, FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import "nepali-datepicker-reactjs/dist/index.css"
import { RiArrowDownDoubleFill } from "react-icons/ri"

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
    <div className="flex flex-col items-center overflow-auto ">
      <h1 className="text-2xl font-bold text-orange-600">
        योजना दर्ता उपभोक्त समिती/संस्थागत/व्यक्तिगत र संस्थागत अनुदान
      </h1>
      <br />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className="overflow-auto">
                  <table className="min-w-full border-collapse border">
                    <thead className="sticky top-0 bg-purple-400 text-white">
                      <tr>
                        <th className="px-2 py-1">सि.न.</th>
                        <th className="px-2 py-1">आयोजना नाम</th>
                        <th className="px-2 py-1">आयोजनको प्रकार</th>
                        <th className="px-2 py-1">वडा न.</th>
                        <th className="px-2 py-1">ल.ई रकम</th>
                        <th className="px-2 py-1">अनुदान रकम</th>
                        <th className="px-2 py-1">सहभागिता</th>
                        <th className="px-2 py-1">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1">
                          <Dropdown>
                            <DropdownTrigger>
                              <Button variant="solid" size="sm">
                                <MdModeEditOutline />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                              <DropdownItem>Edit</DropdownItem>
                              <DropdownItem key="delete" color="danger">
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-4 sm:w-2/3">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <form className="flex items-center gap-2 pl-2 sm:p-0">
              <label htmlFor="date" className="block text-sm">
                सभा निर्णय मिति
              </label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1"
                value={date}
                onChange={(value: string) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
            <Select label="योजनाको वडा" className="w-full sm:w-1/5" size="sm">
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
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select label="योजनाको किसिम" className="w-full sm:w-1/2" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Select label="वडा न." className="w-full sm:w-1/5" size="sm">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
          <Select label="कार्यागत समुह" className="w-full" size="sm">
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label="प्राविधिक इस्टिमेट रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
            />
            <Select label="बजेट Type" size="sm" className="w-full sm:w-1/2">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="text"
              label="विनियोजित रकम रु."
              size="sm"
              className="w-full sm:w-1/2"
            />
            <Select label="योजना स्वीकृत" size="sm" className="w-full sm:w-1/2">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>

          <Input
            type="text"
            label="बजेट किताब सि.न."
            size="sm"
            className="w-full sm:w-1/3"
          />
          <Button onPress={onOpen} className=" w-full sm:w-1/4">
            Open table <RiArrowDownDoubleFill />
          </Button>
        </div>

        <div className="flex w-full flex-col gap-4 sm:w-1/3">
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="कन्टेन्जेन्सी&nbsp;%"
              size="sm"
              className="w-full"
            />
            <Input
              type="text"
              label="मर्मत&nbsp;रकम&nbsp;%"
              size="sm"
              className="w-full"
            />
            <Input
              type="text"
              label="धरौटी&nbsp;रकम&nbsp;%"
              size="sm"
              className="w-full"
            />
            <Input
              type="text"
              label="कुल अनुदान रु."
              size="sm"
              className="w-full"
            />
            <Input
              type="text"
              label="जनश्रमदान रु."
              size="sm"
              className="w-full"
            />
            <Input type="text" label="ठेगाना" size="sm" className="w-full" />
            <Input
              type="text"
              label="घर परिवार संख्या"
              size="sm"
              className="w-full"
            />
            <Input type="text" label="जनसंख्या" size="sm" className="w-full" />
            <Input
              type="text"
              label="कार्य विवरण"
              size="sm"
              className="w-full"
            />
            <Input
              type="text"
              label="उपलब्धि&nbsp;लक्ष्य"
              size="sm"
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <Checkbox>वार्षिक&nbsp;योजना</Checkbox>
            <Checkbox>क्रमागत&nbsp;योजना</Checkbox>
          </div>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            className="w-full"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
