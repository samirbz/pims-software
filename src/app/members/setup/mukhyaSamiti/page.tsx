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
import "nepali-datepicker-reactjs/dist/index.css"
import { MdModeEditOutline } from "react-icons/md"

export default function MukhyaSamiti() {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="form-title">मुख्य समिती को नाम</h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex gap-2">
            <Input type="text" label="मुख्य समिती को नाम" size="sm" />
            <Button color="secondary" startContent={<FaRegSave />}>
              Save
            </Button>
          </div>
          <br />
          <div className="mb-2 max-h-[22rem] w-auto overflow-auto sm:mb-0">
            <table className="min-w-[30rem] border-collapse border ">
              <thead className="sticky top-0  border-r-2 bg-purple-400 ">
                <tr>
                  <th className=" px-4 py-2">सि.न.</th>
                  <th className=" px-4 py-2">समिती को नाम</th>
                  <th className=" px-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-auto text-center">
                  <td className="border px-4 py-2">dfdffgfgfgfgfgfgfgfd</td>
                  <td className="border px-4 py-2">dfdfdf</td>
                  <td className="border px-4 py-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button className="-z-10" variant="shadow" size="sm">
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
