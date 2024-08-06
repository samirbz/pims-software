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
  Textarea,
} from "@nextui-org/react"
import React, { useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { MdModeEditOutline } from "react-icons/md"

export default function PeskiVuktani() {
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
    <div className="flex w-full justify-center ">
      <div className="flex w-auto flex-col">
        <div className="overflow-auto">
          <h1 className="form-title">पहिलो किस्ता पेश्की निकासा</h1>
          <br />
          <div className="flex gap-8">
            <section className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  isDisabled
                  type="text"
                  label="आ.व."
                  value="2080/81"
                  size="sm"
                  className="w-auto"
                />
                <Input
                  type="text"
                  label="कार्यक्रमको नाम"
                  size="sm"
                  className=""
                />
                <form className="flex items-center gap-2">
                  <label htmlFor="date">टिप्पणी&nbsp;मिति</label>
                  <NepaliDatePicker
                    inputClassName="form-control"
                    className="rounded-lg border p-1 "
                    value={date}
                    onChange={(value: string) => setDate(value)}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </form>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="योजना नाम"
                  size="sm"
                  className="w-auto"
                />
                <Input
                  type="text"
                  label="उ.सको प्रतिनीधी/ कर्मचारी"
                  size="sm"
                  className="w-auto"
                />
                <div className="flex gap-2">
                  <Input type="text" label="खुद पाउने रकम" size="sm" />
                  <Input type="text" label="काम गर्ने समुह" size="sm" />
                </div>
                <Input
                  type="text"
                  label="उपभोक्ता समिति/कार्यालयको नाम"
                  size="sm"
                />
                <div className="flex gap-2">
                  <Select label="पेश्की किस्ता" size="sm" fullWidth>
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                  <Select label="कर्मचारीको पद" size="sm" fullWidth>
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Select label="बैंकको नाम / खाता न." size="sm" fullWidth>
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                  <Input type="text" label=" " size="sm" />
                </div>
                <div className="flex justify-between gap-2">
                  <Input
                    type="text"
                    label="समानिकरण अनुदान"
                    size="sm"
                    className="w-60"
                  />
                  <Checkbox>यदी&nbsp;पुरानो&nbsp;आ.व.को&nbsp;योजना</Checkbox>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  isDisabled
                  type="text"
                  label="पेश्की किस्ता रकम रु."
                  size="sm"
                  className="w-44"
                />
                <Textarea
                  label="अन्य टिप्पणीको थप विवरण व्यहोरा"
                  className="max-w-xs"
                />
                <div className="flex gap-2">
                  <Input
                    isDisabled
                    type="text"
                    label="योजनाको नाम खोज्नुहोस"
                    size="sm"
                    className=""
                  />
                  <Button color="secondary">Save</Button>
                </div>
              </div>
            </section>
            <section className="flex h-[27rem] flex-col gap-4 bg-blue-400 p-4">
              <p>लागत विवरण</p>
              <div className="flex gap-4">
                <Input
                  type="text"
                  label="कुल ल.ई रकम"
                  size="sm"
                  className="w-auto"
                />
                <Input
                  type="text"
                  label="विनियोजित रकम रु."
                  size="sm"
                  className="w-auto"
                />
              </div>
              <div className="flex gap-4">
                <Input
                  type="text"
                  label="खुद पाउने रकम रु."
                  size="sm"
                  className="w-auto"
                />
                <Input
                  type="text"
                  label="लागत सहभागिता रकम"
                  size="sm"
                  className="w-auto"
                />
              </div>
              <div className="flex gap-4">
                <Input
                  type="text"
                  label="कन्टेन्जेन्सी रकम"
                  size="sm"
                  className="w-auto"
                />
                <Input
                  type="text"
                  label="मर्मत सम्भार रकम"
                  size="sm"
                  className="w-auto"
                />
              </div>
              <div className="flex gap-4">
                <Input
                  type="text"
                  label="धरौटी रकम रु."
                  size="sm"
                  className="w-auto"
                />
                <Input
                  type="text"
                  label="पेश्की रकम रु."
                  size="sm"
                  className="w-auto"
                />
              </div>
              <p>लागत श्रोत विवरण</p>
              <div className="flex gap-4">
                <Input
                  type="text"
                  label="धरौटी रकम रु."
                  size="sm"
                  className="w-auto"
                />
                <Input
                  type="text"
                  label="पेश्की रकम रु."
                  size="sm"
                  className="w-auto"
                />
              </div>
            </section>
          </div>
          <div className="mb-2 flex max-h-[22rem] w-auto justify-center overflow-auto">
            <table className="min-w-[30rem] border-collapse border ">
              <thead className="sticky top-0  z-20 border-r-2 bg-purple-400">
                <tr>
                  <th className=" px-4 py-2">सि.न.</th>
                  <th className=" px-4 py-2">योजना / कार्यक्रम नाम</th>
                  <th className=" px-4 py-2">उ.स/सस्थाको नाम</th>
                  <th className=" px-4 py-2">लई रकम रु.</th>
                  <th className=" px-4 py-2">किस्ता रकम रु</th>
                  <th className=" px-4 py-2"> किस्ता किसिम</th>
                  <th className=" px-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-auto text-center">
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button className="z-10" variant="shadow" size="sm">
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
