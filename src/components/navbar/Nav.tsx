"use client"

import React, { useState } from "react"
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
import { signOutUser } from "@/actions/authActions"
import { IoLogOut } from "react-icons/io5"
import Image from "next/image"
import { ChevronDown, Activity, Flash, Server, Scale } from "./Icons.jsx"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  user: Session["user"]
}

export default function Nav({ user }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const router = useRouter()

  const handleMouseEnter = (menuTitle: string) => {
    setHoveredMenu(menuTitle)
  }

  const handleMouseLeave = () => {
    setHoveredMenu(null)
  }

  const menuConfig = [
    {
      title: "कार्यालय",
      items: [
        {
          key: "member",
          title: "कर्मचारी विवरण",
          description: "Staff Details",
          icon: (
            <Scale
              className="text-warning"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
          link: "/members/office/staff-details",
        },
        {
          key: "usage_metrics",
          title: " प्रयोग कर्ता",
          description: "User Setup",
          icon: (
            <Activity
              className="text-secondary"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
          link: "/members/office/user-setup",
        },
        {
          key: "Fiscal_year",
          title: "आर्थिक वर्ष",
          description: "Fiscal Year",
          icon: (
            <Flash
              className="text-primary"
              fill="currentColor"
              size={30}
              height={30}
              width={30}
            />
          ),
          link: "/members/office/fiscal-year",
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
          link: "/members",
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
          link: "/members",
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
          link: "/members",
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
          link: "/members",
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
          link: "/members",
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
          link: "/members",
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
          link: "/members",
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
          link: "/members",
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
          link: "/members",
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
          <Dropdown key={menu.title} isOpen={hoveredMenu === menu.title}>
            <NavbarItem
              onMouseEnter={() => handleMouseEnter(menu.title)}
              onMouseLeave={handleMouseLeave}
            >
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
                    onMouseEnter={() => handleMouseEnter(menu.title)}
                    onMouseLeave={handleMouseLeave}
                    key={item.key}
                    description={item.description}
                    startContent={item.icon}
                    onPress={() => {
                      router.push(item.link ?? "/")
                      router.refresh()
                    }}
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
            base: "before:bg-default-200",
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

              <DropdownItem key="settings" href="/members/settings">
                Settings
              </DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem
                key="logout"
                className="flex items-center gap-2 font-semibold"
                onPress={async () => signOutUser()}
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
                    >
                      <a href={item.link}>{item.title}</a>
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
