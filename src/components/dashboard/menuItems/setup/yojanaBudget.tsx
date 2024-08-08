"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"

export default function YojanaBudget() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="form-title">
          अपलोड योजनाहरु (एक मुष्ठ रकम बाट सहायक योजनाम बाँडफाड)
        </h1>
        <br />
        <div className="flex w-auto flex-col gap-2 sm:gap-2">
          <div className="flex w-full flex-col gap-2 sm:flex-row ">
            <Input type="text" label="योजनाको नाम" size="sm" />
            <Input type="text" label="वडा न." size="sm" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input type="text" label="अनुदान किसिम" size="sm" />
            <Input type="text" label=" विनियोजन बजेट रु." size="sm" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input type="text" label="बजेट कार्यक्रम" size="sm" />
            <Input type="text" label="योजना किसिम " size="sm" />
          </div>
          <div className="flex gap-2">
            <Input type="text" label="मुख्य समिति" size="sm" />
          </div>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            className="w-12"
          >
            Save
          </Button>
        </div>
        <br />

        <br />
        <div className="mb-2 max-h-[22rem] w-auto overflow-auto sm:mb-0">
          <table className="border-collapse border ">
            <thead className="sticky top-0 z-20 border-r-2 bg-purple-400 ">
              <tr>
                <th className="px-4 py-2">सि.न.</th>
                <th className="px-4 py-2">योजनाको नाम</th>
                <th className="px-4 py-2">वडा न.</th>
                <th className="px-4 py-2">बजेट रु.</th>
                <th className="px-4 py-2">अनुदान किसिम</th>
                <th className="px-4 py-2">बजेट कार्यक्रम</th>
                <th className="px-4 py-2">योजना किसिम</th>
                <th className="px-4 py-2">मुख्य समिति</th>
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
