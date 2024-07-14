"use client"

import React from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react"
import { Session } from "next-auth"
import { FaUserAlt } from "react-icons/fa"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { signOutUser } from "@/app/actions/authActions"
import { IoLogOut } from "react-icons/io5"
import Image from "next/image"
import Link from "next/link"
import { BsPlusLg } from "react-icons/bs"

type Props = {
  user: Session["user"]
}

export default function AdminNav({ user }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuItems = [
    "कार्यालय",
    "सेटअप",
    "योजना (उ.स/संघ सस्था/व्यक्तिगत (अमनात))",
    "योजना (बोलपत्र/दरभाउ पत्र / कोटेशन)",
    "अनुगमन माइन्युट तथा प्रतिवेदन ",
    "योजना प्रतिवेदन ",
    "प्रगति प्रतिवेदन",
    "Tools",
    "Switch Fiscal Year",
  ]

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-gray-200 "
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="xl:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex gap-2 text-black">
            <Image
              src="/images/pims-logo.png"
              className="h-auto max-w-full"
              width={18}
              height={18}
              alt="PIMS"
            />
            <p className="font-bold text-inherit">PIMS</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 xl:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            कार्यालय
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            सेटअप
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            योजना (उ.स/संघ सस्था/व्यक्तिगत (अमनात))
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            योजना (बोलपत्र/दरभाउ पत्र / कोटेशन)
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            अनुगमन माइन्युट तथा प्रतिवेदन
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            योजना प्रतिवेदन
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            प्रगति प्रतिवेदन
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Tools
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Switch Fiscal Year
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown
          showArrow
          radius="sm"
          classNames={{
            base: "before:bg-default-200", // change arrow background
            content: "p-0 border-small border-divider bg-background",
          }}
        >
          <DropdownTrigger>
            <Button variant="light" disableRipple>
              <span className="text-gray-600">
                <FaUserAlt />
              </span>
              <span className=" uppercase">{user?.name?.split(" ")[0]}</span>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            disabledKeys={["profile"]}
            className="p-3"
            itemClasses={{
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            <DropdownSection aria-label="Profile & Actions" showDivider>
              <DropdownItem
                isReadOnly
                key="profile"
                className="h-14 gap-2 opacity-100"
              >
                <User
                  name={user?.name}
                  description={user?.email}
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: "/images/user.png",
                  }}
                />
              </DropdownItem>

              {user?.email === "admin" && (
                <DropdownItem key="dashboard">
                  <Link className="text-black" href="/members/dashboard">
                    Admin Dashboard
                  </Link>
                </DropdownItem>
              )}
              {user?.email === "admin" && (
                <DropdownItem key="create-user" endContent={<BsPlusLg />}>
                  <Link href="/members/register" className="text-gray-600">
                    Create User
                  </Link>
                </DropdownItem>
              )}

              <DropdownItem key="settings">
                <Link className="text-black" href="/members/settings">
                  Settings
                </Link>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem key="logout">
                <p
                  className="flex items-center gap-2 font-semibold"
                  onClick={async () => signOutUser()}
                >
                  <IoLogOut />
                  Log Out
                </p>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="mt-[6.4rem]">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
