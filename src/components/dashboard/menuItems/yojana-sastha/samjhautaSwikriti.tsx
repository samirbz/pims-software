"use client"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { useState } from "react"
import { MdOutlineSupervisorAccount } from "react-icons/md"
import { CiSearch } from "react-icons/ci"

export default function SamjhautaSwikriti() {
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
        <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
          योजना / कार्यक्रम प्रस्ताव स्वीकृत टिप्पणी
        </h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input type="text" label=" आ.व " size="sm" className="w-1/2" />
              <form className="flex items-center gap-2 ">
                <label htmlFor="date">मितिः-</label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1 "
                  value={date}
                  onChange={(value: string) => setDate(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
            </div>
            <Select label="योजना / कार्यक्रमको नाम" size="sm" fullWidth>
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Input type="text" label="उपभोक्ता समितिको नाम " size="sm" />
            <Input type="text" label="अध्यक्षको नाम" size="sm" />
            <div className="flex gap-2">
              <Input
                type="Number"
                label="भेलामा उपस्थिती संख्या"
                size="sm"
                className="w-[66.66%]"
              />
              <Input
                type="Number"
                label="पदाधिकारी संख्या"
                size="sm"
                className="w-[66.66%]"
              />
              <Input
                type="Number"
                label="महिला संख्या"
                size="sm"
                className="w-[66.66%]"
              />
            </div>
            <div className="flex gap-2">
              <Input
                isReadOnly
                type="Number"
                label=" लागत अनुमान रकम "
                size="sm"
                color="success"
                value="12345"
              />
              <Input
                isReadOnly
                type="Number"
                label=" नगरपालिका रकम रु. "
                color="success"
                size="sm"
                value="12345"
              />
              <Input
                isReadOnly
                type="Number"
                label=" लागत श्रमदान "
                value="12345"
                size="sm"
                color="success"
              />
            </div>
            <div className="flex gap-2">
              <Input
                isReadOnly
                type="Number"
                label="कन्टेन्जेन्सी रकम"
                color="success"
                size="sm"
                value="12345"
              />
              <Input
                isReadOnly
                type="Number"
                label=" खुद पाउने रकम"
                color="success"
                size="sm"
                value="12345"
              />
              <Input type="Number" label="अनुगमन समितिका सदस्य" size="sm" />
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                label="बजेट किताबको सि.न."
                size="sm"
                className="w-1/2"
              />
              <form className="flex items-center gap-2 ">
                <label htmlFor="date">उ.स. गठन मिति:-</label>
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
              <Input
                type="text"
                label="मुख्य समितिको नाम"
                className="w-1/2"
                size="sm"
              />

              <form className="flex items-center gap-2 ">
                <label htmlFor="date" className="whitespace-nowrap">
                  उ.स. निवेदन दिईएको मिति:-
                </label>
                <NepaliDatePicker
                  inputClassName="form-control"
                  className="rounded-lg border p-1 "
                  value={date}
                  onChange={(value: string) => setDate(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </form>
              <Button
                className="bg-pink-500 text-white "
                startContent={
                  <MdOutlineSupervisorAccount size={18} className="mb-1" />
                }
                onPress={onOpen}
              >
                Add Member
              </Button>
            </div>
            <Textarea
              label="अन्य टिप्पणी विवरण"
              className="w-full"
              variant="bordered"
            />
            <div className="flex justify-between">
              <Button color="default" className="flex justify-start">
                Reset Form
              </Button>
              <div className="flex justify-end gap-2">
                <Button color="secondary" startContent={<FaRegSave />}>
                  Save
                </Button>
                <Button color="default" startContent={<FaRegSave />}>
                  Print
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                योजनामा अनुगमन समितिको सदस्यको विवरण
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2">
                  <Select label="योजनाको नाम" size="sm" fullWidth>
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="text"
                    label="वडा न."
                    className="w-1/2"
                    size="sm"
                  />
                  <Input
                    type="number"
                    label="विनियोजित रकम रु."
                    className="w-1/2"
                    size="sm"
                  />
                </div>

                <p>योजनामा अनुगमन समितिका पदाधिकारी विवरण</p>

                <div className="flex gap-2">
                  <Input
                    type="text"
                    label="संयोजक"
                    className="w-1/2"
                    size="sm"
                  />
                  <Input
                    type="text"
                    label="सदस्य- १"
                    className="w-1/2"
                    size="sm"
                  />
                  <Input
                    type="text"
                    label="सदस्य- २"
                    className="w-1/2"
                    size="sm"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="secondary"
                  onPress={onClose}
                  startContent={<FaRegSave />}
                >
                  Save
                </Button>
                <Button
                  color="default"
                  onPress={onClose}
                  startContent={<CiSearch color="black" size={18} />}
                >
                  Search List
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
