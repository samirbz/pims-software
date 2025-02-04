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
  Checkbox,
  Spinner,
} from "@nextui-org/react"
import { getStaff } from "@/actions/memberActions"
import { deleteStaff, updateStaff } from "@/actions/userActions"
import { FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"
import { staffRegister } from "@/actions/authActions"
import { useForm } from "react-hook-form"
import { IoIosSave, IoMdCheckmark } from "react-icons/io"
import {
  staffRegisterSchema,
  StaffRegisterSchema,
} from "@/lib/schemas/staffRegisterSchema"
import { MdModeEditOutline } from "react-icons/md"
import { zodResolver } from "@hookform/resolvers/zod"
import { ConvertToNepaliNumerals } from "@/lib/util"

interface Member {
  id: string
  name: string
  ranking: string
  position: string
  isuser: boolean
}

export default function StaffDetailPage() {
  const [loading, setLoading] = useState(true)
  const {
    isOpen: isDeleteConfirmationOpen,
    onOpen: onDeleteConfirmationOpen,
    onOpenChange: onDeleteConfirmationOpenChange,
  } = useDisclosure()

  const [members, setMembers] = useState([])
  const [deleteUserId, setDeleteUserId] = useState("")
  const [editMember, setEditMember] = useState<Member | null>(null)

  async function fetchMembers() {
    try {
      setLoading(true)
      const member: any = await getStaff()
      setMembers(member)
    } catch (error) {
      console.error("Error fetching staff detail", error)
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

  const confirmDeleteUser = async () => {
    try {
      const result = await deleteStaff(deleteUserId)
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
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<StaffRegisterSchema>({
    resolver: zodResolver(staffRegisterSchema),
    mode: "onTouched",
  })

  const onSubmit = async (data: StaffRegisterSchema) => {
    if (editMember) {
      // Update the existing member
      const result = await updateStaff(editMember.id, data)
      if (result.status === "success") {
        toast.success("User updated successfully")
        reset()
        fetchMembers()
        setEditMember(null) // Clear the editing state
      } else {
        toast.error("Something went wrong")
      }
    } else {
      // Register a new member
      const result = await staffRegister(data)
      if (result.status === "success") {
        toast.success("User created successfully")
        reset()
        fetchMembers()
      } else {
        if (result.error === "User already exists") {
          toast.error("User already exists")
        } else {
          toast.error("Something went wrong")
        }
      }
    }
    onOpenChange() // Close the modal
  }

  const handleEdit = (member: Member) => {
    setEditMember(member)
    setValue("name", member.name) // Pre-fill the form fields
    setValue("ranking", member.ranking)
    setValue("position", member.position)
    setValue("isuser", member.isuser)
    onOpen()
  }

  return (
    <>
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
                Staff Setup
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
                          label="वरियता क्रम"
                          placeholder="select"
                          {...register("ranking")}
                          isInvalid={!!errors.ranking}
                          errorMessage={errors.ranking?.message}
                        >
                          <SelectItem key="1">1</SelectItem>
                          <SelectItem key="2">2</SelectItem>
                          <SelectItem key="3">3</SelectItem>
                          <SelectItem key="4">4</SelectItem>
                          <SelectItem key="5">5</SelectItem>
                          <SelectItem key="6">6</SelectItem>
                          <SelectItem key="7">7</SelectItem>
                          <SelectItem key="8">8</SelectItem>
                          <SelectItem key="9">9</SelectItem>
                          <SelectItem key="10">10</SelectItem>
                          <SelectItem key="10">96</SelectItem>
                          <SelectItem key="10">97</SelectItem>
                          <SelectItem key="10">98</SelectItem>
                          <SelectItem key="10">99</SelectItem>
                        </Select>

                        <Select
                          size="sm"
                          label="कर्मचारी पद "
                          placeholder="select"
                          {...register("position")}
                          isInvalid={!!errors.position}
                          errorMessage={errors.position?.message}
                        >
                          <SelectItem key="प्रमुख प्रशासकिय अधिकृत">
                            प्रमुख प्रशासकिय अधिकृत
                          </SelectItem>
                          <SelectItem key=" निमित्त प्रमुख प्रशासकिय अधिकृत">
                            निमित्त प्रमुख प्रशासकिय अधिकृत
                          </SelectItem>
                          <SelectItem key="अधिकृतस्तर आठौँ">
                            अधिकृतस्तर आठौँ
                          </SelectItem>
                          <SelectItem key="अधिकृतस्तर सातौँ">
                            अधिकृतस्तर सातौँ
                          </SelectItem>
                          <SelectItem key="लेखा अधिकृत">लेखा अधिकृत</SelectItem>
                          <SelectItem key="अधिकृतस्तर छैठौँ">
                            अधिकृतस्तर छैठौँ
                          </SelectItem>
                          <SelectItem key="योजना अधिकृत">
                            योजना अधिकृत
                          </SelectItem>
                          <SelectItem key="सहायकस्तर पाचौँ">
                            सहायकस्तर पाचौँ
                          </SelectItem>
                          <SelectItem key="सहायकस्तर चौथो">
                            सहायकस्तर चौथो
                          </SelectItem>
                        </Select>

                        <Checkbox {...register("isuser")}>
                          <span className="flex items-center text-sm">
                            यदी कर्मचारी सिस्टम प्रयोग कर्ता भएमा (
                            <IoMdCheckmark />) लगाउनुहोस ।
                          </span>
                        </Checkbox>

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
      <div className="flex flex-row items-center justify-between bg-white ">
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
          कर्मचारी विवरण सेटअप
        </h1>
        <div className="flex gap-2">
          <Button
            color="primary"
            startContent={<FaPlus />}
            onClick={() => {
              setEditMember(null)
              reset()
              onOpen()
            }}
          >
            Add Staff
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
            <TableColumn>कर्मचारीको नाम</TableColumn>
            <TableColumn>वरियता क्रम</TableColumn>
            <TableColumn>कर्मचारी पद</TableColumn>
            <TableColumn>System user</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{ConvertToNepaliNumerals(member.ranking)}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.isuser ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="z-10" variant="shadow" size="sm">
                        <MdModeEditOutline />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                      <DropdownItem
                        key="edit"
                        onClick={() => handleEdit(member)} // Handle edit action
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => handleDelete(member.id)} // Handle delete action
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
    </>
  )
}
