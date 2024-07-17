import { CiFolderOn, CiHome, CiSettings } from "react-icons/ci"
import { SideNavItem } from "./types"
import { FaRegMessage } from "react-icons/fa6"
import { IoIosHelpCircleOutline } from "react-icons/io"

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <CiHome width="24" height="24" />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <CiFolderOn width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "All", path: "/projects" },
      { title: "Web Design", path: "/projects/web-design" },
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaRegMessage width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <CiSettings width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Help",
    path: "/help",
    icon: <IoIosHelpCircleOutline width="24" height="24" />,
  },
]
