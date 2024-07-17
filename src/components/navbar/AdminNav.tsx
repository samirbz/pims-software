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
import { BsPlusLg } from "react-icons/bs"
import { ChevronDown, Activity, Flash, Server, Scale } from "./Icons.jsx"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  user: Session["user"]
}

export default function AdminNav({ user }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const router = useRouter()

  const menuConfig = [
    {
      title: "कार्यालय",
      items: [
        {
          key: "member",
          title: "कर्मचारी विवरण",
          description: "कर्मचारी विवरण",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
          link: "/members/admin",
        },
        {
          key: "usage_metrics",
          title: " प्रयोग कर्ता",
          description: " प्रयोग कर्ता",
          icon: (
            <Activity
              className="text-secondary"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
        {
          key: "Fiscal_year",
          title: "आर्थिक वर्ष",
          description: "आर्थिक वर्ष",
          icon: (
            <Flash
              className="text-primary"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
        {
          key: "99_uptime",
          title: "टिप्पणी सदर गर्ने कर्मचारी",
          description: " टिप्पणी सदर गर्ने कर्मचारी",
          icon: (
            <Server
              className="text-success"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
    {
      title: "सेटअप",
      items: [
        {
          key: "item1",
          title: "item",
          description: "item description",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
    {
      title: "योजना (उ.स/संघ सस्था/व्यक्तिगत (अमनात))",
      items: [
        {
          key: "item1",
          title: "item",
          description: "item description",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
    {
      title: "योजना (बोलपत्र/दरभाउ पत्र / कोटेशन)",
      items: [
        {
          key: "item1",
          title: "item",
          description: "item description",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
    {
      title: "अनुगमन माइन्युट तथा प्रतिवेदन",
      items: [
        {
          key: "item1",
          title: "item",
          description: "item description",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
    {
      title: "योजना प्रतिवेदन",
      items: [
        {
          key: "item1",
          title: "item",
          description: "item description",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
    {
      title: "प्रगति प्रतिवेदन",
      items: [
        {
          key: "item1",
          title: "item",
          description: "item description",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          key: "item1",
          title: "item",
          description: "item description",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
    {
      title: "Switch Fiscal Year",
      items: [
        {
          key: "item1",
          title: "item",
          description: "item description",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
        },
      ],
    },
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
              unoptimized
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
        {menuConfig.map((menu) => (
          <Dropdown key={menu.title}>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                  endContent={
                    <ChevronDown
                      fill="currentColor"
                      size={16}
                      height={16}
                      width={16}
                    />
                  }
                  radius="sm"
                  variant="light"
                >
                  {menu.title}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            {menu.items.length > 0 && (
              <DropdownMenu
                aria-label={menu.title}
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {menu.items.map((item) => (
                  <DropdownItem
                    key={item.key}
                    description={item.description}
                    startContent={item.icon}
                    onClick={() => router.push(item.link ?? "/")}
                  >
                    {item.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </Dropdown>
        ))}
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

              <DropdownItem key="admin" href="/members/admin">
                Admin Dashboard
              </DropdownItem>
              <DropdownItem
                key="create-user"
                href="/members/register"
                endContent={<BsPlusLg />}
              >
                Create User
              </DropdownItem>

              <DropdownItem key="settings" href="/members/settings">
                Settings
              </DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem
                key="logout"
                className="flex items-center gap-2 font-semibold"
                onClick={async () => signOutUser()}
                endContent={<IoLogOut />}
              >
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="mt-20">
        {menuConfig.map((menu, index) => (
          <NavbarMenuItem key={`${menu.title}-${index}`}>
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                    endContent={
                      <ChevronDown
                        fill="currentColor"
                        size={16}
                        height={16}
                        width={16}
                      />
                    }
                    radius="sm"
                    variant="light"
                  >
                    {menu.title}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              {menu.items.length > 0 && (
                <DropdownMenu
                  aria-label={menu.title}
                  className="w-[340px]"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {menu.items.map((item) => (
                    <DropdownItem
                      key={item.key}
                      description={item.description}
                      startContent={item.icon}
                      onClick={() => router.push(item.link ?? "/")}
                    >
                      {item.title}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </Dropdown>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
