"use client"
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react"
import React, { useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"

export default function SansthagatAnudan() {
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
        संस्थागत (विधालय तथा अन्य संस्थागत) अनुदान किस्ता टिप्पणी र आदेश
      </h1>
      <br />
      <div className="flex gap-4">
        <section className="flex w-3/5 flex-col gap-2">
          <div className="flex gap-2">
            <Input
              isDisabled
              type="text"
              label="आ.व."
              value="2080/81"
              size="sm"
              className="w-auto"
            />
            <Input type="text" label="कार्यक्रमको नाम" size="sm" className="" />
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
              label="योजनाको नाम"
              size="sm"
              className="w-auto"
            />

            <Input type="text" label="प्रतिनिधी/ कर्मचारीको नाम" size="sm" />

            <div className="flex gap-2">
              <Input type="text" label="खुद पाउने रकम" size="sm" />
              <Input type="text" label="काम गर्ने समुह" size="sm" />
            </div>
            <Input type="text" label="संस्था/ कार्यालयको नाम" size="sm" />
            <Select label="कर्मचारी पद" size="sm" className="w-1/2">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>

            <div className="flex gap-2">
              <Select label="बैंकको नाम / खाता न." size="sm" fullWidth>
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
              <Input type="text" label=" " size="sm" />
            </div>
            <div className="flex gap-2">
              <div className="flex w-full flex-col gap-2">
                <Input type="text" label="वितिय समानिकरण" size="sm" />
                <Input type="text" label="योजनाको नाम" size="sm" />
              </div>
              <Textarea
                label="टिप्पणीको अन्य थप विवरण भएमा रानुहोस ।"
                variant="bordered"
                size="sm"
              />
            </div>
          </div>
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
        </section>
        <div className="flex w-2/5 flex-col gap-1">
          <section className="flex flex-col gap-2 bg-blue-400 px-4 pb-2 pt-3">
            <p>लागत विवरण</p>
            <div className="flex gap-2">
              <Input type="text" label="कुल ल.ई रकम" size="sm" />
              <Input type="text" label="विनियोजित रकम रु." size="sm" />
            </div>
            <div className="flex gap-2">
              <Input type="text" label="भुक्तानी रकम रु." size="sm" />
              <Input type="text" label="लागत सहभागिता रकम रु." size="sm" />
            </div>

            <div className="flex gap-2">
              <Input type="text" label="कन्टेन्जेन्सी रकम रु." size="sm" />
              <Input type="text" label="मर्मत रकम रु." size="sm" />
            </div>
            <Input type="text" label="धरौटी रकम" size="sm" className="w-1/2" />
          </section>
          <section className="flex flex-col gap-2 bg-orange-400 px-4 py-2">
            <p>लागत श्रोतको विवरण</p>
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">लागत सभागिता रकम</label>
              <Input type="text" label=" वितिय समानिकरण" size="sm" />
              <Input type="text" label="लागत सभागिता रकम" size="sm" />
            </div>
          </section>
          <section className="flex flex-col gap-2 bg-pink-400 px-4 pb-3 pt-2">
            <p>कट्टी रकमहरु </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="w-full whitespace-nowrap">
                  अग्रिम आय कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-full whitespace-nowrap">
                  सामाजिक सुरक्षा कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-full whitespace-nowrap">
                  वहाल कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-full whitespace-nowrap">
                  पारिश्रमिक कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-full whitespace-nowrap">
                  आकस्मिक कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-full whitespace-nowrap">
                  मुल्य अभिवृद्धी कर (३०%) रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
            </div>
          </section>
          <div className="flex justify-between">
            <Checkbox className="whitespace-nowrap">टिप्पणीको विवरण</Checkbox>
            <Button color="secondary">Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
