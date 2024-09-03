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
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
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
      fetchDate()
    } else {
      console.error("Delete unsuccessful:")
    }
  }
  const [loading, setLoading] = useState(true)
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(tskDetails.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return tskDetails.slice(start, end)
  }, [page, tskDetails])

  const fetchDate = async () => {
    try {
      setLoading(true)
      const data = await fetchTskData()
      setTskDetails(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    fetchDate()
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteTskData(id)
    if (result.status === "success") {
      fetchDate()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
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
            isDisabled={
              !tayarGarneKoName ||
              !tayarGarneKoPad ||
              !peshGarneKoName ||
              !peshGarneKoPad ||
              !sifarishRujuGarne ||
              !sifarishRujuGarneKoPad ||
              !sadarGarneKoName ||
              !sadarGarneKopad
            }
          >
            Save
          </Button>
        </div>
        <br />
        {loading ? (
          <div className="my-4 flex w-full justify-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <Table
            aria-label="Example table with dynamic content"
            className="h-auto min-w-full"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>सि.न.</TableColumn>
              <TableColumn>सदर गर्नेको नाम</TableColumn>
              <TableColumn>सदर गर्नेको पद</TableColumn>
              <TableColumn>सिफारिस गर्नेको नाम</TableColumn>
              <TableColumn>सिफारिस गर्नेको पद</TableColumn>
              <TableColumn>पेश गर्नेको नाम</TableColumn>
              <TableColumn>पेश गर्ने पद</TableColumn>
              <TableColumn>तयार गर्ने</TableColumn>
              <TableColumn>तयार गर्नेको पद</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.tayarGarneKoName}</TableCell>
                  <TableCell>{item.tayarGarneKoPad}</TableCell>
                  <TableCell>{item.peshGarneKoName}</TableCell>
                  <TableCell>{item.peshGarneKoPad}</TableCell>
                  <TableCell>{item.sifarishRujuGarne}</TableCell>
                  <TableCell>{item.sifarishRujuGarneKoPad}</TableCell>
                  <TableCell>{item.sadarGarneKoName}</TableCell>
                  <TableCell>{item.sadarGarneKopad}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}
