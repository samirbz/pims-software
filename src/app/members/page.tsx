"use client"
import React, { useEffect, useState } from "react"
import {
  TeamOutlined,
  UserOutlined,
  PinterestOutlined,
  ApartmentOutlined,
  BankOutlined,
  CalendarOutlined,
  SketchOutlined,
  CopyOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Breadcrumb, Layout, Menu, theme } from "antd"
import Image from "next/image"
import { getSessionDetail } from "@/actions/authActions"

import StaffDetailPage from "@/components/menuItems/office/StaffDetails"
import UserSetup from "@/components/menuItems/office/UserSetup"
import FiscalYearPage from "@/components/menuItems/office/FiscalYear"
import TskPage from "@/components/menuItems/office/Tsk"
import Dashboard from "@/components/menuItems/Dashboard"
import BSDateDisplay from "@/components/BSDateDisplay"
import AccountButton from "@/components/AccountButton"
import MukhyaSamiti from "@/components/menuItems/setup/mukhyaSamiti"
import AnudanKisim from "@/components/menuItems/setup/anudanKisim"
import YojanaPrakar from "@/components/menuItems/setup/yojanaPrakar"
import YojanaKaryaBivaran from "@/components/menuItems/setup/yojanaKaryaBivaran"
import YojanaChanotNikaya from "@/components/menuItems/setup/yojanaChanotNikaya"
import Gapa from "@/components/menuItems/setup/gapa"
import Wada from "@/components/menuItems/setup/wadaNum"
import BankBivaran from "@/components/menuItems/setup/bankBivaran"
import YojanaBudget from "@/components/menuItems/setup/yojanaBudget"
import SuchikritForm from "@/components/menuItems/setup/suchikritForm"
import SuchanaPrakasan from "@/components/menuItems/setup/suchanaPrakasan"
import LabTest from "@/components/menuItems/setup/labTest"
import LagatSrot from "@/components/menuItems/setup/lagatSrot"
import YojanaDarta from "@/components/menuItems/yojana-sastha/yojanaDarta"
import SamjhautaSwikriti from "@/components/menuItems/yojana-sastha/samjhautaSwikriti"
import YojanaSamjhauta from "@/components/menuItems/yojana-sastha/yojanaSamjhauta"
import Karyadesh from "@/components/menuItems/yojana-sastha/karyadesh"
import BankKhataSifaris from "@/components/menuItems/yojana-sastha/bankKhataSifaris"
import BankKhataBanda from "@/components/menuItems/yojana-sastha/bankKhataBanda"
import YojanaDartaWoda from "@/components/menuItems/yojana-sastha/yojanaDartaWoda"
import UpvoktaDarta from "@/components/menuItems/yojana-sastha/upvoktaDarta"
import MyadThapPatra from "@/components/menuItems/yojana-sastha/myadThapPatra"
import PeskiVuktani from "@/components/menuItems/yojana-sastha/yojanaTippani/peskiVuktani"
import RunningBilVuktani from "@/components/menuItems/yojana-sastha/yojanaTippani/runningBilVuktani"
import AntimKistaFarFarak from "@/components/menuItems/yojana-sastha/yojanaTippani/antimKistaFarFarak"
import SansthagatAnudan from "@/components/menuItems/yojana-sastha/yojanaTippani/sansthagatAnudan"
import VuktaniKarobar from "@/components/menuItems/yojana-sastha/yojanaTippani/vuktaniKarobar"
import DarRatePeshPatra from "@/components/menuItems/yojana-bolpatra/darRatePeshPatra"
import LayiSwikritiPatra from "@/components/menuItems/yojana-bolpatra/layiSwikritiPatra"
import BolpatraDarvauSwikriti from "@/components/menuItems/yojana-bolpatra/bolpatraDarvauSwikriti"
import BolpatraBolbhauMulyankan from "@/components/menuItems/yojana-bolpatra/bolpatraBolbhauMulyankan"
import JamanatPatra from "@/components/menuItems/yojana-bolpatra/jamanatPatra"
import ThekkaMuchulka from "@/components/menuItems/yojana-bolpatra/thekkaMuchulka"
import TulanatmakChart from "@/components/menuItems/yojana-bolpatra/tulanatmakChart"
import SamjhautaGarnaAunePatra from "@/components/menuItems/yojana-bolpatra/samjhautaGarnaAunePatra"
import YojanaDarta2 from "@/components/menuItems/yojana-bolpatra/yojanaDarta"
import YojanaSamjhauta2 from "@/components/menuItems/yojana-bolpatra/yojanaSamjhauta"
import KaryaDeshPatra from "@/components/menuItems/yojana-bolpatra/karyaDeshPatra"
import Mobilization from "@/components/menuItems/yojana-bolpatra/tippaniAdesh/mobilization"
import RunningBillVuktani2 from "@/components/menuItems/yojana-bolpatra/tippaniAdesh/runningBillVuktani2"
import AntimBillVuktani from "@/components/menuItems/yojana-bolpatra/tippaniAdesh/antimBillVuktani"
import MyadThapTippani2 from "@/components/menuItems/yojana-bolpatra/myadThap/MyadThapTippani2"
import MyadThapChitti from "@/components/menuItems/yojana-bolpatra/myadThap/MyadThapChitti"
import LabTest2 from "@/components/menuItems/yojana-bolpatra/labTest"
import AnugamanPratibedanAnusuchi from "@/components/menuItems/anugaman/anugamanPratibedanAnusuchi"
import AnugamanPratibedanSangyuta from "@/components/menuItems/anugaman/anugamanPratibedanSangyuta"
import AnugamanMinute from "@/components/menuItems/anugaman/anugamanMinute"
import JachPasTathaForfarakSamitiKoBaithak from "@/components/menuItems/anugaman/jachPasTathaForfarakSamitiKoBaithak"
import YojanaJachpass from "@/components/menuItems/anugaman/yojanaJachpass"
import YojanaHastantaran from "@/components/menuItems/anugaman/yojanaHastantaran"
import JachPassTathafarfarakPratibedan from "@/components/menuItems/anugaman/jachPassTathafarfarakPratibedan"
import AnugamanGarekoMiti from "@/components/menuItems/anugaman/anugamanGarekoMiti"

