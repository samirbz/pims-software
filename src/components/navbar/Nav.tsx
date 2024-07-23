"use client"

import React, { useState } from "react"
import {
  Navbar,
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
import { FaAngleDown, FaUserAlt } from "react-icons/fa"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { signOutUser } from "@/actions/authActions"
import { IoLogOut } from "react-icons/io5"
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
          link: "/members/office/staff-details",
        },
        {
          key: "usage_metrics",
          title: " प्रयोग कर्ता",
          link: "/members/office/user-setup",
        },
        {
          key: "Fiscal_year",
          title: "आर्थिक वर्ष",
          link: "/members/office/fiscal-year",
        },
        {
          key: "99_uptime",
          title: "टिप्पणी सदर गर्ने कर्मचारी",
          link: "/members/office/tsk",
        },
      ],
    },
    {
      title: "सेटअप",
      items: [
        {
          key: "item1",
          title: "मुख्य समिति ",
          link: "/members",
        },
        {
          key: "item1",
          title: "अनुदान किसिम",
          link: "/members",
        },
        {
          key: "item1",
          title: "लागत श्रोत",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना प्रकार",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना कार्य विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना छनोट निकाय",
          link: "/members",
        },
        {
          key: "item1",
          title: "गा.पा/नगरपालिका नाम",
          link: "/members",
        },
        {
          key: "item1",
          title: "वडा न",
          link: "/members",
        },
        {
          key: "item1",
          title: "बैंक विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना बजेड बाँडफाड",
          link: "/members",
        },
        {
          key: "item1",
          title: "सुचिकृत फर्म/कम्पनी",
          description: "सुचिकृत फर्म/कम्पनी",
          link: "/members",
        },
        {
          key: "item1",
          title: "सुचना प्रकाशन पत्रपत्रिकाहरु",
          link: "/members",
        },
        {
          key: "item1",
          title: "ल्याप टेष्ट कार्यालय",
          link: "/members",
        },
      ],
    },
    {
      title: "योजना (उ.स/संघ सस्था/व्यक्तिगत (अमनात))",
      items: [
        {
          key: "item1",
          title: "योजना दर्ता",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्झौताको स्वीकृत टिप्पणी",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना सम्झौता",
          link: "/members",
        },
        {
          key: "item1",
          title: "कार्यादेश (उपभोक्ता समिति/सस्था कम्पनी)",
          link: "/members",
        },
        {
          key: "item1",
          title: "बैक खाता सिफारिस",
          link: "/members",
        },
        {
          key: "item1",
          title: "बैक खाता बन्द सिफारिस",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना दर्ता वडा तथा अन्य",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना टिप्पणी आदेश",
          link: "/members",
        },
        {
          key: "item1",
          title: "उपभोक्ता दर्ता प्रमाण पत्र",
          link: "/members",
        },
        {
          key: "item1",
          title: "म्याद थप पत्र / टिप्पणी आदेश",
          link: "/members",
        },
      ],
    },
    {
      title: "योजना (बोलपत्र/दरभाउ पत्र / कोटेशन)",
      items: [
        {
          key: "item1",
          title: "दररेट पेश पत्र",
          link: "/members",
        },
        {
          key: "item1",
          title: " लई स्वीकृत पत्र",
          link: "/members",
        },
        {
          key: "item1",
          title: "बोलपत्र/दरभाउपत्र मुल्याङकन",
          link: "/members",
        },
        {
          key: "item1",
          title: "बोलपत्र/दरभाउ पत्र स्वीकृत ( Bid Bond)",
          link: "/members",
        },
        {
          key: "item1",
          title: "जमानत पत्र Bid Security",
          link: "/members",
        },
        {
          key: "item1",
          title: "ठेक्का मुचुल्का",
          link: "/members",
        },
        {
          key: "item1",
          title: "तुलनात्मक चार्ट (Comparative Chart)",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्झौताको गर्न आउने पत्र",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना दर्ता",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना सम्झौता",
          link: "/members",
        },
        {
          key: "item1",
          title: "कार्यादेश पत्र",
          link: "/members",
        },
        {
          key: "item1",
          title: "टिप्पणी आदेश",
          link: "/members",
        },
        {
          key: "item1",
          title: "म्याद थप / टिप्पणी र पत्र",
          link: "/members",
        },
        {
          key: "item1",
          title: "ल्याब टेष्ट (Lab Testing)",
          link: "/members",
        },
      ],
    },
    {
      title: "अनुगमन माइन्युट तथा प्रतिवेदन",
      items: [
        {
          key: "item1",
          title: "अनुगमन प्रतिवेदन अनुसूची- ३",
          link: "/members",
        },
        {
          key: "item1",
          title: "अनुगमन प्रतिवेदन (सयुक्तरुपमा)",
          link: "/members",
        },
        {
          key: "item1",
          title: "अनुगमन माइन्युट",
          link: "/members",
        },
        {
          key: "item1",
          title: "जासँपास तथा फरफारक समितिको बैठक",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना जासपास",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना हस्तान्तरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "जासँपास तथा फरफारक प्रतिवेदन",
          link: "/members",
        },
        {
          key: "item1",
          title: "अनुगमन गरेको मिति अनुसार प्रतिवेदन",
          link: "/members",
        },
      ],
    },
    {
      title: "योजना प्रतिवेदन",
      items: [
        {
          key: "item1",
          title: "सम्झौता भएका (सबै)",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्झौता भएका ठेक्का निर्माण व्यवसायी",
          link: "/members",
        },
        {
          key: "item1",
          title: "उ.स को लगत विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "समितिका आधार सम्झौता भएका योजना",
          link: "/members",
        },
        {
          key: "item1",
          title: "लागत श्रोतका आधार सम्झौता भएका योजना",
          link: "/members",
        },
        {
          key: "item1",
          title: "प्रकारका आधारमा सम्झौता भएका योजना",
          link: "/members",
        },
        {
          key: "item1",
          title: "बजेट अनुसार योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "वडागतरुपमा सम्झौता भएका योजना",
          link: "/members",
        },
        {
          key: "item1",
          title: "कार्यगत समुहअनुसार सम्झौता भएका योजना",
          link: "/members",
        },
        {
          key: "item1",
          title: "कर कट्टीका आधार योजना विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "पेश्की निकासा भएका योजनाहरु",
          link: "/members",
        },
        {
          key: "item1",
          title: "धरौटी कट्टी विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "अपलोड भएका मध्ये सम्झौता हुन बांकी योजना",
          link: "/members",
        },
        {
          key: "item1",
          title: "संस्था/कम्पनिको भ्याट कट्टी विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "बजेट बाँडफाडमा सहायक योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना प्रकार अनुसार गणना विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्झौता मात्र भएका भुक्तानी नभएका योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "आ.व.मा पेश्की र रनिङ विल निकासा योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्झौता भई भुक्तानी हुन बाँकी योजनाको विवरण",
          link: "/members",
        },
      ],
    },
    {
      title: "प्रगति प्रतिवेदन",
      items: [
        {
          key: "item1",
          title: "योजना प्रगति (सबै हेर्ने",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्पन्न योजना प्रगति (सबै हेर्ने)",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्पन्न योजना प्रगति ( बजेट स्वीकृत)",
          link: "/members",
        },
        {
          key: "item1",
          title: "मुख्य समितिको आधारमा सम्पन्न योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "लागत श्रोतको आधारमा सम्पन्न योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "योजना किसिम अनुसार सम्पन्न योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "शर्शत/निशर्त अनुसार सम्पन्न योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "वडा अनुसार सम्पन्न योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "बजेट अनुसार सम्पन्न योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "अनुगमन प्रतिवेदन",
          link: "/members",
        },
        {
          key: "item1",
          title: "भौतिक प्रगति विवरण १७.२",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्पन्न योजनाको एकिकृत प्रतिवेदन (उ.स. संस्थागत र व्यक्तिगत)",
          link: "/members",
        },
        {
          key: "item1",
          title: "सम्पन्न योजनाको एकिकृत प्रतिवेदन (ठेक्का)",
          link: "/members",
        },
        {
          key: "item1",
          title: "उपभोक्ता समितिबाट सम्पन्न योजनाको विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "ठेक्का पट्टा कन्टेन्जेन्सी विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "उपभोक्ता समिति कन्टेन्जेन्सी विवरण",
          link: "/members",
        },
        {
          key: "item1",
          title: "कर कट्टी तथा जरिवाना लागेका योजना विवरण",
          link: "/members",
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          key: "item1",
          title: "Upload Excel Files",
          link: "/members",
        },
        {
          key: "item1",
          title: "Daily Data Backup",
          link: "/members",
        },
        {
          key: "item1",
          title: "Online Service Anydesk",
          link: "/members",
        },
        {
          key: "item1",
          title: "PDF Files",
          link: "/members",
        },
      ],
    },
  ]

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-gradient-to-b from-blue-600 to-blue-500 sm:h-12"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="xl:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden gap-4 xl:flex" justify="center">
        {menuConfig.map((menu) => (
          <Dropdown
            className="mb-4 bg-gray-100 "
            key={menu.title}
            isOpen={hoveredMenu === menu.title}
          >
            <NavbarItem
              onMouseEnter={() => handleMouseEnter(menu.title)}
              onMouseLeave={handleMouseLeave}
            >
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="bg-transparent p-0 text-lg text-white data-[hover=true]:bg-transparent"
                  endContent={<FaAngleDown />}
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
                className="w-auto"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {menu.items.map((item) => (
                  <DropdownItem
                    onMouseEnter={() => handleMouseEnter(menu.title)}
                    onMouseLeave={handleMouseLeave}
                    key={item.key}
                    // description={item.description}
                    // startContent={item.icon}
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
        <Link
          href="/"
          className="rounded-md p-1 text-lg font-semibold text-gray-200 hover:text-gray-300"
        >
          Switch fiscal year
        </Link>
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
                    endContent={<FaAngleDown />}
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
                  className="max-h-[300px] w-[340px] overflow-y-auto"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {menu.items.map((item) => (
                    <DropdownItem key={item.key}>
                      <a href={item.link}>{item.title}</a>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </Dropdown>
          </NavbarMenuItem>
        ))}
        <Link href="/">Switch fiscal year</Link>
      </NavbarMenu>
    </Navbar>
  )
}
