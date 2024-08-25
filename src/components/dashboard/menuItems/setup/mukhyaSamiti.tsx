"use client"
import {
  Button,
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
  TableRow, // Import Spinner from @nextui-org/react or any other loading component
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import React, { useState, useEffect } from "react"

import {
  saveMukyaSamiti,
  fetchMukyaSamitiData,
  deleteMukyaSamitiKoNaam,
} from "@/actions/formAction"

export default function MukhyaSamiti() {
  const [mukhyaSamitiKoNaam, setMukhyaSamitiKoNaam] = useState("")
  const [mukhyaSamitiKoNaamData, setMukhyaSamitiKoNaamData] = useState<any[]>(
    []
  )
  const [loading, setLoading] = useState(true)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(mukhyaSamitiKoNaamData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return mukhyaSamitiKoNaamData.slice(start, end)
  }, [page, mukhyaSamitiKoNaamData])

  const fetchMukhyaSamiti = async () => {
    try {
      setLoading(true)
      const data = await fetchMukyaSamitiData()
      setMukhyaSamitiKoNaamData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMukhyaSamiti()
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteMukyaSamitiKoNaam(id)
    if (result.status === "success") {
      fetchMukhyaSamiti()
    } else {
      console.error("Delete unsuccessful:")
    }
  }

  const onSubmit = async () => {
    const result = await saveMukyaSamiti(mukhyaSamitiKoNaam)
    if (result.status === "success") {
      setMukhyaSamitiKoNaam("")
      fetchMukhyaSamiti()
      console.error("Error occurred")
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between bg-white p-5">
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
          मुख्य समिती को नाम
        </h1>
        <br />
        <div className="flex w-full gap-2 ">
          <Input
            type="text"
            label="मुख्य समिती को नाम"
            size="sm"
            value={mukhyaSamitiKoNaam}
            onChange={(e) => setMukhyaSamitiKoNaam(e.target.value)}
          />
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
        <br />
        {loading ? ( // Show loading spinner while data is being fetched
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
              <TableColumn>समिती को नाम</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.mukhyaSamitiKoNaam}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className="z-10"
                          variant="shadow"
                          size="sm"
                          startContent={<MdModeEditOutline />}
                        ></Button>
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
