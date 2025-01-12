"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { FaRegSave } from "react-icons/fa"
import "nepali-datepicker-reactjs/dist/index.css"
import { MdModeEditOutline } from "react-icons/md"

import {
  savewadaNum,
  fetchWadaNumData,
  deleteWadaNum,
  editWadaNum,
} from "@/actions/formAction"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ConvertToNepaliNumerals } from "@/lib/util"
import { useMyContext } from "@/context/MyContext"

const englishToNepali = (englishNum:any) => {
  const nepaliDigits = "०१२३४५६७८९";
  const englishDigits = "0123456789";

  return englishNum
    .split("")
    .map((char:any) => {
      const index = englishDigits.indexOf(char);
      return index !== -1 ? nepaliDigits[index] : char;
    })
    .join("");
};

const nepaliToEnglish = (nepaliNum:any) => {
  const nepaliDigits = "०१२३४५६७८९";
  const englishDigits = "0123456789";

  return nepaliNum
    .split("")
    .map((char:any) => {
      const index = nepaliDigits.indexOf(char);
      return index !== -1 ? englishDigits[index] : char;
    })
    .join("");
};

const isValidNumber = (value:any) => {
  const allowedCharacters = /^[०-९0-9]*$/; // Nepali (०-९) and English (0-9) digits
  return allowedCharacters.test(value);
};


export default function Wada() {
  const [wadaNum, setWadaNum] = useState("")
  const [wadaNumData, setWadaNumData] = useState<any[]>([])

  const [displayValue, setDisplayValue] = useState(""); // To show Nepali numbers
  const [savedValue, setSavedValue] = useState(""); // To save English numbers

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [btnDisable, setBtnDisable] = useState(false)

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const pages = Math.ceil(wadaNumData.length / rowsPerPage)
  const { value } = useMyContext()
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return wadaNumData.slice(start, end)
  }, [page, wadaNumData])

  const fetchWadaNum = async () => {
    try {
      setLoading(true)
      const data = await fetchWadaNumData(value || "")
      setWadaNumData(data)
    } catch (error) {
      console.error("Error fetching fiscal years:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
  
    if (isValidNumber(input)) {
      // Convert to English for saving
      const englishValue = nepaliToEnglish(input);
  
      // Convert to Nepali for display
      const nepaliValue = englishToNepali(englishValue);
  
      setDisplayValue(nepaliValue); // Display Nepali numbers
      setSavedValue(englishValue); // Save English numbers
      setWadaNum(englishValue); // Update wadaNum with English numbers for saving
    }
  };
  
  const onSubmit = async () => {
    setBtnDisable(true);
  
    // Use the English value (savedValue) for saving
    const trimmedName = savedValue.trimEnd();
  
    // Check if the item exists only when not in edit mode
    const result = wadaNumData.some((data) => data.wadaNum === trimmedName);
  
    if (editMode && editId) {
      const existsInOtherItems = wadaNumData.some(
        (data) => data.wadaNum === trimmedName && data.id !== editId
      );
  
      if (existsInOtherItems) {
        toast.error("Item already exists");
        setBtnDisable(false);
        return;
      }
  
      const result = await editWadaNum(editId, trimmedName, value || "");
      if (result.status === "success") {
        setWadaNum("");
        setSavedValue("");
        setDisplayValue("");
        setEditMode(false);
        setEditId(null);
        fetchWadaNum();
      } else {
        console.error("Error occurred during edit");
      }
    } else {
      if (result) {
        toast.error("Item already exists");
      } else {
        const result = await savewadaNum(trimmedName, value || "");
        if (result.status === "success") {
          setWadaNum("");
          setSavedValue("");
          setDisplayValue("");
          fetchWadaNum();
        } else {
          console.error("Error occurred during save");
        }
      }
    }
  
    setBtnDisable(false);
  };
  

  const handleEdit = (item: any) => {
    setWadaNum(item.wadaNum)
    setEditId(item.id)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setWadaNum("")
    setEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    const fetchWadaNum = async () => {
      try {
        setLoading(true)
        const data = await fetchWadaNumData(value || "")
        setWadaNumData(data)
      } catch (error) {
        console.error("Error fetching fiscal years:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWadaNum()
  }, [value])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteWadaNum(deleteId, value || "")
      if (result.status === "success") {
        // Fetch the updated list of fiscal years
        fetchWadaNum()
      } else {
        console.error("Delete unsuccessful")
      }
      setIsModalOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between bg-white ">
        <h1 className="form-title text-xl font-semibold sm:text-2xl ">
          वडा सेटअप
        </h1>
        <br />
        <div className="flex w-full gap-2">
          <Input
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            placeholder="वडा न."
          />
          <Button
            color="secondary"
            startContent={<FaRegSave />}
            onClick={onSubmit}
            isDisabled={!wadaNum.trimEnd() || btnDisable}
          >
            {editMode ? "Edit" : "Save"}
          </Button>
          {editMode && (
            <Button color="default" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
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
              <TableColumn>वडा न.</TableColumn>
              <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{ConvertToNepaliNumerals(item.wadaNum)}</TableCell>
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
                        <DropdownItem onPress={() => handleEdit(item)}>
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onPress={() => confirmDelete(item.id)}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
