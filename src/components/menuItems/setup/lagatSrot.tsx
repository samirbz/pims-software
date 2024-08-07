"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import "nepali-datepicker-reactjs/dist/index.css"
import { MdModeEditOutline } from "react-icons/md"

const selectConfig = [
  { key: "1", label: "सशर्त अनुदान" },
  { key: "2", label: "निशर्त अनुदान" },
  { key: "3", label: "समपुरक अनुदान " },
  { key: "4", label: "बिशेष अनुदान" },
  { key: "5", label: "समानिकरण अनुदान" },
  { key: "6", label: "आन्तरिक श्रोत" },
  { key: "7", label: "संघिय सरकार " },
  { key: "8", label: "प्रदेश सरकार " },
  { key: "9", label: "प्रदेश सर्शत" },
]

export default function LagatSrot() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="form-title">लागत श्रोतहरु</h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex flex-col gap-2">
            <Select label="अनुदान को किसिम " className="max-w-xs">
              {selectConfig.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
            <Input type="text" label="लागत श्रोत नाम" size="sm" />

            <Button
              color="secondary"
              className="w-10 self-center"
              startContent={<FaRegSave />}
            >
              Save
            </Button>
          </div>
          <div className="mb-2 max-h-[22rem] w-auto overflow-auto sm:mb-0">
            <table className="border-collapse border ">
              <thead className="sticky top-0  z-20 border-r-2 bg-purple-400">
                <tr>
                  <th className=" px-4 py-2">सि.न.</th>
                  <th className=" px-4 py-2">लागत श्रोत</th>
                  <th className=" px-4 py-2">अनुदान किसिम</th>
                  <th className=" px-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-auto text-center">
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
