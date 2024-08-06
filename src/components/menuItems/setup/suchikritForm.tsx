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

export default function SuchikritForm() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="form-title">फर्म कम्पनी सुची दार्त</h1>
        <br />
        <div className="flex w-auto flex-col gap-2 sm:gap-2">
          <div className="flex w-full flex-col gap-2 sm:flex-row ">
            <Input type="text" label="फर्मको नाम " size="sm" />
            <Input type="text" label="ठेगान " size="sm" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input type="text" label="फर्मको ठेगान" size="sm" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input type="text" label="पान भ्याट न." size="sm" />
            <Input type="text" label="कम्पनि दर्ता न." size="sm" />
            <Input type="text" label="प्रमाण पत्र संख्याः " size="sm" />
          </div>
          <div className="flex gap-2">
            <Input type="text" label="फोन न." size="sm" />
            <Input type="text" label="सुची दर्ता नः" size="sm" />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="सुचिकृत हुन चाहेको खरिद प्रकृतिको विवरण"
              size="sm"
              className="w-1/2"
            />
            <Button
              color="secondary"
              startContent={<FaRegSave />}
              className="w-12"
            >
              Save
            </Button>
          </div>
        </div>
        <br />

        <br />
        <div className="mb-2 max-h-[22rem] w-auto max-w-[90rem] overflow-auto sm:mb-0">
          <table className="min-w-[40rem]  border-collapse border ">
            <thead className="sticky top-0 z-20 border-r-2 bg-purple-400 ">
              <tr>
                <th className="px-4 py-2">सि.न.</th>
                <th className="px-4 py-2">फर्मको नाम.</th>
                <th className="px-4 py-2">ठेगाना</th>
                <th className="px-4 py-2">पान न.</th>
                <th className="px-4 py-2">सस्था दर्ता न.</th>
                <th className="px-4 py-2">फोन न.</th>
                <th className="px-4 py-2">दर्ता मिति</th>
                <th className="px-4 py-2">सुचिकृत </th>
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
