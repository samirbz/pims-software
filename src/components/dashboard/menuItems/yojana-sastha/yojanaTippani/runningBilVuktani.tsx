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

export default function RunningBilVuktani() {
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
        रनिङ विल रकम निकासा
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
              label="योजना/कार्यक्रमको नाम"
              size="sm"
              className="w-auto"
            />
            <Input
              type="text"
              label="उ.स. प्रतिनिधी/ कर्मचारीको नाम"
              size="sm"
              className="w-auto"
            />
            <div className="flex gap-2">
              <Input type="text" label="खुद पाउने रकम" size="sm" />
              <Input type="text" label="पेश्की रकम रु." size="sm" />
            </div>
            <Input type="text" label="उ.स./ कार्यालयको नाम" size="sm" />
            <div className="flex gap-2">
              <Select label="भुक्तानी दिने किस्ता" size="sm" className="w-1/2">
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
              <div className="flex w-1/2 gap-2">
                <Input type="text" label="कन्टेन्जेन्सी रकम %" size="sm" />
                <Input type="text" label="रकम" size="sm" />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="नगरपालिका मुल्याङकन रकम रु."
                size="sm"
              />
              <Input
                type="text"
                label="मुल्याङकन (कन्टेन्जेन्सी) सहित"
                size="sm"
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="मुल्याङकन लागतसहभागिता रकम रु."
                size="sm"
              />
              <Input type="text" label="खुद मुल्याङकन रकम" size="sm" />
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
                label="समानिकरण अनुदान"
                size="sm"
                className="w-1/2"
              />
              <Checkbox>यदी&nbsp;पुरानो&nbsp;आ.व.को&nbsp;योजना</Checkbox>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                isReadOnly
                type="text"
                label="रनिङ विल रकम रु."
                size="sm"
                className="w-1/2"
              />
              <Checkbox className="whitespace-nowrap">
                रनिङ विलमा पेश्की फर्छयौट गर्ने हो ?
              </Checkbox>
            </div>
            <Textarea
              label="अन्य टिप्पणीको थप विवरण व्यहोरा"
              variant="bordered"
              size="sm"
            />
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
              <Input
                type="text"
                label="भुक्तानी दिनु पर्ने रकम रु."
                size="sm"
              />
              <Input
                type="text"
                label="हाल सम्म भुक्तानी भएको रकम रु."
                size="sm"
              />
            </div>
            <div className="flex gap-2">
              <Input type="text" label="भुक्तानी हुन बाँकी रकम रु." size="sm" />
              <Input type="text" label="लागत सहभागिता रकम रु." size="sm" />
            </div>
            <div className="flex gap-2">
              <Input type="text" label="कन्टेन्जेन्सी रकम" size="sm" />
              <Input type="text" label="मर्मत रकम रु." size="sm" />
            </div>
          </section>
          <section className="flex flex-col gap-2 bg-green-400 px-4 py-2">
            <p>विनियोजित बजेट तथा भुक्तानी भएको विवरण </p>
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">समानिकरण अनुदान</label>
              <Input type="text" label="विनियोजित रु." size="sm" />
              <Input type="text" label="भुक्तानी रकम" size="sm" />
              <Input type="text" label="बाँकी रकम" size="sm" />
            </div>
          </section>
          <section className="flex flex-col gap-2 bg-pink-400 px-4 pb-3 pt-2">
            <p>कट्टी रकमहरु </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="w-[85%] whitespace-nowrap">
                  अग्रिम आय कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[85%] whitespace-nowrap">
                  सामाजिक सुरक्षा कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[85%] whitespace-nowrap">
                  बहाल कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[85%] whitespace-nowrap">
                  पारिश्रमिक कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[85%] whitespace-nowrap">
                  आकस्मिक कर लाग्ने रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[85%] whitespace-nowrap">
                  मुल्य अभिवृद्धी कर (३०%) रकम रु.
                </label>
                <Input type="text" label="&nbsp;" size="sm" />
                <Input type="text" label="&nbsp;" size="sm" />
              </div>
            </div>
          </section>

          <Button color="secondary">Save</Button>
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
