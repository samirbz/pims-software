import React from "react"
import { Button, Input } from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { FaCirclePlus } from "react-icons/fa6"

export default function FiscalYearPage() {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="self-start text-2xl">अर्थिक बर्ष सेट अप</h1>
        <br />
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex items-center gap-4">
            <p>आ.व सुरु मिति</p>
            <Input className="w-16" placeholder="yyyy" />
            <Input className="w-14" placeholder="mm" />
            <Input className="w-12" placeholder="dd" />
          </div>
          <div className="flex items-center gap-4">
            <p>आ.व अन्तिम मिति</p>
            <Input className="w-16" placeholder="yyyy" />
            <Input className="w-14" placeholder="mm" />
            <Input className="w-12" placeholder="dd" />
          </div>
        </div>
        <br />
        <div className="flex items-center gap-4">
          <p>arthik barsha</p>
          <select className="rounded-lg border p-1">
            <option value="Select"></option>
            <option value="html">2078/4/1</option>
            <option value="css">2079/4/1</option>
            <option value="javascript">2080/4/1</option>
            <option value="bootstrap">2081/4/1</option>
          </select>
          <Button color="secondary" startContent={<FaRegSave />}>
            Save
          </Button>
          <Button color="secondary" startContent={<FaCirclePlus />}>
            AddNew
          </Button>
        </div>
        <br />
        <div className="overflow-x-auto">
          <table className="min-w-[40rem] border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">सि.न.</th>
                <th className="border border-gray-200 px-4 py-2">
                  आ.व सुरु मिति
                </th>
                <th className="border border-gray-200 px-4 py-2">
                  आ.व अन्तिम मिति
                </th>
                <th className="border border-gray-200 px-4 py-2">आ.व</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">1</td>
                <td className="border border-gray-200 px-4 py-2">2078/4/1</td>
                <td className="border border-gray-200 px-4 py-2">2079/4/1</td>
                <td className="border border-gray-200 px-4 py-2">2080/4/1</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">2</td>
                <td className="border border-gray-200 px-4 py-2">2078/4/1</td>
                <td className="border border-gray-200 px-4 py-2">2078/4/1</td>
                <td className="border border-gray-200 px-4 py-2">2078/4/1</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">2</td>
                <td className="border border-gray-200 px-4 py-2">2078/4/1</td>
                <td className="border border-gray-200 px-4 py-2">2078/4/1</td>
                <td className="border border-gray-200 px-4 py-2">2078/4/1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
