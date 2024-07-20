"use client"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableHeader,
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
  Select,
  SelectItem,
  Card,
  CardBody,
  Input,
  TableColumn,
} from "@nextui-org/react"
import { getMembersExcludeOwn, getStaff } from "@/actions/memberActions"
import { deleteMember, resetUserPassword } from "@/actions/userActions"
import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { toast } from "react-toastify"
import { MdModeEditOutline } from "react-icons/md"
import { registerUser, staffRegister } from "@/actions/authActions"
import { RegisterSchema } from "@/lib/schemas/registerSchema"
// import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { IoIosSave } from "react-icons/io"
import { StaffRegisterSchema } from "@/lib/schemas/staffRegisterSchema"

interface Member {
  id: string
  name: string
  ranking: string
  position: string
}

export default function StaffDetailPage() {
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
  const [isVisibles, setIsVisibles] = React.useState(false)
  const toggleVisibilitys = () => setIsVisibles(!isVisible)

  useEffect(() => {
    async function fetchMembers() {
      const member: any = await getStaff()
      setMembers(member)
    }
    fetchMembers()
  }, [])

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7
  const pages = Math.ceil(members.length / rowsPerPage)

  const items: Member[] = React.useMemo(() => {
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<StaffRegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })

  const onSubmit = async (data: StaffRegisterSchema) => {
    const result = await staffRegister(data)

    if (result.status === "success") {
      toast.success("User created successfully")
      router.refresh()
      // Optionally redirect or refresh
    } else {
      // Show error message in toast
      if (result.error === "User already exists") {
        toast.error("User already exists")
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <>
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="pb-4">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User setup
              </ModalHeader>

              <ModalBody>
                <Card>
                  <CardBody className="py-7">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-4 "
                    >
                      <div className="space-y-4">
                        <Input
                          size="sm"
                          defaultValue=""
                          label="कर्मचारीको नाम "
                          variant="bordered"
                          {...register("name")}
                          isInvalid={!!errors.name}
                          errorMessage={errors.name?.message}
                        />

                        <Select
                          size="sm"
                          label="ranking"
                          placeholder="select"
                          {...register("ranking")}
                          isInvalid={!!errors.ranking}
                          errorMessage={errors.ranking?.message}
                        >
                          <SelectItem key="1">1</SelectItem>
                          <SelectItem key="5">5</SelectItem>
                        </Select>

                        <Select
                          size="sm"
                          label="position"
                          placeholder="select"
                          {...register("position")}
                          isInvalid={!!errors.position}
                          errorMessage={errors.position?.message}
                        >
                          <SelectItem key="hakim">hakim</SelectItem>
                          <SelectItem key="piun">piun</SelectItem>
                        </Select>

                        {errors.root?.serverError && (
                          <p className="text-sm text-danger">
                            {errors.root.serverError.message}
                          </p>
                        )}
                      </div>
                      <div className="self-end">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="secondary"
                          isLoading={isSubmitting}
                          isDisabled={!isValid}
                          onPress={onClose}
                          type="submit"
                          startContent={<IoIosSave />}
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex w-full justify-center">
        <div className="mt-8 flex w-[97%] flex-col items-center gap-2 sm:w-1/2">
          <h1 className="text-2xl font-semibold">कर्मचारी विवरण</h1>
          <Button onPress={onOpen} startContent={<FaPlus />} color="primary">
            Add Staff
          </Button>
          <Table
            align="center"
            aria-label="Example table with client side pagination"
            className="w-[96%] sm:w-full"
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
              <TableColumn key="snum">सि.न.</TableColumn>
              <TableColumn key="name">कर्मचारीको नाम</TableColumn>
              <TableColumn key="position">पद </TableColumn>
              <TableColumn key="ranking">वरियता क्रम</TableColumn>
              <TableColumn key="edit">EDIT</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item: Member) => (
                <TableRow key={item.id}>
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
                      ) : columnKey === "snum" ? (
                        items.indexOf(item) + 1 + (page - 1) * rowsPerPage
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
      </div>
    </>
  )
}
