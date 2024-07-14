"use client"

import React from "react"
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
import { users } from "./data"
import { MdOutlineEdit } from "react-icons/md"

export default function App() {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 10

  const pages = Math.ceil(users.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return users.slice(start, end)
  }, [page])

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
        <TableColumn key="role">ROLE</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
        <TableColumn key="edit">EDIT</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
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
                      <DropdownItem key="edit">Edit name</DropdownItem>
                      <DropdownItem key="edit">Edit role</DropdownItem>
                      <DropdownItem key="new">Reset Password</DropdownItem>
                      <DropdownItem key="copy">Deactivate</DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
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
