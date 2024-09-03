"use client"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
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
  Spinner,
} from "@nextui-org/react"
import { fetchStaffNames, getMembersExcludeOwn } from "@/actions/memberActions"
import { deleteMember, resetUserPassword } from "@/actions/userActions"
import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { toast } from "react-toastify"
import { registerUser } from "@/actions/authActions"
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema"
import { useForm } from "react-hook-form"
import { IoIosSave } from "react-icons/io"
import { MdModeEditOutline } from "react-icons/md"
import { zodResolver } from "@hookform/resolvers/zod"

interface Member {
  id: string
  name: string
  username: string
  email: string
}

interface StaffMember {
  name: string
}

export default function UserSetup() {
  const [loading, setLoading] = useState(true)
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

  async function fetchMembers() {
    try {
      setLoading(true) // Set loading to true before fetching data
      const member: any = await getMembersExcludeOwn()
      setMembers(member)
    } catch (error) {
      console.error("Error fetching users", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  useEffect(() => {
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
        // window.location.reload()
        fetchMembers()
      } else {
        console.error("Delete unsuccessful:")
      }
    } catch (error) {
      console.error("Delete unsuccessful:", error)
    }
    onDeleteConfirmationOpenChange()
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data)

    if (result.status === "success") {
      toast.success("User created successfully")
      reset()
      fetchMembers()
    } else {
      // Show error message in toast
      if (result.error === "User already exists") {
        toast.error("User already exists")
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  const [staffNames, setStaffNames] = useState<StaffMember[]>([])

  useEffect(() => {
    const getStaffNames = async () => {
      try {
        const staff: any = await fetchStaffNames()
        setStaffNames(staff)
      } catch (error) {
        console.error("Error fetching staff names:", error)
      }
    }

    getStaffNames()
  }, [])

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
              <ModalHeader className="flex flex-col gap-1 ">
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
                        <Select
                          size="sm"
                          items={staffNames}
                          label="कर्मचारीको नाम"
                          placeholder="select"
                          {...register("name")}
                          isInvalid={!!errors.name}
                          errorMessage={errors.name?.message}
                        >
                          {(item) => (
                            <SelectItem key={item.name}>{item.name}</SelectItem>
                          )}
                        </Select>

                        <Input
                          size="sm"
                          defaultValue=""
                          label="username"
                          variant="bordered"
                          {...register("username")}
                          isInvalid={!!errors.username}
                          errorMessage={errors.username?.message}
                        />

                        <Select
                          size="sm"
                          label="role"
                          placeholder="select"
                          {...register("email")}
                          isInvalid={!!errors.email}
                          errorMessage={errors.email?.message}
                        >
                          <SelectItem key="user">Normal User</SelectItem>
                          <SelectItem key="admin">Admin User</SelectItem>
                        </Select>

                        <Input
                          size="sm"
                          defaultValue=""
                          label="password"
                          variant="bordered"
                          {...register("password")}
                          isInvalid={!!errors.password}
                          errorMessage={errors.password?.message}
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibilitys}
                            >
                              {isVisibles ? (
                                <FaRegEye className="pointer-events-none text-2xl text-default-400" />
                              ) : (
                                <FaRegEyeSlash className="pointer-events-none text-2xl text-default-400" />
                              )}
                            </button>
                          }
                          type={isVisibles ? "text" : "password"}
                        />

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
                          color="primary"
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
      <div className="flex flex-row items-center justify-between bg-white">
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
          प्रयोगकर्ता सेटअप
        </h1>

        <div className="flex gap-2">
          <Button onPress={onOpen} startContent={<FaPlus />} color="primary">
            Add User
          </Button>
        </div>
      </div>
      <br />

      {loading ? (
        <div className="my-4 flex w-full justify-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <Table
          aria-label="Example table with client side pagination"
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
            <TableColumn>कर्मचारीको नाम</TableColumn>
            <TableColumn>प्रयोगकर्ताको ID</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>EDIT</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.username}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="z-10" variant="shadow" size="sm">
                        <MdModeEditOutline />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                      <DropdownItem
                        key="reset-password"
                        onPress={() => {
                          setSelectedMemberId(member.id)
                          onResetPasswordOpen()
                        }}
                      >
                        Reset Password
                      </DropdownItem>

                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => handleDelete(member.id)}
                      >
                        Delete user
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
