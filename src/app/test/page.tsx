"use client"
import React from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react"
import { FaUserAlt } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"

export default function SimpleDropdownNavbar() {
  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...")
  }

  return (
    <Navbar maxWidth="full" className="bg-gray-200">
      <NavbarContent>
        <NavbarMenuToggle className="xl:hidden" />
        <NavbarBrand>
          <span className="font-bold text-black">Simple Navbar</span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden xl:flex" justify="center">
        <NavbarItem>
          <a href="#" className="text-black">
            Home
          </a>
        </NavbarItem>
        <NavbarItem>
          <a href="#" className="text-black">
            About
          </a>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button color="primary" disableRipple>
                Dropdown <FaUserAlt />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onClick={() => console.log("Profile clicked")}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Settings clicked")}>
                Settings
              </DropdownItem>
              <DropdownItem color="danger" onClick={handleLogout}>
                Logout <IoLogOut />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <a href="#" className="text-black">
            Contact
          </a>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
