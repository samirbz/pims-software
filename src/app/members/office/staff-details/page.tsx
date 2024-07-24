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
  Checkbox,
} from "@nextui-org/react"
import { getStaff } from "@/actions/memberActions"
import { deleteStaff } from "@/actions/userActions"
import { FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"
import { MdModeEditOutline } from "react-icons/md"
import { staffRegister } from "@/actions/authActions"
import { useForm } from "react-hook-form"
import { IoIosSave, IoMdCheckmark } from "react-icons/io"
import { StaffRegisterSchema } from "@/lib/schemas/staffRegisterSchema"

interface Member {
  id: string
  name: string
  ranking: string
  position: string
  isUser: boolean
}

export default function StaffDetailPage() {
  const {
    isOpen: isDeleteConfirmationOpen,
    onOpen: onDeleteConfirmationOpen,
    onOpenChange: onDeleteConfirmationOpenChange,
  } = useDisclosure()

  const [members, setMembers] = useState([])
  const [deleteUserId, setDeleteUserId] = useState("")

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

  const confirmDeleteUser = async () => {
    try {
      const result = await deleteStaff(deleteUserId)
      if (result.status === "success") {
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
      window.location.reload()
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
            className="w-[96%] min-w-[40rem] border-collapse border sm:w-full"
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
              <TableColumn
                key="snum"
                className="sticky top-0 z-50  bg-purple-400 px-4 py-2 text-black"
              >
                सि.न.
              </TableColumn>
              <TableColumn
                key="name"
                className="sticky top-0 z-50  bg-purple-400 px-4 py-2 text-black"
              >
                कर्मचारीको नाम
              </TableColumn>
              <TableColumn
                key="position"
                className="sticky top-0 z-50  bg-purple-400 px-4 py-2 text-black"
              >
                पद{" "}
              </TableColumn>
              <TableColumn
                key="ranking"
                className="sticky top-0 z-50  bg-purple-400 px-4 py-2 text-black"
              >
                वरियता क्रम
              </TableColumn>
              <TableColumn
                key="edit"
                className="sticky top-0 z-50  bg-purple-400 px-4 py-2 text-black"
              >
                EDIT
              </TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item: Member) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell className="border">
                      {columnKey === "edit" ? (
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="shadow" size="sm">
                              <MdModeEditOutline />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              De-activate
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
