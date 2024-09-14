"use client"
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react"
import React, { useState } from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { FaUpload } from "react-icons/fa"

export default function AntimKistaFarFarak() {
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
        अन्तिम किस्ता निकासा टिप्पणी
      </h1>
      <br />
      <div className="flex gap-4">
        <section className="flex w-3/5 flex-col gap-2">
          <Checkbox className="flex self-end whitespace-nowrap">
            गत आ.व. वा क्रमागत योजना
          </Checkbox>
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
              label="योजना/कार्यक्रमको नाम"
              size="sm"
              className="w-auto"
            />
            <div className="flex gap-2">
              <Input
                type="text"
                label="उ.स. प्रतिनिधी/ कर्मचारीको नाम"
                size="sm"
              />
              <Input type="text" label="पेश्की रकम रु." size="sm" />
            </div>
            <div className="flex gap-2">
              <Input type="text" label="खुद भुक्तानी पाउने रकम" size="sm" />
              <Input type="text" label="रनिङ बिल रु." size="sm" />
            </div>
            <Input type="text" label="उ.स./ संस्थाको नाम" size="sm" />
            <div className="flex gap-2">
              <Select
                label="जम्मा मुल्याङकन रकम रु."
                size="sm"
                className="w-1/2"
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
              <div className="flex w-1/2 gap-2">
                <Input
                  type="text"
                  label="मुल्यांकन कन्टेन्जेन्सी %"
                  size="sm"
                />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="नगरपालिका मुल्याङकन रु. ( कन्टेन्जेन्सी सहित)"
                size="sm"
              />
              <Input type="text" label="खुद मुल्याङकन रकम" size="sm" />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="लागत सहभागिता मुल्याङकन रु."
                size="sm"
              />
              <Input type="text" label="जम्मा मुल्याङकन रकम" size="sm" />
            </div>
            <div className="flex gap-2">
              <Select label="बैंकको नाम / खाता न." size="sm" fullWidth>
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
              <Input type="text" label=" " size="sm" />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="समानिकरण अनुदान "
                size="sm"
                className="w-1/2"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="mr-6 whitespace-nowrap">
                    धरौटी रकम कट्टी %
                  </label>
                  <Input type="text" label="&nbsp;" size="sm" />
                  <Input type="text" label="&nbsp;" size="sm" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="mr-3 whitespace-nowrap">
                    मर्मत सम्भार कट्टी %
                  </label>
                  <Input type="text" label="&nbsp;" size="sm" />
                  <Input type="text" label="&nbsp;" size="sm" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="whitespace-nowrap">
                    योजनाको भौतिक प्रगति
                  </label>
                  <Input type="text" label="&nbsp;" size="sm" />
                  <Input type="text" label="&nbsp;" size="sm" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                isReadOnly
                type="text"
                label="अन्तिम किस्ता रकम रु."
                size="sm"
                className="w-1/2"
              />
              <Checkbox className="whitespace-nowrap">
                भुक्तानी लिने संस्था
              </Checkbox>
              <Checkbox className="whitespace-nowrap">
                भुक्तानी लिने व्यक्ति
              </Checkbox>
            </div>
            <div className="flex items-end gap-2">
              <Textarea
                label="टिप्पणीको अन्य थप विवरण भएमा रानुहोस ।"
                variant="bordered"
                size="sm"
              />
              <Button variant="light">{<FaUpload size={40} />}</Button>
            </div>
            <Button color="default" className="w-32">
              open Table
            </Button>
          </div>
        </section>
        <div className="flex w-2/5 flex-col gap-1">
          <section className="flex flex-col gap-2 bg-blue-400 px-4 pb-2 pt-3">
            <div className="flex gap-2">
              <Input type="text" label="कुल ल.ई रकम" size="sm" />
              <Input type="text" label="विनियोजित रकम रु." size="sm" />
            </div>
            <div className="flex gap-2">
              <Input type="text" label="भुक्तानी रकम रु." size="sm" />
              <Input type="text" label="हाल सम्म भुक्तानी रकम रु." size="sm" />
            </div>
            <div className="flex gap-2">
              <Input type="text" label="भुक्तानी दिन बाँकी रकम रु." size="sm" />
              <Input type="text" label="लागत सहभागिता रकम रु." size="sm" />
            </div>
            <div className="flex gap-2">
              <Input type="text" label="कन्टेन्जेन्सी रकम रु." size="sm" />
              <Input type="text" label="मर्मत रकम रु." size="sm" />
            </div>
          </section>
          <section className="flex flex-col gap-2 bg-orange-400 px-4 py-2">
            <p>विनियोजित बजेट तथा भुक्तानी विवरण </p>
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">संघिय समानिकरण</label>
              <Input type="text" label="विनियोजित रु." size="sm" />
              <Input type="text" label="भुक्तानी रकम" size="sm" />
              <Input type="text" label="बाँकी रकम" size="sm" />
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
                  बहाल लाग्ने रकम रु.
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
                <label className="w-[85%] whitespace-nowrap">
                  मुल्य अभिवृद्धी कर (३०%) लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[85%] whitespace-nowrap">
                  विल्ब शुल्क % वा रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="रोयल्टी वापत कट्टी रु." size="sm" />
              </div>
            </div>
          </section>
          <div className="mt-10 flex flex-col gap-2">
            <Button color="default" className="w-36">
              Add PDF Files
            </Button>
            <Button color="secondary">Save</Button>
          </div>
        </div>
      </div>
      {/* <div className="mb-2 flex max-h-[22rem] w-auto justify-center overflow-auto">
        <table className="w-full border-collapse border">
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
      </div> */}
    </div>
  )
}