const { Header, Content, Sider } = Layout

interface Userd {
  name: string
  email: string
}

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const itemsAdmin: MenuItem[] = [
  getItem("कार्यालय", "sub1", <BankOutlined />, [
    getItem("कर्मचारी विवरण", "1"),
    getItem(" प्रयोग कर्ता", "2"),
    getItem("आर्थिक वर्ष", "3"),
    getItem("टिप्पणी सदर गर्ने कर्मचारी", "4"),
  ]),
  getItem("सेटअप", "sub2", <UserOutlined />, [
    getItem("मुख्य समिति", "5"),
    getItem(" अनुदान किसिम", "6"),
    getItem("लागत श्रोत", "7"),
    getItem("योजना प्रकार", "8"),
    getItem("योजना कार्य विवरण", "9"),
    getItem("योजना छनोट निकाय", "10"),
    getItem("गा.पा/नगरपालिका नाम", "11"),
    getItem("वडा न", "12"),
    getItem("बैंक विवरण", "13"),
    getItem("योजना बजेड बाँडफाड", "14"),
    getItem("सुचिकृत फर्म/कम्पनी", "15"),
    getItem("सुचना प्रकाशन पत्रपत्रिकाहरु", "16"),
    getItem("ल्याप टेष्ट कार्यालय", "17"),
  ]),
  getItem("योजना (उ.स/संघ सस्था/व्यक्तिगत (अमनात))", "sub3", <UserOutlined />, [
    getItem("योजना दर्ता", "18"),
    getItem("सम्झौताको स्वीकृत टिप्पणी", "19"),
    getItem("योजना सम्झौता", "20"),
    getItem("कार्यादेश (उपभोक्ता समिति/सस्था कम्पनी)", "21"),
    getItem("बैक खाता सिफारिस", "22"),
    getItem("बैक खाता बन्द सिफारिस", "23"),
    getItem("योजना दर्ता वडा तथा अन्य", "24"),
    getItem("योजना टिप्पणी आदेश", "sub3-1", null, [
      getItem("पेश्की भुक्तानी", "25"),
      getItem("रनिङ बिल भुक्तानी", "26"),
      getItem("अन्तिम किस्ता फरफारक (भुक्तानी)", "27"),
      getItem(" संस्थागत अनुदान टिप्पणी", "28"),
      getItem("भुक्तानी करोबरको सिफारिस पत्र", "29"),
    ]),
    getItem("उपभोक्ता दर्ता प्रमाण पत्र", "30"),
    getItem("म्याद थप पत्र / टिप्पणी आदेश", "31"),
  ]),
  getItem("योजना (बोलपत्र/दरभाउ पत्र / कोटेशन)", "sub4", <TeamOutlined />, [
    getItem("दररेट पेश पत्र", "32"),
    getItem("लई स्वीकृत पत्र", "33"),
    getItem("बोलपत्र/दरभाउपत्र मुल्याङकन", "34"),
    getItem("बोलपत्र/दरभाउ पत्र स्वीकृत ( Bid Bond)", "35"),
    getItem("जमानत पत्र Bid Security", "36"),
    getItem("ठेक्का मुचुल्का", "37"),
    getItem("तुलनात्मक चार्ट (Comparative Chart)", "38"),
    getItem("सम्झौताको गर्न आउने पत्र", "39"),
    getItem("योजना दर्ता", "40"),
    getItem("योजना सम्झौता", "41"),
    getItem("कार्यादेश पत्र", "42"),
    getItem("टिप्पणी आदेश", "sub4-1", null, [
      getItem("मोबिलाईजेशन पेश्की भुक्तानी", "43"),
      getItem(" रनिङ बिल भुक्तानी", "44"),
      getItem("अन्तिम बिल भुक्तानी ", "45"),
    ]),
    getItem("म्याद थप / टिप्पणी र पत्र", "sub4-2", null, [
      getItem("म्याद थप टिप्पणी ", "46"),
      getItem("म्याद थप चिट्ठी ", "47"),
    ]),
    getItem("ल्याब टेष्ट (Lab Testing)", "48"),
  ]),
  getItem("अनुगमन माइन्युट तथा प्रतिवेदन", "sub5", <PinterestOutlined />, [
    getItem("अनुगमन प्रतिवेदन अनुसूची- ३", "49"),
    getItem("अनुगमन प्रतिवेदन (सयुक्तरुपमा)", "50"),
    getItem("अनुगमन माइन्युट", "51"),
    getItem("जासँपास तथा फरफारक समितिको बैठक", "52"),
    getItem("योजना जासपास", "53"),
    getItem("योजना हस्तान्तरण", "54"),
    getItem("जासँपास तथा फरफारक प्रतिवेदन", "55"),
    getItem("अनुगमन गरेको मिति अनुसार प्रतिवेदन", "56"),
  ]),
  getItem("योजना प्रतिवेदन", "sub6", <ApartmentOutlined />, [
    getItem("सम्झौता भएका (सबै)", "57"),
    getItem("सम्झौता भएका ठेक्का निर्माण व्यवसायी", "58"),
    getItem("उ.स को लगत विवरण", "59"),
    getItem("समितिका आधार सम्झौता भएका योजना", "60"),
    getItem("लागत श्रोतका आधार सम्झौता भएका योजना", "61"),
    getItem("प्रकारका आधारमा सम्झौता भएका योजना", "62"),
    getItem("बजेट अनुसार योजनाको विवरण", "63"),
    getItem("वडागतरुपमा सम्झौता भएका योजना", "64"),
    getItem("कार्यगत समुहअनुसार सम्झौता भएका योजना", "65"),
    getItem("कर कट्टीका आधार योजना विवरण", "66"),
    getItem("पेश्की निकासा भएका योजनाहरु", "67"),
    getItem("धरौटी कट्टी विवरण", "68"),
    getItem("अपलोड भएका मध्ये सम्झौता हुन बांकी योजना", "69"),
    getItem("संस्था/कम्पनिको भ्याट कट्टी विवरण", "70"),
    getItem("बजेट बाँडफाडमा सहायक योजनाको विवरण", "71"),
    getItem("योजना प्रकार अनुसार गणना विवरण", "72"),
    getItem("सम्झौता मात्र भएका भुक्तानी नभएका योजनाको विवरण", "73"),
    getItem("आ.व.मा पेश्की र रनिङ विल निकासा योजनाको विवरण", "74"),
    getItem("सम्झौता भई भुक्तानी हुन बाँकी योजनाको विवरण", "75"),
  ]),
  getItem("प्रगति प्रतिवेदन", "sub7", <CopyOutlined />, [
    getItem("योजना प्रगति (सबै हेर्ने)", "76"),
    getItem("सम्पन्न योजना प्रगति (सबै हेर्ने)", "77"),
    getItem("सम्पन्न योजना प्रगति ( बजेट स्वीकृत)", "78"),
    getItem("मुख्य समितिको आधारमा सम्पन्न योजनाको विवरण", "79"),
    getItem("लागत श्रोतको आधारमा सम्पन्न योजनाको विवरण", "80"),
    getItem("योजना किसिम अनुसार सम्पन्न योजनाको विवरण", "81"),
    getItem("शर्शत/निशर्त अनुसार सम्पन्न योजनाको विवरण", "82"),
    getItem("वडा अनुसार सम्पन्न योजनाको विवरण", "83"),
    getItem("बजेट अनुसार सम्पन्न योजनाको विवरण", "84"),
    getItem("अनुगमन प्रतिवेदन", "85"),
    getItem("भौतिक प्रगति विवरण १७.२", "86"),
    getItem(
      "सम्पन्न योजनाको एकिकृत प्रतिवेदन (उ.स. संस्थागत र व्यक्तिगत)",
      "87"
    ),
    getItem("सम्पन्न योजनाको एकिकृत प्रतिवेदन (ठेक्का)", "88"),
    getItem("उपभोक्ता समितिबाट सम्पन्न योजनाको विवरण", "89"),
    getItem("ठेक्का पट्टा कन्टेन्जेन्सी विवरण", "90"),
    getItem("उपभोक्ता समिति कन्टेन्जेन्सी विवरण", "91"),
    getItem("कर कट्टी तथा जरिवाना लागेका योजना विवरण", "92"),
  ]),
  getItem("Tools", "sub8", <SketchOutlined />, [
    getItem("Upload Excel Files", "93"),
    getItem("Daily Data Backup", "94"),
    getItem("Online Service Anydesk", "95"),
    getItem("PDF Files", "96"),
  ]),
  getItem("Switch Fiscal Year", "sub9", <CalendarOutlined />),
]
const itemsUser: MenuItem[] = [
  getItem("सेटअप", "sub2", <UserOutlined />, [
    getItem("मुख्य समिति", "5"),
    getItem(" अनुदान किसिम", "6"),
    getItem("लागत श्रोत", "7"),
    getItem("योजना प्रकार", "8"),
    getItem("योजना कार्य विवरण", "9"),
    getItem("योजना छनोट निकाय", "10"),
    getItem("गा.पा/नगरपालिका नाम", "11"),
    getItem("वडा न", "12"),
    getItem("बैंक विवरण", "13"),
    getItem("योजना बजेड बाँडफाड", "14"),
    getItem("सुचिकृत फर्म/कम्पनी", "15"),
    getItem("सुचना प्रकाशन पत्रपत्रिकाहरु", "16"),
    getItem("ल्याप टेष्ट कार्यालय", "17"),
  ]),
  getItem("योजना (उ.स/संघ सस्था/व्यक्तिगत (अमनात))", "sub3", <UserOutlined />, [
    getItem("योजना दर्ता", "18"),
    getItem("सम्झौताको स्वीकृत टिप्पणी", "19"),
    getItem("योजना सम्झौता", "20"),
    getItem("कार्यादेश (उपभोक्ता समिति/सस्था कम्पनी)", "21"),
    getItem("बैक खाता सिफारिस", "22"),
    getItem("बैक खाता बन्द सिफारिस", "23"),
    getItem("योजना दर्ता वडा तथा अन्य", "24"),
    getItem("योजना टिप्पणी आदेश", "sub3-1", null, [
      getItem("पेश्की भुक्तानी", "25"),
      getItem("रनिङ बिल भुक्तानी", "26"),
      getItem("अन्तिम किस्ता फरफारक (भुक्तानी)", "27"),
      getItem(" संस्थागत अनुदान टिप्पणी", "28"),
      getItem("भुक्तानी करोबरको सिफारिस पत्र", "29"),
    ]),
    getItem("उपभोक्ता दर्ता प्रमाण पत्र", "30"),
    getItem("म्याद थप पत्र / टिप्पणी आदेश", "31"),
  ]),
  getItem("योजना (बोलपत्र/दरभाउ पत्र / कोटेशन)", "sub4", <TeamOutlined />, [
    getItem("दररेट पेश पत्र", "32"),
    getItem("लई स्वीकृत पत्र", "33"),
    getItem("बोलपत्र/दरभाउपत्र मुल्याङकन", "34"),
    getItem("बोलपत्र/दरभाउ पत्र स्वीकृत ( Bid Bond)", "35"),
    getItem("जमानत पत्र Bid Security", "36"),
    getItem("ठेक्का मुचुल्का", "37"),
    getItem("तुलनात्मक चार्ट (Comparative Chart)", "38"),
    getItem("सम्झौताको गर्न आउने पत्र", "39"),
    getItem("योजना दर्ता", "40"),
    getItem("योजना सम्झौता", "41"),
    getItem("कार्यादेश पत्र", "42"),
    getItem("टिप्पणी आदेश", "sub4-1", null, [
      getItem("मोबिलाईजेशन पेश्की भुक्तानी", "43"),
      getItem(" रनिङ बिल भुक्तानी", "44"),
      getItem("अन्तिम बिल भुक्तानी ", "45"),
    ]),
    getItem("म्याद थप / टिप्पणी र पत्र", "sub4-2", null, [
      getItem("म्याद थप टिप्पणी ", "46"),
      getItem("म्याद थप चिट्ठी ", "47"),
    ]),
    getItem("ल्याब टेष्ट (Lab Testing)", "48"),
  ]),
  getItem("अनुगमन माइन्युट तथा प्रतिवेदन", "sub5", <PinterestOutlined />, [
    getItem("अनुगमन प्रतिवेदन अनुसूची- ३", "49"),
    getItem("अनुगमन प्रतिवेदन (सयुक्तरुपमा)", "50"),
    getItem("अनुगमन माइन्युट", "51"),
    getItem("जासँपास तथा फरफारक समितिको बैठक", "52"),
    getItem("योजना जासपास", "53"),
    getItem("योजना हस्तान्तरण", "54"),
    getItem("जासँपास तथा फरफारक प्रतिवेदन", "55"),
    getItem("अनुगमन गरेको मिति अनुसार प्रतिवेदन", "56"),
  ]),
  getItem("योजना प्रतिवेदन", "sub6", <ApartmentOutlined />, [
    getItem("सम्झौता भएका (सबै)", "57"),
    getItem("सम्झौता भएका ठेक्का निर्माण व्यवसायी", "58"),
    getItem("उ.स को लगत विवरण", "59"),
    getItem("समितिका आधार सम्झौता भएका योजना", "60"),
    getItem("लागत श्रोतका आधार सम्झौता भएका योजना", "61"),
    getItem("प्रकारका आधारमा सम्झौता भएका योजना", "62"),
    getItem("बजेट अनुसार योजनाको विवरण", "63"),
    getItem("वडागतरुपमा सम्झौता भएका योजना", "64"),
    getItem("कार्यगत समुहअनुसार सम्झौता भएका योजना", "65"),
    getItem("कर कट्टीका आधार योजना विवरण", "66"),
    getItem("पेश्की निकासा भएका योजनाहरु", "67"),
    getItem("धरौटी कट्टी विवरण", "68"),
    getItem("अपलोड भएका मध्ये सम्झौता हुन बांकी योजना", "69"),
    getItem("संस्था/कम्पनिको भ्याट कट्टी विवरण", "70"),
    getItem("बजेट बाँडफाडमा सहायक योजनाको विवरण", "71"),
    getItem("योजना प्रकार अनुसार गणना विवरण", "72"),
    getItem("सम्झौता मात्र भएका भुक्तानी नभएका योजनाको विवरण", "73"),
    getItem("आ.व.मा पेश्की र रनिङ विल निकासा योजनाको विवरण", "74"),
    getItem("सम्झौता भई भुक्तानी हुन बाँकी योजनाको विवरण", "75"),
  ]),
  getItem("प्रगति प्रतिवेदन", "sub7", <CopyOutlined />, [
    getItem("योजना प्रगति (सबै हेर्ने)", "76"),
    getItem("सम्पन्न योजना प्रगति (सबै हेर्ने)", "77"),
    getItem("सम्पन्न योजना प्रगति ( बजेट स्वीकृत)", "78"),
    getItem("मुख्य समितिको आधारमा सम्पन्न योजनाको विवरण", "79"),
    getItem("लागत श्रोतको आधारमा सम्पन्न योजनाको विवरण", "80"),
    getItem("योजना किसिम अनुसार सम्पन्न योजनाको विवरण", "81"),
    getItem("शर्शत/निशर्त अनुसार सम्पन्न योजनाको विवरण", "82"),
    getItem("वडा अनुसार सम्पन्न योजनाको विवरण", "83"),
    getItem("बजेट अनुसार सम्पन्न योजनाको विवरण", "84"),
    getItem("अनुगमन प्रतिवेदन", "85"),
    getItem("भौतिक प्रगति विवरण १७.२", "86"),
    getItem(
      "सम्पन्न योजनाको एकिकृत प्रतिवेदन (उ.स. संस्थागत र व्यक्तिगत)",
      "87"
    ),
    getItem("सम्पन्न योजनाको एकिकृत प्रतिवेदन (ठेक्का)", "88"),
    getItem("उपभोक्ता समितिबाट सम्पन्न योजनाको विवरण", "89"),
    getItem("ठेक्का पट्टा कन्टेन्जेन्सी विवरण", "90"),
    getItem("उपभोक्ता समिति कन्टेन्जेन्सी विवरण", "91"),
    getItem("कर कट्टी तथा जरिवाना लागेका योजना विवरण", "92"),
  ]),
  getItem("Tools", "sub8", <SketchOutlined />, [
    getItem("Upload Excel Files", "93"),
    getItem("Daily Data Backup", "94"),
    getItem("Online Service Anydesk", "95"),
    getItem("PDF Files", "96"),
  ]),
  getItem("Switch Fiscal Year", "sub9", <CalendarOutlined />),
]

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState("0")
  const [userd, setUserd] = useState<Userd | null>(null)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key)
  }

  const fetchUserData = async () => {
    const userData: any = await getSessionDetail()
    setUserd(userData)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <StaffDetailPage />
      case "2":
        return <UserSetup />
      case "3":
        return <FiscalYearPage />
      case "4":
        return <TskPage />
      case "5":
        return <MukhyaSamiti />
      case "6":
        return <AnudanKisim />
      case "7":
        return <LagatSrot />
      case "8":
        return <YojanaPrakar />
      case "9":
        return <YojanaKaryaBivaran />
      case "10":
        return <YojanaChanotNikaya />
      case "11":
        return <Gapa />
      case "12":
        return <Wada />
      case "13":
        return <BankBivaran />
      case "14":
        return <YojanaBudget />
      case "15":
        return <SuchikritForm />
      case "16":
        return <SuchanaPrakasan />
      case "17":
        return <LabTest />
      case "18":
        return <YojanaDarta />
      case "19":
        return <SamjhautaSwikriti />
      case "20":
        return <YojanaSamjhauta />
      case "21":
        return <Karyadesh />
      case "22":
        return <BankKhataSifaris />
      case "23":
        return <BankKhataBanda />
      case "24":
        return <YojanaDartaWoda />
      case "25":
        return <PeskiVuktani />
      case "26":
        return <RunningBilVuktani />
      case "27":
        return <AntimKistaFarFarak />
      case "28":
        return <SansthagatAnudan />
      case "29":
        return <VuktaniKarobar />
      case "30":
        return <UpvoktaDarta />
      case "31":
        return <MyadThapPatra />
      case "32":
        return <DarRatePeshPatra />
      case "33":
        return <LayiSwikritiPatra />
      case "34":
        return <BolpatraBolbhauMulyankan />
      case "35":
        return <BolpatraDarvauSwikriti />
      case "36":
        return <JamanatPatra />
      case "37":
        return <ThekkaMuchulka />
      case "38":
        return <TulanatmakChart />
      case "39":
        return <SamjhautaGarnaAunePatra />
      case "40":
        return <YojanaDarta2 />
      case "41":
        return <YojanaSamjhauta2 />
      case "42":
        return <KaryaDeshPatra />
      case "43":
        return <Mobilization />
      case "44":
        return <RunningBillVuktani2 />
      case "45":
        return <AntimBillVuktani />
      case "46":
        return <MyadThapTippani2 />
      case "47":
        return <MyadThapChitti />
      case "48":
        return <LabTest2 />
      case "49":
        return <AnugamanPratibedanAnusuchi />
      case "50":
        return <AnugamanPratibedanSangyuta />
      case "51":
        return <AnugamanMinute />
      case "52":
        return <JachPasTathaForfarakSamitiKoBaithak />
      case "53":
        return <YojanaJachpass />
      case "54":
        return <YojanaHastantaran />
      case "55":
        return <JachPassTathafarfarakPratibedan />
      case "56":
        return <AnugamanGarekoMiti />
      case "57":
        return <div>Files Content</div>
      case "58":
        return <div>Files Content</div>
      case "59":
        return <div>Files Content</div>
      case "60":
        return <div>Files Content</div>
      case "61":
        return <div>Files Content</div>
      case "62":
        return <div>Files Content</div>
      case "63":
        return <div>Files Content</div>
      case "64":
        return <div>Files Content</div>
      case "65":
        return <div>Files Content</div>
      case "66":
        return <div>Files Content</div>
      case "67":
        return <div>Files Content</div>
      case "68":
        return <div>Files Content</div>
      case "69":
        return <div>Files Content</div>
      case "70":
        return <div>Files Content</div>
      case "71":
        return <div>Files Content</div>
      case "72":
        return <div>Files Content</div>
      case "73":
        return <div>Files Content</div>
      case "74":
        return <div>Files Content</div>
      case "75":
        return <div>Files Content</div>
      case "76":
        return <div>Files Content</div>
      case "77":
        return <div>Files Content</div>
      case "78":
        return <div>Files Content</div>
      case "79":
        return <div>Files Content</div>
      case "80":
        return <div>Files Content</div>
      case "81":
        return <div>Files Content</div>
      case "82":
        return <div>Files Content</div>
      case "83":
        return <div>Files Content</div>
      case "84":
        return <div>Files Content</div>
      case "85":
        return <div>Files Content</div>
      case "86":
        return <div>Files Content</div>
      case "87":
        return <div>Files Content</div>
      case "88":
        return <div>Files Content</div>
      case "89":
        return <div>Files Content</div>
      case "90":
        return <div>Files Content</div>
      case "91":
        return <div>Files Content</div>
      case "92":
        return <div>Files Content</div>
      case "93":
        return <div>Files Content</div>
      case "94":
        return <div>Files Content</div>
      case "95":
        return <div>Files Content</div>
      case "96":
        return <div>Files Content</div>
      default:
        return <Dashboard />
    }
  }

  const handleClick = () => {
    console.log("Image clicked")
    window.location.reload()
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        width={250}
      >
        <div className="my-4 ml-6 flex gap-4 font-semibold ">
          <Image
            src="/PIMS.ico"
            width={40}
            height={40}
            alt="logo"
            onClick={handleClick}
            className="cursor-pointer"
          />

          {collapsed ? (
            ""
          ) : (
            <p
              onClick={handleClick}
              className="cursor-pointer text-3xl text-orange-500"
            >
              PIMS
            </p>
          )}
        </div>
        {userd?.email === "admin" ? (
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={itemsAdmin}
            className="text-sm"
            onClick={handleMenuClick}
          />
        ) : (
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={itemsUser}
            className="text-sm"
            onClick={handleMenuClick}
          />
        )}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#F5F5F5",
            height: 60,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          className="flex justify-center "
        >
          {/* <Image
            src="/logo.png"
            width={270}
            height={100}
            alt="PIMS"
            priority
            onClick={handleClick}
            className="flex cursor-pointer justify-start py-2"
          /> */}
          <div className="ml-4 flex w-full items-center justify-between">
            <BSDateDisplay />
            <AccountButton />
          </div>
        </Header>
        <Content style={{ margin: "16px 16px" }}>
          {/* <Breadcrumb>
            <div className="flex w-full items-center justify-between">
              <BSDateDisplay />
              <AccountButton />
            </div>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="overflow-auto"
          >
            {renderContent()} {/* Render content based on selected key */}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Nav
