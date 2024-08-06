"use client"
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { getSessionDetail, signOutUser } from "@/actions/authActions"

interface Userd {
  name: string
  email: string
}

export default function AccountButton() {
  const [userd, setUserd] = useState<Userd | null>(null)

  const fetchUserData = async () => {
    const userData: any = await getSessionDetail()
    setUserd(userData)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
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
          <span className=" uppercase">{userd?.name?.split(" ")[0]}</span>
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
              name={userd?.name}
              description={userd?.email}
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
  )
}
