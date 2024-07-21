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
          title: "मुख्य समिति ",
          description: "मुख्य समिति ",
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
        {
          key: "item1",
          title: "अनुदान किसिम",
          description: "अनुदान किसिम",
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
        {
          key: "item1",
          title: "लागत श्रोत",
          description: "लागत श्रोत",
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
        {
          key: "item1",
          title: "योजना प्रकार",
          description: "योजना प्रकार",
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
        {
          key: "item1",
          title: "योजना कार्य विवरण",
          description: "योजना कार्य विवरण",
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
        {
          key: "item1",
          title: "योजना छनोट निकाय",
          description: "योजना छनोट निकाय",
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
        {
          key: "item1",
          title: "गा.पा/नगरपालिका नाम",
          description: "गा.पा/नगरपालिका नाम",
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
        {
          key: "item1",
          title: "वडा न",
          description: "वडा न",
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
        {
          key: "item1",
          title: "बैंक विवरण",
          description: "बैंक विवरण",
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
        {
          key: "item1",
          title: "योजना बजेड बाँडफाड",
          description: "योजना बजेड बाँडफाड",
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
        {
          key: "item1",
          title: "सुचिकृत फर्म/कम्पनी",
          description: "सुचिकृत फर्म/कम्पनी",
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
        {
          key: "item1",
          title: "सुचना प्रकाशन पत्रपत्रिकाहरु",
          description: "सुचना प्रकाशन पत्रपत्रिकाहरु",
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
        {
          key: "item1",
          title: "ल्याप टेष्ट कार्यालय",
          description: "ल्याप टेष्ट कार्यालय",
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
          title: "योजना दर्ता",
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
        {
          key: "item1",
          title: "सम्झौताको स्वीकृत टिप्पणी",
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
        {
          key: "item1",
          title: "योजना सम्झौता",
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
        {
          key: "item1",
          title: "कार्यादेश (उपभोक्ता समिति/सस्था कम्पनी)",
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
        {
          key: "item1",
          title: "बैक खाता सिफारिस",
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
        {
          key: "item1",
          title: "बैक खाता बन्द सिफारिस",
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
        {
          key: "item1",
          title: "योजना दर्ता वडा तथा अन्य",
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
        {
          key: "item1",
          title: "योजना टिप्पणी आदेश",
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
        {
          key: "item1",
          title: "उपभोक्ता दर्ता प्रमाण पत्र",
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
        {
          key: "item1",
          title: "म्याद थप पत्र / टिप्पणी आदेश",
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
          title: "दररेट पेश पत्र",
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
        {
          key: "item1",
          title: " लई स्वीकृत पत्र",
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
        {
          key: "item1",
          title: "बोलपत्र/दरभाउपत्र मुल्याङकन",
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
        {
          key: "item1",
          title: "बोलपत्र/दरभाउ पत्र स्वीकृत ( Bid Bond)",
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
        {
          key: "item1",
          title: "जमानत पत्र Bid Security",
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
        {
          key: "item1",
          title: "ठेक्का मुचुल्का",
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
        {
          key: "item1",
          title: "तुलनात्मक चार्ट (Comparative Chart)",
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
        {
          key: "item1",
          title: "सम्झौताको गर्न आउने पत्र",
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
        {
          key: "item1",
          title: "योजना दर्ता",
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
        {
          key: "item1",
          title: "योजना सम्झौता",
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
        {
          key: "item1",
          title: "कार्यादेश पत्र",
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
        {
          key: "item1",
          title: "टिप्पणी आदेश",
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
        {
          key: "item1",
          title: "म्याद थप / टिप्पणी र पत्र",
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
        {
          key: "item1",
          title: "ल्याब टेष्ट (Lab Testing)",
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
          title: "अनुगमन प्रतिवेदन अनुसूची- ३",
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
        {
          key: "item1",
          title: "अनुगमन प्रतिवेदन (सयुक्तरुपमा)",
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
        {
          key: "item1",
          title: "अनुगमन माइन्युट",
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
        {
          key: "item1",
          title: "जासँपास तथा फरफारक समितिको बैठक",
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
        {
          key: "item1",
          title: "योजना जासपास",
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
        {
          key: "item1",
          title: "योजना हस्तान्तरण",
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
        {
          key: "item1",
          title: "जासँपास तथा फरफारक प्रतिवेदन",
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
        {
          key: "item1",
          title: "अनुगमन गरेको मिति अनुसार प्रतिवेदन",
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
          title: "सम्झौता भएका (सबै)",
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
        {
          key: "item1",
          title: "सम्झौता भएका ठेक्का निर्माण व्यवसायी",
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
        {
          key: "item1",
          title: "उ.स को लगत विवरण",
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
        {
          key: "item1",
          title: "समितिका आधार सम्झौता भएका योजना",
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
        {
          key: "item1",
          title: "लागत श्रोतका आधार सम्झौता भएका योजना",
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
        {
          key: "item1",
          title: "प्रकारका आधारमा सम्झौता भएका योजना",
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
        {
          key: "item1",
          title: "बजेट अनुसार योजनाको विवरण",
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
        {
          key: "item1",
          title: "वडागतरुपमा सम्झौता भएका योजना",
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
        {
          key: "item1",
          title: "कार्यगत समुहअनुसार सम्झौता भएका योजना",
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
        {
          key: "item1",
          title: "कर कट्टीका आधार योजना विवरण",
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
        {
          key: "item1",
          title: "पेश्की निकासा भएका योजनाहरु",
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
        {
          key: "item1",
          title: "धरौटी कट्टी विवरण",
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
        {
          key: "item1",
          title: "अपलोड भएका मध्ये सम्झौता हुन बांकी योजना",
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
        {
          key: "item1",
          title: "संस्था/कम्पनिको भ्याट कट्टी विवरण",
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
        {
          key: "item1",
          title: "बजेट बाँडफाडमा सहायक योजनाको विवरण",
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
        {
          key: "item1",
          title: "योजना प्रकार अनुसार गणना विवरण",
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
        {
          key: "item1",
          title: "सम्झौता मात्र भएका भुक्तानी नभएका योजनाको विवरण",
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
        {
          key: "item1",
          title: "आ.व.मा पेश्की र रनिङ विल निकासा योजनाको विवरण",
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
        {
          key: "item1",
          title: "सम्झौता भई भुक्तानी हुन बाँकी योजनाको विवरण",
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
          title: "योजना प्रगति (सबै हेर्ने",
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
        {
          key: "item1",
          title: "सम्पन्न योजना प्रगति (सबै हेर्ने)",
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
        {
          key: "item1",
          title: "सम्पन्न योजना प्रगति ( बजेट स्वीकृत)",
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
        {
          key: "item1",
          title: "मुख्य समितिको आधारमा सम्पन्न योजनाको विवरण",
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
        {
          key: "item1",
          title: "लागत श्रोतको आधारमा सम्पन्न योजनाको विवरण",
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
        {
          key: "item1",
          title: "योजना किसिम अनुसार सम्पन्न योजनाको विवरण",
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
        {
          key: "item1",
          title: "शर्शत/निशर्त अनुसार सम्पन्न योजनाको विवरण",
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
        {
          key: "item1",
          title: "वडा अनुसार सम्पन्न योजनाको विवरण",
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
        {
          key: "item1",
          title: "बजेट अनुसार सम्पन्न योजनाको विवरण",
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
        {
          key: "item1",
          title: "अनुगमन प्रतिवेदन",
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
        {
          key: "item1",
          title: "भौतिक प्रगति विवरण १७.२",
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
        {
          key: "item1",
          title: "सम्पन्न योजनाको एकिकृत प्रतिवेदन (उ.स. संस्थागत र व्यक्तिगत)",
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
        {
          key: "item1",
          title: "सम्पन्न योजनाको एकिकृत प्रतिवेदन (ठेक्का)",
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
        {
          key: "item1",
          title: "उपभोक्ता समितिबाट सम्पन्न योजनाको विवरण",
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
        {
          key: "item1",
          title: "ठेक्का पट्टा कन्टेन्जेन्सी विवरण",
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
        {
          key: "item1",
          title: "उपभोक्ता समिति कन्टेन्जेन्सी विवरण",
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
        {
          key: "item1",
          title: "कर कट्टी तथा जरिवाना लागेका योजना विवरण",
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
          title: "Upload Excel Files",
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
        {
          key: "item1",
          title: "Daily Data Backup",
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
        {
          key: "item1",
          title: "Online Service Anydesk",
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
        {
          key: "item1",
          title: "PDF Files",
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
        <Link href="/" className="rounded-md p-1 hover:bg-gray-300">
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
                  className="max-h-[300px] w-[340px] overflow-y-auto"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {menu.items.map((item) => (
                    <DropdownItem
                      key={item.key}
                      // description={item.description}
                      // startContent={item.icon}
                    >
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
