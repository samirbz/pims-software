"use client"
import React, { useState } from "react"
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { FaPrint, FaRegSave } from "react-icons/fa"
import { GrDocumentPdf } from "react-icons/gr"
import { AiOutlineFileAdd } from "react-icons/ai"

export default function YojanaSamjhauta() {
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
  const [date, setDate] = useState<string>("")
  return (
    <div className="mt-8 flex w-full justify-center ">
      <div className="flex w-1/2 flex-col">
        <div>
          <h1 className="form-title">
            योजना / कार्यक्रम प्रस्ताव स्वीकृत टिप्पणी
          </h1>
          <br />
          <div className="flex items-center justify-between">
            <Input
              type="text"
              label="वजेट कार्यक्रम "
              size="sm"
              className="w-1/2"
            />
            <p className="text-blue-600">
              चालु आ.वः- २०८०/८१चालु आ.वः- २०८०/८१
            </p>
          </div>
        </div>
        <br />

        <Tabs aria-label="Options" radius="sm" className="flex justify-center">
          <Tab key="1" title="सम्झौता गर्ने पक्ष / योजना">
            <Card>
              <CardBody>
                <div>
                  <div className="flex gap-8">
                    <div className=" w-2/5">
                      <p>उपभोक्ता समिति / संघ सस्था / व्यक्तिको विवरण</p>
                      <br />
                      <form className="flex items-center gap-2 ">
                        <label htmlFor="date">सम्झौता मितिः-</label>
                        <NepaliDatePicker
                          inputClassName="form-control"
                          className="rounded-lg border p-1 "
                          value={date}
                          onChange={(value: string) => setDate(value)}
                          options={{ calenderLocale: "ne", valueLocale: "en" }}
                        />
                      </form>
                      <br />
                      <div className="flex flex-col gap-2">
                        <p>सम्झौता गर्ने संस्थाको व्यक्तिको विवरण</p>
                        <Input type="text" label="१. नाम" size="sm" />
                        <Input type="text" label="२.पद" size="sm" />
                        <Input type="text" label="ठेगाना" size="sm" />
                        <Input type="text" label="४. फोन न." size="sm" />
                      </div>
                      <br />
                      <p className=" text-purple-600">
                        उपभोक्ता समितिको पदमा:- अध्यक्ष/सचिव/ कोषाध्यक्ष
                        <br /> सघ/संस्थाको भएमा पदमा:- पद दिनुहोस । <br />
                        व्यक्तिगत भएमा पदमा :- पद दिनुहोस ।
                      </p>
                    </div>

                    <div className="flex w-3/5 flex-col gap-2">
                      <p>योजनाको विवरण</p>
                      <Select label="नाम" size="sm" fullWidth>
                        {animals.map((animal) => (
                          <SelectItem key={animal.key}>
                            {animal.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <div className="flex w-full gap-8">
                        <Input
                          type="text"
                          label="ठेगाना"
                          size="sm"
                          className="w-[70%]"
                        />
                        <Input
                          type="text"
                          label="वोडा "
                          size="sm"
                          className="w-[30%]"
                        />
                      </div>
                      <Input type="text" label="योजनाको उद्देश्य" size="sm" />
                      <Select
                        label="योजना स्वीकृत गर्ने निकाय"
                        size="sm"
                        fullWidth
                      >
                        {animals.map((animal) => (
                          <SelectItem key={animal.key}>
                            {animal.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <form className="flex items-center gap-4 ">
                        <label htmlFor="date">योजना सुरू हुने मितिः-</label>
                        <NepaliDatePicker
                          inputClassName="form-control"
                          className="rounded-lg border p-1 "
                          value={date}
                          onChange={(value: string) => setDate(value)}
                          options={{
                            calenderLocale: "ne",
                            valueLocale: "en",
                          }}
                        />
                      </form>
                      <form className="flex items-center gap-2 ">
                        <label htmlFor="date">योजना सम्पन्न हुने मितिः-</label>
                        <NepaliDatePicker
                          inputClassName="form-control"
                          className="rounded-lg border p-1 "
                          value={date}
                          onChange={(value: string) => setDate(value)}
                          options={{
                            calenderLocale: "ne",
                            valueLocale: "en",
                          }}
                        />
                      </form>
                      <p>आयोजनाको लागत अनुमानबाट प्राविधिक विवरण</p>
                      <div className="flex gap-2">
                        <Select label="योजना कार्य" size="sm" fullWidth>
                          {animals.map((animal) => (
                            <SelectItem key={animal.key}>
                              {animal.label}
                            </SelectItem>
                          ))}
                        </Select>
                        <Select label="किसिम / प्रकार" size="sm" fullWidth>
                          {animals.map((animal) => (
                            <SelectItem key={animal.key}>
                              {animal.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Input type="text" label="लम्बाइ मि." size="sm" />
                        <Input type="text" label="क्षेत्रफल" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="2" title="लागत श्रोतको विवरण">
            <Card>
              <CardBody>
                <p>लागत बिवरण </p>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="3" title="उ.स/ संघ सस्थाको विवरण">
            <Card>
              <CardBody>
                <p>3</p>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="4" title="किस्ता तथा मर्मत विवरण">
            <Card>
              <CardBody>
                <p>4</p>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="5" title="प्राविधिक तथा अन्य विवरण">
            <Card>
              <CardBody>
                <p>5</p>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
        <div className="flex justify-between gap-1">
          <Button color="primary" startContent={<FaPrint />}>
            Sign Board
          </Button>
          <div className="flex gap-2">
            <Button startContent={<GrDocumentPdf />} color="default">
              Add PDF Files
            </Button>
            <Button startContent={<AiOutlineFileAdd />} color="default">
              Add Images/Photo
            </Button>
            <Button startContent={<FaRegSave />} color="secondary">
              Save/Update
            </Button>
            <Button startContent={<FaPrint />} color="primary">
              Print Doc
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
