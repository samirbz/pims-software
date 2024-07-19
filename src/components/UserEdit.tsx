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
import { getMembersExcludeOwn } from "@/actions/memberActions"
import { deleteMember, resetUserPassword } from "@/actions/userActions"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { toast } from "react-toastify"
import { MdModeEditOutline } from "react-icons/md"

export default function UserEdit() {
  const {
    isOpen: isResetPasswordOpen,
    onOpen: onResetPasswordOpen,
    onOpenChange: onResetPasswordOpenChange,
  } = useDisclosure()
  const {
    isOpen: isDeleteConfirmationOpen,
    onOpen: onDeleteConfirmationOpen,
    onOpenChange: onDeleteConfirmationOpenChange,
  } = useDisclosure()

  const [members, setMembers] = useState([])
  const [pass, setPass] = useState("")
  const [selectedMemberId, setSelectedMemberId] = useState("")
  const [deleteUserId, setDeleteUserId] = useState("")

  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  useEffect(() => {
    async function fetchMembers() {
      const member: any = await getMembersExcludeOwn()
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
    setDeleteUserId(id) // Set the ID to be deleted
    onDeleteConfirmationOpen() // Open the confirmation modal
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
    onResetPasswordOpenChange()
  }

  const confirmDeleteUser = async () => {
    try {
      const result = await deleteMember(deleteUserId)
      if (result.status === "success") {
        toast.success("User deleted successfully")
        window.location.reload()
      } else {
        console.error("Delete unsuccessful:")
      }
    } catch (error) {
      console.error("Delete unsuccessful:", error)
    }
    onDeleteConfirmationOpenChange()
  }

  return (
    <div className="flex justify-center">
      <Modal
        isOpen={isResetPasswordOpen}
        onOpenChange={onResetPasswordOpenChange}
      >
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
                  placeholder="Enter new password"
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

      <Modal
        isOpen={isDeleteConfirmationOpen}
        onOpenChange={onDeleteConfirmationOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmation
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this user?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={confirmDeleteUser}>
                Delete
              </Button>
              <Button color="primary" onClick={onDeleteConfirmationOpenChange}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Table
        align="center"
        aria-label="Example table with client side pagination"
        className="w-1/2"
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
          <TableColumn key="snum">S.No</TableColumn>
          <TableColumn key="createdBy">Created By</TableColumn>
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
                        <Button variant="shadow" size="sm">
                          <MdModeEditOutline />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          key="reset-password"
                          onPress={() => {
                            setSelectedMemberId(item.id)
                            onResetPasswordOpen()
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
    </div>
  )
}
