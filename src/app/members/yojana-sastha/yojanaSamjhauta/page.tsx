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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { FaPrint, FaRegSave } from "react-icons/fa"
import { GrDocumentPdf } from "react-icons/gr"
import { AiOutlineFileAdd } from "react-icons/ai"
import { Content } from "./Content"

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
      <div className="flex w-full flex-col  sm:w-3/5">
        <div className="overflow-auto">
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
          <Tabs
            aria-label="Options"
            radius="sm"
            className="flex justify-center"
          >
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
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
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
                          <label htmlFor="date">
                            योजना सम्पन्न हुने मितिः-
                          </label>
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
                  <div>
                    <div className="flex gap-8">
                      <div className=" w-2/5">
                        <p>लागत विवरण</p>
                        <br />
                        <div className="flex flex-col gap-2">
                          <Input
                            type="text"
                            label="लागत अनुमान रु."
                            size="sm"
                          />
                          <p className="text-blue-600 underline">
                            लागत व्यहोर्ने निकायहरु
                          </p>
                          <Input
                            type="text"
                            label="समानिकरण अनुदान"
                            size="sm"
                          />
                          <Input type="text" label="जनश्रमदान रु." size="sm" />
                        </div>
                        <br />
                        <Input
                          isDisabled
                          type="text"
                          label="जम्मा रकम रु."
                          labelPlacement="outside-left"
                          size="lg"
                          className="font-bold"
                        />
                      </div>

                      <div className="flex w-3/5 flex-col gap-2">
                        <p className="text-blue-600">
                          निर्माण सामाग्रीको विवरणः-
                        </p>
                        <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn className="w-56">
                              सामाग्री उपलब्ध गराउने निकाय
                            </TableColumn>
                            <TableColumn className="w-28">परिमाण</TableColumn>
                            <TableColumn className="w-40">
                              सामाग्रीको नाम
                            </TableColumn>
                            <TableColumn className="w-24">एकाई</TableColumn>
                            <TableColumn className="w-28">श्रम रु.</TableColumn>
                          </TableHeader>
                          <TableBody>
                            <TableRow key="1">
                              <TableCell>१.नेपाल सरकारबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="2">
                              <TableCell>२.नगरपालिकाबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="3">
                              <TableCell>३.गाउँपालिकाबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>
                                ४.गैर सरकारी संघ संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>
                                ५.समुदायमा आधारित संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>
                                ६.विदेशी दातृ संघ,संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>७.लागत सहभागिताबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>८.अन्य निकायबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <div className="flex gap-2 overflow-auto">
                          <Input
                            label="घर परिवार संख्या"
                            size="sm"
                            className="w-40"
                          ></Input>
                          <Input
                            label=" जनसंख्या"
                            size="sm"
                            className="w-40"
                          ></Input>
                          <Input
                            label="समुदाय"
                            size="sm"
                            className="w-40"
                          ></Input>
                          <Input
                            label=" समुदायमा आधारित / गैर सरकारी संस्था"
                            size="sm"
                            className="w-64"
                          ></Input>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="3" title="उ.स/ संघ सस्थाको विवरण">
              <Card>
                <CardBody>
                  <div>
                    <p className="underline">
                      क.उपभोक्ता समिति/संघ सस्था / समुदायमा आधारित संघ सस्थाको
                      विवरण
                    </p>
                    <div className="mt-2 flex flex-col gap-2">
                      <Select
                        label="काम गर्ने निकाय"
                        placeholder="संस्थागत"
                        className="max-w-xs"
                        size="sm"
                      >
                        {animals.map((animal) => (
                          <SelectItem key={animal.key}>
                            {animal.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        type="text"
                        label="कार्यालय तथा संस्थाको नाम"
                        size="sm"
                        className="w-3/5"
                      />
                      <div className="flex w-3/5 gap-8">
                        <Input type="text" label="संस्थाको ठेगाना" size="sm" />
                        <Input type="text" label="पान नं." size="sm" />
                      </div>
                      <p className="underline">
                        कार्यालय तथा संस्थाको प्रतिनिधीको विवरण
                      </p>
                      <div className="flex w-1/2 gap-2">
                        <Input type="text" label="व्यक्तिको नाम" size="sm" />
                        <Input type="text" label="ना.प्र.न." size="sm" />
                      </div>
                      <Input
                        type="text"
                        label="रोहवरको नाम"
                        size="sm"
                        className="w-1/4"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="4" title="किस्ता तथा मर्मत विवरण">
              <Card>
                <CardBody>
                  <Table aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn className="w-36">किस्ता क्रम</TableColumn>
                      <TableColumn className="w-32">मिति</TableColumn>
                      <TableColumn className="w-32">प्रतिशत %</TableColumn>
                      <TableColumn className="w-36">किस्ताको रकम</TableColumn>
                      <TableColumn className="w-44">
                        निर्माण सामाग्री परिमाण
                      </TableColumn>
                      <TableColumn className="">कैफियत</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>पहिलो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
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
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>दोश्रो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
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
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>तेश्रो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
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
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <br />
                  <Input
                    type="text"
                    label="जम्मा रकम रु."
                    labelPlacement="outside-left"
                    size="lg"
                    className="ml-96 font-bold"
                  />
                  <br />
                  <div>
                    <div className="">
                      <div className="">
                        <p className="text-blue-600">
                          आयोजना मर्मत सम्भार व्यहोर्ने व्यवस्था (मासिक,
                          चौमासिक, वार्षिक श्रोत)
                        </p>
                        <br />
                        <div className="flex flex-col gap-2">
                          <Input
                            type="text"
                            label="क.मर्मत सम्भारको जिम्मा लिने समिति / संस्थाको नाम"
                            size="sm"
                            className="w-[90%]"
                          />
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              label="ख. जनश्रमदान (श्रमशक्ति संख्या)"
                              size="sm"
                            />
                            <Input
                              type="text"
                              label="ग. दस्तुर, चन्दा रु."
                              size="sm"
                            />

                            <Input
                              type="text"
                              label="घ. ब्याज, अन्य बचत रु."
                              size="sm"
                            />
                            <Input
                              type="text"
                              label="ङ. लागत सहभागिता वा अनुदानबाट रु."
                              size="sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="5" title="प्राविधिक तथा अन्य विवरण">
              <Card>
                <CardBody>
                  <div className="">
                    <ScrollShadow className="h-60 text-sm">
                      <Content />
                    </ScrollShadow>
                    <p className="mt-2 text-blue-600 underline">अन्य शर्तहरु</p>

                    <div className="flex flex-col gap-2">
                      <Textarea className="h-20 max-w-xs" placeholder="1" />
                      <Textarea className="h-20 max-w-xs" placeholder="2" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
        <div className="flex justify-between gap-1 overflow-auto">
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
