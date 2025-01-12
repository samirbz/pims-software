"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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
} from "@nextui-org/react";
import { FaRegSave } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import "nepali-datepicker-reactjs/dist/index.css";

import {
  savewadaNum,
  fetchWadaNumData,
  deleteWadaNum,
  editWadaNum,
} from "@/actions/formAction";
import { ConvertToNepaliNumerals } from "@/lib/util";
import { useMyContext } from "@/context/MyContext";

// Utility functions
const englishToNepali = (englishNum: string): string => {
  const nepaliDigits = "०१२३४५६७८९";
  const englishDigits = "0123456789";

  return englishNum
    .split("")
    .map((char) => {
      const index = englishDigits.indexOf(char);
      return index !== -1 ? nepaliDigits[index] : char;
    })
    .join("");
};

const nepaliToEnglish = (nepaliNum: string): string => {
  const nepaliDigits = "०१२३४५६७८९";
  const englishDigits = "0123456789";

  return nepaliNum
    .split("")
    .map((char) => {
      const index = nepaliDigits.indexOf(char);
      return index !== -1 ? englishDigits[index] : char;
    })
    .join("");
};

const isValidNumber = (value: string): boolean => {
  const allowedCharacters = /^[०-९0-9]*$/; // Nepali (०-९) and English (0-9) digits
  return allowedCharacters.test(value);
};

export default function Wada() {
  // State management
  const [displayValue, setDisplayValue] = useState(""); // To show Nepali numbers
  const [savedValue, setSavedValue] = useState(""); // To save English numbers
  const [wadaNum, setWadaNum] = useState("");
  const [wadaNumData, setWadaNumData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [btnDisable, setBtnDisable] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const rowsPerPage = 7;
  const { value } = useMyContext();

  // Memoized data for pagination
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return wadaNumData.slice(start, end);
  }, [page, wadaNumData]);

  const pages = Math.ceil(wadaNumData.length / rowsPerPage);

  // Fetch Wada data
 // Memoized fetchWadaNum function
 const fetchWadaNum = useCallback(async () => {
  try {
    setLoading(true);
    const data = await fetchWadaNumData(value || "");
    setWadaNumData(data);
  } catch (error) {
    console.error("Error fetching wada numbers:", error);
    toast.error("Failed to fetch data");
  } finally {
    setLoading(false);
  }
}, [value]);

// Fetch data on component mount or when 'value' changes
useEffect(() => {
  fetchWadaNum();
}, [fetchWadaNum]);

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (isValidNumber(input)) {
      const englishValue = nepaliToEnglish(input);
      const nepaliValue = englishToNepali(englishValue);

      setDisplayValue(nepaliValue);
      setSavedValue(englishValue);
      setWadaNum(englishValue);
    }
  };

  // Reset form states
  const resetStates = () => {
    setWadaNum("");
    setDisplayValue("");
    setSavedValue("");
    setEditMode(false);
    setEditId(null);
  };

  // Save or update Wada number
  const onSubmit = async () => {
    setBtnDisable(true);
    const trimmedName = savedValue.trim();

    if (!trimmedName) {
      toast.error("Wada number cannot be empty");
      setBtnDisable(false);
      return;
    }

    try {
      if (editMode && editId) {
        const exists = wadaNumData.some(
          (data) => data.wadaNum === trimmedName && data.id !== editId
        );

        if (exists) {
          toast.error("Item already exists");
          return;
        }

        const result = await editWadaNum(editId, trimmedName, value || "");
        if (result.status === "success") {
          toast.success("Wada number updated successfully");
          resetStates();
          fetchWadaNum();
        } else {
          toast.error("Failed to update wada number");
        }
      } else {
        const exists = wadaNumData.some((data) => data.wadaNum === trimmedName);

        if (exists) {
          toast.error("Item already exists");
        } else {
          const result = await savewadaNum(trimmedName, value || "");
          if (result.status === "success") {
            toast.success("Wada number saved successfully");
            resetStates();
            fetchWadaNum();
          } else {
            toast.error("Failed to save wada number");
          }
        }
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("An error occurred");
    } finally {
      setBtnDisable(false);
    }
  };

  // Edit handler
  const handleEdit = (item: any) => {
    setDisplayValue(englishToNepali(item.wadaNum));
    setSavedValue(item.wadaNum);
    setWadaNum(item.wadaNum);
    setEditId(item.id);
    setEditMode(true);
  };

  // Cancel edit handler
  const cancelEdit = () => resetStates();

  // Delete handler
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        const result = await deleteWadaNum(deleteId, value || "");
        if (result.status === "success") {
          toast.success("Deleted successfully");
          fetchWadaNum();
        } else {
          toast.error("Failed to delete wada number");
        }
      } catch (error) {
        console.error("Error deleting wada number:", error);
        toast.error("An error occurred while deleting");
      } finally {
        setIsModalOpen(false);
        setDeleteId(null);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
        <h1 className="form-title text-xl font-semibold sm:text-2xl">
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
            isDisabled={!wadaNum.trim() || btnDisable}
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
            aria-label="Wada number table"
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
                  onChange={(p) => setPage(p)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>सि.न.</TableColumn>
              <TableColumn>वडा न.</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    {ConvertToNepaliNumerals(item.wadaNum)}
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className="z-10"
                          variant="shadow"
                          size="sm"
                          startContent={<MdModeEditOutline />}
                        />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Actions">
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
          <ModalBody>Are you sure you want to delete this item?</ModalBody>
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
  );
}
