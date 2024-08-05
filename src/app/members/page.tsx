"use client"
import React, { useState } from "react"
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
import Link from "next/link"
import Image from "next/image"
import StaffDetailPage from "@/components/menuItems/office/StaffDetails"
import UserSetup from "@/components/menuItems/office/UserSetup"
import FiscalYearPage from "@/components/menuItems/office/FiscalYear"
import TskPage from "@/components/menuItems/office/Tsk"
import Dashboard from "@/components/menuItems/Dashboard"

const { Header, Content, Sider } = Layout

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

const items: MenuItem[] = [
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

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState("0")
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key)
  }

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
        return <div>Team </div>
      case "6":
        return <div>Team 1 Content</div>
      case "8":
        return <div>Team 2 Content</div>
      case "9":
        return <div>Files Content</div>
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        width={300}
      >
        <div className="mb-4 ml-4 mt-6 flex gap-4 font-semibold ">
          <Image src="/PIMS.ico" width={40} height={40} alt="logo" />
          {collapsed ? "" : <h2 className="text-3xl text-orange-500">PIMS</h2>}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ fontSize: "1rem" }}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer, height: 90 }}
          className="flex justify-center"
        >
          <Link href="/" className="flex justify-start py-2">
            <Image
              src="/logo.png"
              width={300}
              height={100}
              alt="PIMS"
              priority
            />
          </Link>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>path</Breadcrumb.Item>
            <Breadcrumb.Item>1</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()} {/* Render content based on selected key */}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Nav
