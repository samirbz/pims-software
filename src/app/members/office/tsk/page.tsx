"use client"
import React, { useEffect, useState } from "react"
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react"
import { deleteTskData, fetchTskData, saveTskData } from "@/actions/formAction"
import { FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"

export default function TskPage() {
  const [tayarGarneKoName, setTayarGarneKoName] = useState<string>("")
  const [tayarGarneKoPad, setTayarGarneKoPad] = useState<string>("")
  const [tippaniMaDekhauneHo, SetTippaniMaDekhauneHo] = useState<boolean>(false)
  const [tayarGarneKoNaamPadDekhauneHo, SetTayarGarneKoNaamPadDekhauneHo] =
    useState<boolean>(false)

  const [peshGarneKoName, setPeshGarneKoName] = useState<string>("")
  const [peshGarneKoPad, setPeshGarneKo] = useState<string>("")
  const [peshTippaniMaDekhauneHo, SetPeshTippaniMaDekhauneHo] =
    useState<boolean>(false)
  const [peshGarneKoNaamPadDekhauneHo, SetPeshGarneKoNaamPadDekhauneHo] =
    useState<boolean>(false)

  const [sifarishRujuGarne, setSifarishRujuGarne] = useState<string>("")
  const [sifarishRujuGarneKoPad, setSifarishRujuGarneKoPad] =
    useState<string>("")
  const [sifarisTippaniMaDekhauneHo, SetSifarisTippaniMaDekhauneHo] =
    useState<boolean>(false)
  const [
    sifarishGarneKoNaamPadDekhauneHo,
    SetSifarishGarneKoNaamPadDekhauneHo,
  ] = useState<boolean>(false)

  const [sadarGarneKoName, setSadarGarneKoName] = useState<string>("")
  const [sadarGarneKopad, setSadarGarneKopad] = useState<string>("")
  const [sadarTippaniMaDekhauneHo, SetSadarTippaniMaDekhauneHo] =
    useState<boolean>(false)
  const [sadarGarneKoNaamPadDekhauneHo, SetSadarishGarneKoNaamPadDekhauneHo] =
    useState<boolean>(false)

  const [sifarishRujuGarneAmaanKoNaam, setSifarishRujuGarneAmaanKoNaam] =
    useState<boolean>(false)
  const [sifarishRujuGarneUpovoktaKoNaam, setSifarishRujuGarneUpovoktaKoNaam] =
    useState<boolean>(false)

  const [tskDetails, setTskDetails] = useState<any[]>([])

  const onSubmit = async () => {
    const result = await saveTskData(
      tayarGarneKoName,
      tayarGarneKoPad,
      tippaniMaDekhauneHo,
      tayarGarneKoNaamPadDekhauneHo,
      peshGarneKoName,
      peshGarneKoPad,
      peshTippaniMaDekhauneHo,
      peshGarneKoNaamPadDekhauneHo,
      sifarishRujuGarne,
      sifarishRujuGarneKoPad,
      sifarisTippaniMaDekhauneHo,
      sifarishGarneKoNaamPadDekhauneHo,
      sadarGarneKoName,
      sadarGarneKopad,
      sadarTippaniMaDekhauneHo,
      sadarGarneKoNaamPadDekhauneHo,
      sifarishRujuGarneAmaanKoNaam,
      sifarishRujuGarneUpovoktaKoNaam
    )
    if (result.status === "success") {
      window.location.reload()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const fetchDate = async () => {
    try {
      const data = await fetchTskData()
      setTskDetails(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    }
  }

  useEffect(() => {
    fetchDate()
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteTskData(id)
    if (result.status === "success") {
      window.location.reload()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full px-4 sm:w-auto">
        <h1 className="self-start text-2xl">
          टिप्पणी सदर गर्ने कर्मचारीको विवरण
        </h1>
        <br />
        <div className="flex w-auto flex-col sm:gap-2">
          <div className="flex w-full gap-2">
            <Input
              type="text"
              label="तयार गर्नेको नाम"
              size="sm"
              value={tayarGarneKoName}
              onChange={(e) => setTayarGarneKoName(e.target.value)}
            />
            <Input
              type="text"
              label="पद"
              size="sm"
              value={tayarGarneKoPad}
              onChange={(e) => setTayarGarneKoPad(e.target.value)}
            />
            <div className="w-full flex-col sm:flex">
              <Checkbox
                size="sm"
                checked={tippaniMaDekhauneHo}
                onChange={(e) => SetTippaniMaDekhauneHo(e.target.checked)}
              >
                टिप्पणीमा देखाउने हो ?
              </Checkbox>
              <Checkbox
                size="sm"
                checked={tayarGarneKoNaamPadDekhauneHo}
                onChange={(e) =>
                  SetTayarGarneKoNaamPadDekhauneHo(e.target.checked)
                }
              >
                तयार गर्नेको नाम पद देखाउने हो ?
              </Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="पेश गर्नेको नाम"
              size="sm"
              value={peshGarneKoName}
              onChange={(e) => setPeshGarneKoName(e.target.value)}
            />
            <Input
              type="text"
              label="पद"
              size="sm"
              value={peshGarneKoPad}
              onChange={(e) => setPeshGarneKo(e.target.value)}
            />
            <div className="w-full flex-col sm:flex">
              <Checkbox
                size="sm"
                checked={peshTippaniMaDekhauneHo}
                onChange={(e) => SetPeshTippaniMaDekhauneHo(e.target.checked)}
              >
                टिप्पणीमा देखाउने हो ?
              </Checkbox>
              <Checkbox
                size="sm"
                checked={peshGarneKoNaamPadDekhauneHo}
                onChange={(e) =>
                  SetPeshGarneKoNaamPadDekhauneHo(e.target.checked)
                }
              >
                पेश गर्नेको नाम पद देखाउने हो ?
              </Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="सिफारिस/रुजु गर्ने "
              size="sm"
              value={sifarishRujuGarne}
              onChange={(e) => setSifarishRujuGarne(e.target.value)}
            />
            <Input
              type="text"
              label="पद"
              size="sm"
              value={sifarishRujuGarneKoPad}
              onChange={(e) => setSifarishRujuGarneKoPad(e.target.value)}
            />
            <div className="w-full flex-col sm:flex">
              <Checkbox
                size="sm"
                checked={sifarisTippaniMaDekhauneHo}
                onChange={(e) =>
                  SetSifarisTippaniMaDekhauneHo(e.target.checked)
                }
              >
                टिप्पणीमा देखाउने हो ?
              </Checkbox>
              <Checkbox
                size="sm"
                checked={sifarishGarneKoNaamPadDekhauneHo}
                onChange={(e) =>
                  SetSifarishGarneKoNaamPadDekhauneHo(e.target.checked)
                }
              >
                सिफारिस गर्नेको नाम पद देखाउने हो ?
              </Checkbox>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              label="सदर गर्नेको नाम"
              size="sm"
              value={sadarGarneKoName}
              onChange={(e) => setSadarGarneKoName(e.target.value)}
            />
            <Input
              type="text"
              label="पद"
              size="sm"
              value={sadarGarneKopad}
              onChange={(e) => setSadarGarneKopad(e.target.value)}
            />
            <div className="w-full flex-col sm:flex">
              <Checkbox
                size="sm"
                checked={sadarTippaniMaDekhauneHo}
                onChange={(e) => SetSadarTippaniMaDekhauneHo(e.target.checked)}
              >
                टिप्पणीमा देखाउने हो ?
              </Checkbox>
              <Checkbox
                size="sm"
                checked={sadarGarneKoNaamPadDekhauneHo}
                onChange={(e) =>
                  SetSadarishGarneKoNaamPadDekhauneHo(e.target.checked)
                }
              >
                सदर गर्नेको नाम पद देखाउने हो ?
              </Checkbox>
            </div>
          </div>
        </div>
        <br />
        <div className="flex gap-4">
          <Checkbox
            size="sm"
            checked={sifarishRujuGarneAmaanKoNaam}
            onChange={(e) => setSifarishRujuGarneAmaanKoNaam(e.target.checked)}
          >
            सिफारिस / रुजु गर्ने अमानतको टिप्पणीमा देखाउने हो ?{" "}
          </Checkbox>
          <Checkbox
            size="sm"
            checked={sifarishRujuGarneUpovoktaKoNaam}
            onChange={(e) =>
              setSifarishRujuGarneUpovoktaKoNaam(e.target.checked)
            }
          >
            सिफारिस / रुजु गर्ने उपभोक्तको टिप्पणीमा देखाउने हो ?
          </Checkbox>
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
        <br />
        <div className="mb-2 max-h-[22rem] w-auto overflow-auto sm:mb-0">
          <table className="min-w-[40rem] border-collapse border ">
            <thead className="sticky top-0 z-50 border-r-2 bg-purple-400 ">
              <tr>
                <th className="px-4 py-2">सि.न.</th>
                <th className="px-4 py-2">सदर गर्नेको नाम</th>
                <th className="px-4 py-2">सदर गर्नेको पद</th>
                <th className="px-4 py-2">सिफारिस गर्नेको नाम</th>
                <th className="px-4 py-2">सिफारिस गर्नेको पद</th>
                <th className="px-4 py-2">पेश गर्नेको नाम</th>
                <th className="px-4 py-2">पेश गर्ने पद</th>
                <th className="px-4 py-2">तयार गर्ने</th>
                <th className="px-4 py-2">तयार गर्नेको पद</th>
                <th className="px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tskDetails.map((item, index) => (
                <tr key={item.id}>
                  <td className="border  px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.tayarGarneKoName}</td>
                  <td className="border px-4 py-2">{item.tayarGarneKoPad}</td>
                  <td className="border px-4 py-2">{item.peshGarneKoName}</td>
                  <td className="border px-4 py-2">{item.peshGarneKoPad}</td>
                  <td className="border px-4 py-2">{item.sifarishRujuGarne}</td>
                  <td className="border px-4 py-2">
                    {item.sifarishRujuGarneKoPad}
                  </td>
                  <td className="border px-4 py-2">{item.sadarGarneKoName}</td>
                  <td className="border px-4 py-2">{item.sadarGarneKopad}</td>
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
                          onPress={() => handleDelete(item.id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
