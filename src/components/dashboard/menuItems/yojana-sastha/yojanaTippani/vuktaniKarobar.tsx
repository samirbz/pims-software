"use client"
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState } from "react"

export default function BankKhataBanda() {
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
    <div className="flex flex-col justify-between bg-white ">
      <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
        भुक्तानी कारोबारको सिफारिस पत्र (म.ले.पा.फ.न २०२)
      </h1>
      <br />
      <div className="flex w-auto flex-col sm:gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <form className="flex items-center gap-2 ">
              <label htmlFor="date">आ.व.</label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1 "
                value={date}
                onChange={(value: string) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
            <form className="flex items-center gap-2 ">
              <label htmlFor="date">सिफारिस&nbsp;मिति</label>
              <NepaliDatePicker
                inputClassName="form-control"
                className="rounded-lg border p-1 "
                value={date}
                onChange={(value: string) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </form>
          </div>
          <div className="flex gap-2">
            <Select label="योजनाको नाम" size="sm" className="w-1/2">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <div className="flex gap-2">
              <Input type="text" label="वडा न." size="sm" />
              <Input type="text" label="विनियोजित रकम रु." size="sm" />
              <Input type="text" label="मुल्याङकन रकम रु." size="sm" />
              <Input type="text" label="कारोबार रकम रु." size="sm" />
            </div>
          </div>
          <Checkbox>Check All</Checkbox>
          <hr />
          <div className="rounded-lg bg-gray-50 p-6 shadow-md">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १. आम भेलाको उपस्थिति
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  २.उ.स. र अनुगमन समितिको गठन गरेको निर्णय / खाता संचालनको
                  निर्णय
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  ३. समितिमा रहेको पदाधिकारीहरुको नागरिता प्रतिलिपी
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  ४. बडाको सिफारिस / सम्झौताको निवेदन
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  ५. लागत इस्टिमेट
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  ६. सम्झौता कार्यादेश र टिप्पणी
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  ७. योजना फोटोहरु
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  ८. प्रयोग बिल थान
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  ९. डोर हाजिर फाराम
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १०. अनुसुची २८,६ र ४
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  ११. खाता संचालकको निर्णय
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १२.उ.स र अ.स. कार्य सम्पन्नको निर्णय
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १३. नगरपालिकाबाट दिएको खाता खोल्नेको सिफारिस
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १४. रकम भुक्तानीको लागि वडाको सिफारिस
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १५. उ.स. को अनुगमन तथा भुक्तानीको लागि दिएको पत्र
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १६. अनुगमन प्रतिवेदन
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १७. नापी किताब
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १८. कार्य सम्पन्न प्रतिवेदन
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  १९. मुल्याङकन बिल भर्पाई
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  २०. काम सम्पन्न भए पछिको टिप्पणी आदेश
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className=" size-5 rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  २१. अन्य केही भए लेख्नुहोस
                </span>
              </label>
            </div>
          </div>
          <Textarea
            size="sm"
            label="सिफारिस पत्र माथिको कारवाहीको विवरण"
            variant="bordered"
          />
          <div>
            <label>अनुगमन समिति</label>
            <div className="flex gap-2">
              <Input size="sm" label="संयोजक" />
              <Input size="sm" label="सदस्य १" />
              <Input size="sm" label="सदस्य २" />
              <Input size="sm" label="सदस्य ३" />
              <Input size="sm" label="सदस्य ४" />
            </div>
          </div>
          <div className="flex w-1/2 gap-2">
            <Input size="sm" label="ब.उ.शी.न." />
            <Input size="sm" label="खर्च शीर्षक नं." />
          </div>
          <form className="flex items-center gap-2 ">
            <label htmlFor="date">उ.स. र अनुगमन समितिको निर्णय मिति</label>
            <NepaliDatePicker
              inputClassName="form-control"
              className="rounded-lg border p-1 "
              value={date}
              onChange={(value: string) => setDate(value)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </form>

          <Input size="sm" label="पदाधिकारी/कर्मचारी" />
          <div className="flex gap-2">
            <Button size="sm">Search List</Button>
            <Button size="sm" color="secondary">
              Add/Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
