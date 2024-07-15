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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
} from "@nextui-org/react"
import { MdOutlineEdit } from "react-icons/md"
import { getMembers } from "@/app/actions/memberActions"
import { deleteMember, resetUserPassword } from "@/app/actions/userActions"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { toast } from "react-toastify"

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [members, setMembers] = useState([])
  const [pass, setPass] = useState("")
  const [selectedMemberId, setSelectedMemberId] = useState("")

  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

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

  const handleResetPassword = async () => {
    try {
      const result = await resetUserPassword(pass, selectedMemberId)
      if (result.status === "success") {
        toast.success("Password Reset successfully")
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error("password reset unsuccessful:", error)
    }
    onOpenChange()
  }

  return (
    <>
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Reset Password
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Password"
                    variant="bordered"
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Enter your password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <FaRegEye className="pointer-events-none text-2xl text-default-400" />
                        ) : (
                          <FaRegEyeSlash className="pointer-events-none text-2xl text-default-400" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => handleResetPassword()}>
                    Reset
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
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
                        <DropdownItem
                          key="reset-password"
                          onPress={() => {
                            setSelectedMemberId(item.id)
                            onOpen()
                          }}
                        >
                          Reset Password
                        </DropdownItem>
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
    </>
  )
}
