"use client"

import React, { useEffect, useState } from "react"

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { MdOutlineEdit } from "react-icons/md"
import { getMembers } from "@/app/actions/memberActions"
import { deleteMember } from "@/app/actions/userActions"

export default function App() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    async function fetchMembers() {
      const member: any = await getMembers()
      setMembers(member)
    }
    fetchMembers()
  }, [])

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(members.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return members.slice(start, end)
  }, [page, members])

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteMember(id)
      if (result.status === "success") {
        window.location.reload()
      }
    } catch (error) {
      console.error("Delete unsuccessful:", error)
    }
  }

  return (
    <Table
      aria-label="Example table with client side pagination"
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
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="email">ROLE</TableColumn>
        <TableColumn key="edit">EDIT</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item: any) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "edit" ? (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="solid">
                        <MdOutlineEdit />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="edit-name">Edit name</DropdownItem>
                      <DropdownItem key="edit-role">Edit role</DropdownItem>
                      <DropdownItem key="new">Reset Password</DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete user
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
