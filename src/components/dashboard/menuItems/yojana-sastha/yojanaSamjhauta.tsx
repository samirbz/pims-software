"use client"
import React, { useEffect, useState } from "react"
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react"

import { FaPrint, FaRegSave } from "react-icons/fa"
import { GrDocumentPdf } from "react-icons/gr"
import { AiOutlineFileAdd } from "react-icons/ai"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import {
  saveYojanaSamjhauta,
  fetchDataByYojanaKaryakramKonaamInYojanaSamjhauta,
  getYojanaDartaForSwikriti,
  fetchYojanaDartaData,
  getSamjhautaSwikritiTippani,
  updateYojanaSamjhauta,
  getYojanaSamjhauta,
} from "@/actions/formAction"
import { getStaff } from "@/actions/memberActions"
import { toast } from "react-toastify"
import yojanaSamjhautaPrint from "@/lib/print/PrintYojanaSamjhauta"
import { useMyContext, usePlaceContext } from "@/context/MyContext"

const Content = () => (
  <div>
    <p>
      १.आयोजना/कार्यक्रम मिति .....देखि शुरु गरी मिति ..... सम्ममा पुरा
      गर्नुपर्ने छ । तोकिएको अवधिमा कार्य सम्पन्न गर्न नसकेको अवस्थामा म्याद
      समाप्त हुनु भन्दा अगाडी म्याद थपका लागि कार्यालयमा निवेदन दिनु पर्नेछ ।
    </p>
    <br />
    <p>
      २.प्राप्त रकम तथा निर्माण सामाग्री सम्बन्धित आयोजनाको उद्धेश्यको लागि
      मात्र प्रयोग गर्नुपर्नेछ ।
    </p>
    <br />
    <p>
      ३.नगदी,जिन्सी सामानको प्राप्ती,खर्च बाँकी तथा आयोजनाको प्रगति विवरण
      राख्नुपर्नेछ ।
    </p>
    <br />
    <p>
      ४.योजनाको कुल लागत भन्दा घटी लागतमा आयोजना सम्पन्न भएको अवस्थामा सो
      मुताविक नै अनुदान र श्रमदानको प्रतिशत निर्धारण गरी भुक्तानी गरिने छ ।
    </p>
    <br />
    <p>
      ५.उपभोक्ता समितिले प्राविधिकको राय,परामर्श एवम् निर्देशन बमोजिम काम
      गर्नुपर्नेछ ।
    </p>
    <br />
    <p>
      ६.उपभोक्ता समितिले आयोजनासँग सम्बन्धित विल,भर्पाइहरु,डोर हाजिरी
      फारामहरु,जिन्सी नगदी खाताहरु,समिति/समूहको निर्णय पुस्तिका आदी कागजातहरु
      कार्यालयले मागेको बखत उपलब्ध गराउनु पर्नेछ ।
    </p>
    <br />
    <p>
      ७.कुनै सामाग्री खरिद गर्दा आन्तरिक राजस्व कार्यालयबाट स्थायी लेखा नम्बर र
      मुल्य अभिवृद्धी कर दर्ता प्रमाण पत्र प्राप्त व्यक्ति, फर्म वा कम्पनीबाट
      खरिद गरी सोही अनुसारका विल भर्पाइ आधिकारिक व्यक्तिबाट प्रमाणि गराई पेश
      गर्नुपर्नेछ ।
    </p>
    <br />
    <p>
      ८.मुल्य अभिवृद्धी कर लाग्ने वस्तु तथा सेवा खरिद गर्दा रु.२००००/- भन्दा बढी
      मूल्यको सामाग्रीमा अनिवार्य रुपमा मुल्य अभिवृद्धी कर दर्ता प्रमाण पत्र
      व्यक्ति, फर्म वा कम्पनीबाट खरिद गर्नुपर्नेछ । साथै उक्त विलमा उल्लेखित
      मू.अ.कर बाहेकको रकममा १.५% अग्रिम आयकर वापत करकट्टी गरी बाँकी रकम मात्र
      सम्बन्धित सेवा प्रदायकलाई भुक्तानी हुनेछ । रु.२००००/- भन्दा कम मूल्यको
      सामाग्री खरिदमा पान नम्बर लिएको व्यक्ति वा फर्मबाट खरिद गर्नुपर्नेछ ।
      अन्यथा खरिद गर्ने पदाधिकारी स्वयं जिम्मेवारी हुनेछ ।
    </p>
    <br />
    <p>
      ९.निर्माणको क्रममा हेभी इक्वीपमेन्ट प्रयोग गर्नुपर्ने भएमा नगरपालिकाको
      कार्यालयमा सूचीकृत हेभी इक्वीपमेन्ट प्रयोग गर्नुपर्नेछ । भुक्तानी लिन
      आउँदा स्वीकृत सूचीकृत भएको हेभी इक्वीपमेन्टको अनुमति पत्र पेश गर्नुपर्नेछ
      ।
    </p>
    <br />
    <p>
      १०.निर्माण कार्यको हकमा शुरु लागत अनुमानका कुनै आइटमहरुमा परिवर्तन हुने
      भएमा अधिकार प्राप्त व्यक्ति-कार्यालयबाट लागत अनुमान संशोधन गरे पश्चात
      मात्र कार्य गराउनु पर्नेछ । यसरी लागत अनुमान संशोधन नगरी कार्य गरेमा
      उपभोक्ता समिति/समूह नै जिम्मेवार हुनेछ ।
    </p>
    <br />
    <p>
      ११.आयोजनाको आवश्यक मर्मत संभारको व्यवस्था सम्बन्धित उपभोक्ताहरुले नै गर्नु
      पर्नेछ ।
    </p>
    <br />
    <p>
      १०.निर्माण कार्यको हकमा शुरु लागत अनुमानका कुनै आइटमहरुमा परिवर्तन हुने
      भएमा अधिकार प्राप्त व्यक्ति-कार्यालयबाट लागत अनुमान संशोधन गरे पश्चात
      मात्र कार्य गराउनु पर्नेछ । यसरी लागत अनुमान संशोधन नगरी कार्य गरेमा
      उपभोक्ता समिति/समूह नै जिम्मेवार हुनेछ ।
    </p>
    <br />
    <p>
      १२.आयोजनाको सबै काम उपभोक्ता समिति/समुहको निर्णय अनुसार गर्नु गराउनु
      पर्नेछ ।
    </p>
    <br />
    <p>
      १३.रु. ३ लाख वा सो भन्दा माथिको आयोजनामा आयोजना सम्बन्धी विवरण समेटिएको
      सूचना पाटी योजना स्थलमा राख्नु पर्नेछ ।
    </p>
    <br />
    <p>
      १४.आयोजनाको प्राविधिक सुपरिवेक्षणको लागि कार्यालयको तर्फबाट प्राविधिक
      खटाइनेछ । उपभोक्ता समितिबाट भएका कामको नियमित सुपरिवेक्षण गर्ने जिम्मेवारी
      निज प्राविधिकको हुनेछ ।
    </p>
    <br />
    <p>
      १५.श्रममूलक प्रविधिबाट कार्य गराउने गरी लागत अनुमान स्वीकृत गराई सोही
      बमोजिम सम्झौता गरी मेशीनरी उपकरणको प्रयोगबाट कार्य गरेको पाइएमा त्यस्तो
      उपभोक्ता समितिसँग सम्झौता रद्ध गरी उपभोक्ता समितिलाई भुक्तानी गरिएको रकम
      मूल्यांकन गरी बढी भएको रकम सरकारी बाँकी सरह असूलउपर गरिनेछ । साथै उपभोक्ता
      समिति मार्फत सम्झौता भएको आयोजना समितिले ठेक्का मार्फत गराएको बुझिएमा रकम
      भुक्तानी हुने छैन ।
    </p>
    <br />
    <p>
      १६.सम्झौता बमोजिम आयोजना सम्पन्न भए पछि अन्तिम भुक्तानीको लागि
      कार्यसम्पन्न प्रतिवेदन, नापी किताब, प्रमाणित विल भरपाई, योजनाको मुख्य
      फोटोहरु, रु ३ लाख वा सो भन्दा माथिका आयोजनामा सुचना पाटी राखेको फोटो,
      सम्बन्धित उपभोक्ता समितिले आयोजना सञ्चालन गर्दा भएको आय व्ययको अनुमोदन
      सहित कार्य सम्पन्न भएको निर्णय प्रतिलिपी, उपभोक्ता भेलाबाट सार्वजनिक लेखा
      परिवेरक्षणको प्रतिलिपी अनुसूची-३, अनुसूची-४ बमोजिम खर्च सार्वजानिक गरेको
      समितिको निर्णय, अनुसूची ६ बमोजिमको कार्यक्रमको भौतिक तथा वित्तिय
      प्रतिवेदन, अनुगमन समितिको कार्य सम्पन्न भएको निर्णय प्रतिलिपी तथा
      सम्बन्धित वडा कार्यालयको सिफारिस सहित अन्तिम किस्ता भुक्तानीको लागि निवेदन
      पेश गर्नु पर्नेछ ।
    </p>
    <br />
    <p>
      १७.आवश्यक कागजात संलग्न गरी भुक्तानी उपलब्ध गराउन सम्बन्धित उपभोक्ता
      समितिबाट अनुरोध भई आएमा उपभोक्ता समितिको बैंक खातामा भुक्तानी दिईनेछ ।
    </p>
    <br />
    <p>१८.यसमा उल्लेख नभएका कुराहरु प्रचलित कानुन बमोजिम हुनेछ ।</p>
  </div>
)

export default function YojanaSamjhauta() {
  const test = [{ key: "test", label: "test" }]

  const swikritiGarneNikaya = [
    { key: "कार्यपालिका", label: "कार्यपालिका" },
    { key: "गाउँ सभा", label: "गाउँ सभा" },
    { key: "कार्यालय", label: "कार्यालय" },
    { key: "वडा समिति", label: "वडा समिति" },
    { key: "प्रदेश", label: "प्रदेश" },
    { key: "सघं", label: "सघं" },
    { key: "अन्य", label: "अन्य" },
  ]

  const yojanaKoKaryaData = [
    { key: "नयाँ निर्माण", label: "नयाँ निर्माण" },
    { key: "कालो पत्रे", label: "कालो पत्रे" },
    { key: "नालि", label: "नालि" },
    { key: "पि.सि.सि", label: "पि.सि.सि" },
    { key: "ग्राभेल", label: "ग्राभेल" },
    { key: "पि.पि.सि", label: "पि.पि.सि" },
    { key: "कल्भर्ट", label: "कल्भर्ट" },
    { key: "नयाँ निर्माण", label: "नयाँ निर्माण" },
    { key: "मर्मत सम्भार", label: "मर्मत सम्भार" },
    { key: "तालिम सञ्चालन", label: "तालिम सञ्चालन" },
    { key: "ह्यूम पाइप निर्माण", label: "ह्यूम पाइप निर्माण" },
    { key: "डि.पि.आर निर्माण", label: "डि.पि.आर निर्माण" },
  ]

  const kisimPrakarData = [
    { key: "कालेपत्रे", label: "कालेपत्रे" },
    { key: "ग्राभेल", label: "ग्राभेल" },
    { key: "नयाँ निर्माण", label: "नयाँ निर्माण" },
  ]

  const [budgetKaryakram, setBudgetKarayakram] = useState("")
  const [chaluAawa, setChaluAawa] = useState("")
  const [pid, setPid] = useState("")

  // Tab 1
  const [samjhautaMiti, setSamjhautaMiti] = useState("")
  const [samjhautaNaam, setSamjhautaNaam] = useState("")
  const [paad, setPaad] = useState("")
  const [samjhautaThegana, setSamjhautaThegana] = useState("")
  const [phoneNum, setPhoneNum] = useState("")
  const [yojanaThegana, setYojanaThegana] = useState("")
  const [yojanaTheganaChild, setYojanaTheganaChild] = useState("")
  const [yojanaUdeskya, setYojanaUdeskya] = useState("")
  const [yojanaSwikritiGarneNikaya, setYojanaSwikritiGarneNikaya] = useState("")
  const [yojanaSuruhuneMiti, setYojanaSuruhuneMiti] = useState("")
  const [yojanaSsampanaHuneMiti, setYojanaSsampanaHuneMiti] = useState("")
  const [yojanaKarya, setYojanaKarya] = useState("")
  const [kisimPrakar, setKisimPrakar] = useState("")
  const [lambaiMi, setLambaiMi] = useState("")
  const [chetrafal, setChetrafal] = useState("")

  // Tab 2
  const [lagatAnumanRu, setLagatAnumanRu] = useState("")
  const [binbatkachyat, setBinbatkachyat] = useState("")
  const [janaSramdanRu, setJanaSramdanRu] = useState("")
  const [jammaRakamRuTwo, setJammaRakamRuTwo] = useState("")
  const [nepalsarkarbataRuPariman, setNepalsarkarbataRuPariman] = useState("")
  const [nagarpalikabataRuPariman, setNagarpalikabataRuPariman] = useState("")
  const [gaupalikaBataRuPariman, setGaupalikaBataRuPariman] = useState("")
  const [gairsarkariSanghRuPariman, setGairsarkariSanghRuPariman] = useState("")
  const [samudayamaAdharitRuPariman, setSamudayamaAdharitRuPariman] =
    useState("")
  const [bideshDatriSanghRuPariman, setBideshDatriSanghRuPariman] = useState("")
  const [lagatSahavagitaRuPariman, setLagatSahavagitaRuPariman] = useState("")
  const [anyaNikayaRuPariman, setAnyaNikayaRuPariman] = useState("")
  const [nepalsarkarbataRuSamagrikoNaam, setNepalsarkarbataRuSamagrikoNaam] =
    useState("")
  const [nagarpalikabataRuSamagrikoNaam, setNagarpalikabataRuSamagrikoNaam] =
    useState("")
  const [gaupalikaBataRuSamagrikoNaam, setGaupalikaBataRuSamagrikoNaam] =
    useState("")
  const [gairsarkariSanghRuSamagrikoNaam, setGairsarkariSanghRuSamagrikoNaam] =
    useState("")
  const [
    samudayamaAdharitRuSamagrikoNaam,
    setSamudayamaAdharitRuSamagrikoNaam,
  ] = useState("")
  const [bideshDatriSanghRuSamagrikoNaam, setBideshDatriSanghRuSamagrikoNaam] =
    useState("")
  const [lagatSahavagitaRuSamagrikoNaam, setLagatSahavagitaRuSamagrikoNaam] =
    useState("")
  const [anyaNikayaRuSamagrikoNaam, setAnyaNikayaRuSamagrikoNaam] = useState("")

  const [nepalsarkarbataRuYekai, setNepalsarkarbataRuYekai] = useState("")
  const [nagarpalikabataRuYekai, setNagarpalikabataRuYekai] = useState("")
  const [gaupalikaBataRuYekai, setGaupalikaBataRuYekai] = useState("")
  const [gairsarkariSanghRuYekai, setGairsarkariSanghRuYekai] = useState("")
  const [samudayamaAdharitRuYekai, setSamudayamaAdharitRuYekai] = useState("")
  const [bideshDatriSanghRuYekai, setBideshDatriSanghRuYekai] = useState("")
  const [lagatSahavagitaRuYekai, setLagatSahavagitaRuYekai] = useState("")
  const [anyaNikayaRuYekai, setAnyaNikayaRuYekai] = useState("")
  const [nepalsarkarbataRuShramRu, setNepalsarkarbataRuShramRu] = useState("")
  const [nagarpalikabataRuShramRu, setNagarpalikabataRuShramRu] = useState("")
  const [gaupalikaBataRuShramRu, setGaupalikaBataRuShramRu] = useState("")
  const [gairsarkariSanghRuShramRu, setGairsarkariSanghRuShramRu] = useState("")
  const [samudayamaAdharitRuShramRu, setSamudayamaAdharitRuShramRu] =
    useState("")
  const [bideshDatriSanghRuShramRu, setBideshDatriSanghRuShramRu] = useState("")
  const [lagatSahavagitaRuShramRu, setLagatSahavagitaRuShramRu] = useState("")
  const [anyaNikayaRuShramRu, setAnyaNikayaRuShramRu] = useState("")
  const [gharpariwarSankhya, setGharpariwarSankhya] = useState("")
  const [janaSankhya, setJanaSankhya] = useState("")
  const [samudaya, setSamudaya] = useState("")
  const [samudayaAdharit, setSamudayaAdharit] = useState("")

  // Tab 3
  const [kamgarneNikaya, setKamgarneNikaya] = useState("")
  const [upavoktaSamiti, setUpavoktaSamiti] = useState("")
  const [gathanVayekoMiti, setGathanVayekoMiti] = useState("")
  const [adhyakchya, setAdhyakchya] = useState("")
  const [adhyakchyaNaPraNa, setAdhyakchyaNaPraNa] = useState("")
  const [upadhyekchya, setUpadhyekchya] = useState("")
  const [sachib, setSachib] = useState("")
  const [sachibNaPraNa, setSachibNaPraNa] = useState("")
  const [kosaAdakshya, setKosaAdakshya] = useState("")
  const [kosaAdakshyaNaPraNa, setKosaAdakshyaNaPraNa] = useState("")
  const [sadasyaOne, setSadasyaOne] = useState("")
  const [sadasyaTwo, setSadasyaTwo] = useState("")
  const [sadasyaThree, setSadasyaThree] = useState("")
  const [sadasyaFour, setSadasyaFour] = useState("")
  const [sadasyaFive, setSadasyaFive] = useState("")
  const [sadasyaSix, setSadasyaSix] = useState("")
  const [sadasyaSeven, setSadasyaSeven] = useState("")
  const [gathanGardaUpastithi, setGathanGardaUpastithi] = useState("")
  const [samitimaJamma, setSamitimaJamma] = useState("")
  const [mahilaSadasya, setMahilaSadasya] = useState("")

  // Tab 4
  const [pahiloKistaMiti, setPahiloKistaMiti] = useState("")
  const [pahiloKistaPratisad, setPahiloKistaPratisad] = useState("")
  const [pahiloKistaKistaKoRakam, setPahiloKistaKistaKoRakam] = useState("")
  const [pahiloKistaNirmanSamagri, setPahiloKistaNirmanSamagri] = useState("")
  const [pahiloKistaKaifiyat, setPahiloKistaKaifiyat] = useState("")
  const [dosroKistaMiti, setDosroKistaMiti] = useState("")
  const [dosroKistaPratisat, setDosroKistaPratisat] = useState("")
  const [dosroKistaKistaKoRakam, setDosroKistaKistaKoRakam] = useState("")
  const [dosroKistaNirmanSamagri, setDosroKistaNirmanSamagri] = useState("")
  const [dosroKistaKaifiyat, setDosroKistaKaifiyat] = useState("")
  const [tesroKistaMiti, setTesroKistaMiti] = useState("")
  const [tesroKistaPratisat, setTesroKistaPratisat] = useState("")
  const [tesroKistaKistaKoRakam, setTesroKistaKistaKoRakam] = useState("")
  const [tesroKistaNirmanSamagri, setTesroKistaNirmanSamagri] = useState("")
  const [tesroKistaKaifiyat, setTesroKistaKaifiyat] = useState("")
  const [jammaRakamRuTwoFour, setJammaRakamRuTwoFour] = useState("")
  const [marmatSambhar, setMarmatSambhar] = useState("")
  const [janaSramdan, setJanaSramdan] = useState("")
  const [dastur, setDastur] = useState("")
  const [byaj, setByaj] = useState("")
  const [lagatSahavagita, setLagatSahavagita] = useState("")

  // Tab 5
  const [anyaSartHaruOne, setAnyaSartHaruOne] = useState("")
  const [anyaSartHaruTwo, setAnyaSartHaruTwo] = useState("")
  const [karyalayaKoTarfabata, setKaryalayaKoTarfabata] = useState("")
  const [karyalayaKoTarfabataChild, setKaryalayaKoTarfabataChild] = useState("")
  const [yojanaSakhaTarfabata, setYojanaSakhaTarfabata] = useState("")
  const [yojanaSakhaTarfabataChild, setYojanaSakhaTarfabataChild] = useState("")

  const [yojanaKaryaKramKoNaam, setYojanaKaryaKramKoNaam] = useState("")
  const [loading, setLoading] = useState(true)
  const [yojanaKoNaamData, setYojanaKoNaamData] = useState<any[]>([])

  const [karmachariKoNaamData, setKarmachariKoNaamData] = useState<any[]>([])

  const [saveOrEdit, setSaveOrEdit] = useState("Save")
  const { value } = useMyContext()
  const { place } = usePlaceContext()

  const onSubmit = async () => {
    if (saveOrEdit === "Edit") {
      const result = await updateYojanaSamjhauta(
        pid,
        value || chaluAawa,
        phoneNum,
        yojanaUdeskya,
        yojanaSwikritiGarneNikaya,
        yojanaSuruhuneMiti,
        yojanaSsampanaHuneMiti,
        yojanaKarya,
        kisimPrakar,
        lambaiMi,
        chetrafal,
        lagatAnumanRu,
        binbatkachyat,
        janaSramdanRu,
        jammaRakamRuTwo,
        nepalsarkarbataRuPariman,
        nagarpalikabataRuPariman,
        gaupalikaBataRuPariman,
        gairsarkariSanghRuPariman,
        samudayamaAdharitRuPariman,
        bideshDatriSanghRuPariman,
        lagatSahavagitaRuPariman,
        anyaNikayaRuPariman,
        nepalsarkarbataRuSamagrikoNaam,
        nagarpalikabataRuSamagrikoNaam,
        gaupalikaBataRuSamagrikoNaam,
        gairsarkariSanghRuSamagrikoNaam,
        samudayamaAdharitRuSamagrikoNaam,
        bideshDatriSanghRuSamagrikoNaam,
        lagatSahavagitaRuSamagrikoNaam,
        anyaNikayaRuSamagrikoNaam,
        nepalsarkarbataRuYekai,
        nagarpalikabataRuYekai,
        gaupalikaBataRuYekai,
        gairsarkariSanghRuYekai,
        samudayamaAdharitRuYekai,
        bideshDatriSanghRuYekai,
        lagatSahavagitaRuYekai,
        anyaNikayaRuYekai,
        nepalsarkarbataRuShramRu,
        nagarpalikabataRuShramRu,
        gaupalikaBataRuShramRu,
        gairsarkariSanghRuShramRu,
        samudayamaAdharitRuShramRu,
        bideshDatriSanghRuShramRu,
        lagatSahavagitaRuShramRu,
        anyaNikayaRuShramRu,
        samudayaAdharit,
        upavoktaSamiti,
        adhyakchyaNaPraNa,
        upadhyekchya,
        sachib,
        sachibNaPraNa,
        kosaAdakshya,
        kosaAdakshyaNaPraNa,
        sadasyaOne,
        sadasyaTwo,
        sadasyaThree,
        sadasyaFour,
        sadasyaFive,
        sadasyaSix,
        sadasyaSeven,
        pahiloKistaMiti,
        pahiloKistaPratisad,
        pahiloKistaKistaKoRakam,
        pahiloKistaNirmanSamagri,
        pahiloKistaKaifiyat,
        dosroKistaMiti,
        dosroKistaPratisat,
        dosroKistaKistaKoRakam,
        dosroKistaNirmanSamagri,
        dosroKistaKaifiyat,
        tesroKistaMiti,
        tesroKistaPratisat,
        tesroKistaKistaKoRakam,
        tesroKistaNirmanSamagri,
        tesroKistaKaifiyat,
        jammaRakamRuTwoFour,
        marmatSambhar,
        janaSramdan,
        dastur,
        byaj,
        lagatSahavagita,
        anyaSartHaruOne,
        anyaSartHaruTwo,
        karyalayaKoTarfabata,
        karyalayaKoTarfabataChild,
        yojanaSakhaTarfabata,
        yojanaSakhaTarfabataChild
      )
      if (result.status === "success") {
        setPid("")
        setYojanaKaryaKramKoNaam("")
        setBudgetKarayakram("")
        setChaluAawa("")
        setSamjhautaMiti("")
        setSamjhautaNaam("")
        setPaad("")
        setSamjhautaThegana("")
        setPhoneNum("")
        setYojanaThegana("")
        setYojanaTheganaChild("")
        setYojanaUdeskya("")
        setYojanaSwikritiGarneNikaya("")
        setYojanaSuruhuneMiti("")
        setYojanaSsampanaHuneMiti("")
        setYojanaKarya("")
        setKisimPrakar("")
        setLambaiMi("")
        setChetrafal("")
        setLagatAnumanRu("")
        setBinbatkachyat("")
        setJanaSramdanRu("")
        setJammaRakamRuTwo("")
        setNepalsarkarbataRuPariman("")
        setNagarpalikabataRuPariman("")
        setGaupalikaBataRuPariman("")
        setGairsarkariSanghRuPariman("")
        setSamudayamaAdharitRuPariman("")
        setBideshDatriSanghRuPariman("")
        setLagatSahavagitaRuPariman("")
        setAnyaNikayaRuPariman("")
        setNepalsarkarbataRuSamagrikoNaam("")
        setNagarpalikabataRuSamagrikoNaam("")
        setGaupalikaBataRuSamagrikoNaam("")
        setGairsarkariSanghRuSamagrikoNaam("")
        setSamudayamaAdharitRuSamagrikoNaam("")
        setBideshDatriSanghRuSamagrikoNaam("")
        setLagatSahavagitaRuSamagrikoNaam("")
        setAnyaNikayaRuSamagrikoNaam("")
        setNepalsarkarbataRuYekai("")
        setNagarpalikabataRuYekai("")
        setGaupalikaBataRuYekai("")
        setGairsarkariSanghRuYekai("")
        setSamudayamaAdharitRuYekai("")
        setBideshDatriSanghRuYekai("")
        setLagatSahavagitaRuYekai("")
        setAnyaNikayaRuYekai("")
        setNepalsarkarbataRuShramRu("")
        setNagarpalikabataRuShramRu("")
        setGaupalikaBataRuShramRu("")
        setGairsarkariSanghRuShramRu("")
        setSamudayamaAdharitRuShramRu("")
        setBideshDatriSanghRuShramRu("")
        setLagatSahavagitaRuShramRu("")
        setAnyaNikayaRuShramRu("")
        setGharpariwarSankhya("")
        setJanaSankhya("")
        setSamudaya("")
        setSamudayaAdharit("")
        setKamgarneNikaya("")
        setUpavoktaSamiti("")
        setGathanVayekoMiti("")
        setAdhyakchya("")
        setAdhyakchyaNaPraNa("")
        setUpadhyekchya("")
        setSachib("")
        setSachibNaPraNa("")
        setKosaAdakshya("")
        setKosaAdakshyaNaPraNa("")
        setSadasyaOne("")
        setSadasyaTwo("")
        setSadasyaThree("")
        setSadasyaFour("")
        setSadasyaFive("")
        setSadasyaSix("")
        setSadasyaSeven("")
        setGathanGardaUpastithi("")
        setSamitimaJamma("")
        setMahilaSadasya("")
        setPahiloKistaMiti("")
        setPahiloKistaPratisad("")
        setPahiloKistaKistaKoRakam("")
        setPahiloKistaNirmanSamagri("")
        setPahiloKistaKaifiyat("")
        setDosroKistaMiti("")
        setDosroKistaPratisat("")
        setDosroKistaKistaKoRakam("")
        setDosroKistaNirmanSamagri("")
        setDosroKistaKaifiyat("")
        setTesroKistaMiti("")
        setTesroKistaPratisat("")
        setTesroKistaKistaKoRakam("")
        setTesroKistaNirmanSamagri("")
        setTesroKistaKaifiyat("")
        setJammaRakamRuTwoFour("")
        setMarmatSambhar("")
        setJanaSramdan("")
        setDastur("")
        setByaj("")
        setLagatSahavagita("")
        setAnyaSartHaruOne("")
        setAnyaSartHaruTwo("")
        setKaryalayaKoTarfabata("")
        setKaryalayaKoTarfabataChild("")
        setYojanaSakhaTarfabata("")
        setYojanaSakhaTarfabataChild("")
        setSaveOrEdit("Save")
        toast.success("successfully Edited")
      } else {
        console.error("Error occurred during save")
      }
    } else {
      const result = await saveYojanaSamjhauta(
        pid,
        value || "",
        chaluAawa,
        phoneNum,
        yojanaUdeskya,
        yojanaSwikritiGarneNikaya,
        yojanaSuruhuneMiti,
        yojanaSsampanaHuneMiti,
        yojanaKarya,
        kisimPrakar,
        lambaiMi,
        chetrafal,
        lagatAnumanRu,
        binbatkachyat,
        janaSramdanRu,
        jammaRakamRuTwo,
        nepalsarkarbataRuPariman,
        nagarpalikabataRuPariman,
        gaupalikaBataRuPariman,
        gairsarkariSanghRuPariman,
        samudayamaAdharitRuPariman,
        bideshDatriSanghRuPariman,
        lagatSahavagitaRuPariman,
        anyaNikayaRuPariman,
        nepalsarkarbataRuSamagrikoNaam,
        nagarpalikabataRuSamagrikoNaam,
        gaupalikaBataRuSamagrikoNaam,
        gairsarkariSanghRuSamagrikoNaam,
        samudayamaAdharitRuSamagrikoNaam,
        bideshDatriSanghRuSamagrikoNaam,
        lagatSahavagitaRuSamagrikoNaam,
        anyaNikayaRuSamagrikoNaam,
        nepalsarkarbataRuYekai,
        nagarpalikabataRuYekai,
        gaupalikaBataRuYekai,
        gairsarkariSanghRuYekai,
        samudayamaAdharitRuYekai,
        bideshDatriSanghRuYekai,
        lagatSahavagitaRuYekai,
        anyaNikayaRuYekai,
        nepalsarkarbataRuShramRu,
        nagarpalikabataRuShramRu,
        gaupalikaBataRuShramRu,
        gairsarkariSanghRuShramRu,
        samudayamaAdharitRuShramRu,
        bideshDatriSanghRuShramRu,
        lagatSahavagitaRuShramRu,
        anyaNikayaRuShramRu,
        samudayaAdharit,
        upavoktaSamiti,
        adhyakchyaNaPraNa,
        upadhyekchya,
        sachib,
        sachibNaPraNa,
        kosaAdakshya,
        kosaAdakshyaNaPraNa,
        sadasyaOne,
        sadasyaTwo,
        sadasyaThree,
        sadasyaFour,
        sadasyaFive,
        sadasyaSix,
        sadasyaSeven,
        pahiloKistaMiti,
        pahiloKistaPratisad,
        pahiloKistaKistaKoRakam,
        pahiloKistaNirmanSamagri,
        pahiloKistaKaifiyat,
        dosroKistaMiti,
        dosroKistaPratisat,
        dosroKistaKistaKoRakam,
        dosroKistaNirmanSamagri,
        dosroKistaKaifiyat,
        tesroKistaMiti,
        tesroKistaPratisat,
        tesroKistaKistaKoRakam,
        tesroKistaNirmanSamagri,
        tesroKistaKaifiyat,
        jammaRakamRuTwoFour,
        marmatSambhar,
        janaSramdan,
        dastur,
        byaj,
        lagatSahavagita,
        anyaSartHaruOne,
        anyaSartHaruTwo,
        karyalayaKoTarfabata,
        karyalayaKoTarfabataChild,
        yojanaSakhaTarfabata,
        yojanaSakhaTarfabataChild
      )
      if (result.status === "success") {
        setPid("")
        setBudgetKarayakram("")
        setChaluAawa("")
        setSamjhautaMiti("")
        setSamjhautaNaam("")
        setPaad("")
        setSamjhautaThegana("")
        setPhoneNum("")
        setYojanaThegana("")
        setYojanaTheganaChild("")
        setYojanaUdeskya("")
        setYojanaSwikritiGarneNikaya("")
        setYojanaSuruhuneMiti("")
        setYojanaSsampanaHuneMiti("")
        setYojanaKarya("")
        setKisimPrakar("")
        setLambaiMi("")
        setChetrafal("")
        setLagatAnumanRu("")
        setBinbatkachyat("")
        setJanaSramdanRu("")
        setJammaRakamRuTwo("")
        setNepalsarkarbataRuPariman("")
        setNagarpalikabataRuPariman("")
        setGaupalikaBataRuPariman("")
        setGairsarkariSanghRuPariman("")
        setSamudayamaAdharitRuPariman("")
        setBideshDatriSanghRuPariman("")
        setLagatSahavagitaRuPariman("")
        setAnyaNikayaRuPariman("")
        setNepalsarkarbataRuSamagrikoNaam("")
        setNagarpalikabataRuSamagrikoNaam("")
        setGaupalikaBataRuSamagrikoNaam("")
        setGairsarkariSanghRuSamagrikoNaam("")
        setSamudayamaAdharitRuSamagrikoNaam("")
        setBideshDatriSanghRuSamagrikoNaam("")
        setLagatSahavagitaRuSamagrikoNaam("")
        setAnyaNikayaRuSamagrikoNaam("")
        setNepalsarkarbataRuYekai("")
        setNagarpalikabataRuYekai("")
        setGaupalikaBataRuYekai("")
        setGairsarkariSanghRuYekai("")
        setSamudayamaAdharitRuYekai("")
        setBideshDatriSanghRuYekai("")
        setLagatSahavagitaRuYekai("")
        setAnyaNikayaRuYekai("")
        setNepalsarkarbataRuShramRu("")
        setNagarpalikabataRuShramRu("")
        setGaupalikaBataRuShramRu("")
        setGairsarkariSanghRuShramRu("")
        setSamudayamaAdharitRuShramRu("")
        setBideshDatriSanghRuShramRu("")
        setLagatSahavagitaRuShramRu("")
        setAnyaNikayaRuShramRu("")
        setGharpariwarSankhya("")
        setJanaSankhya("")
        setSamudaya("")
        setSamudayaAdharit("")
        setKamgarneNikaya("")
        setUpavoktaSamiti("")
        setGathanVayekoMiti("")
        setAdhyakchya("")
        setAdhyakchyaNaPraNa("")
        setUpadhyekchya("")
        setSachib("")
        setSachibNaPraNa("")
        setKosaAdakshya("")
        setKosaAdakshyaNaPraNa("")
        setSadasyaOne("")
        setSadasyaTwo("")
        setSadasyaThree("")
        setSadasyaFour("")
        setSadasyaFive("")
        setSadasyaSix("")
        setSadasyaSeven("")
        setGathanGardaUpastithi("")
        setSamitimaJamma("")
        setMahilaSadasya("")
        setPahiloKistaMiti("")
        setPahiloKistaPratisad("")
        setPahiloKistaKistaKoRakam("")
        setPahiloKistaNirmanSamagri("")
        setPahiloKistaKaifiyat("")
        setDosroKistaMiti("")
        setDosroKistaPratisat("")
        setDosroKistaKistaKoRakam("")
        setDosroKistaNirmanSamagri("")
        setDosroKistaKaifiyat("")
        setTesroKistaMiti("")
        setTesroKistaPratisat("")
        setTesroKistaKistaKoRakam("")
        setTesroKistaNirmanSamagri("")
        setTesroKistaKaifiyat("")
        setJammaRakamRuTwoFour("")
        setMarmatSambhar("")
        setJanaSramdan("")
        setDastur("")
        setByaj("")
        setLagatSahavagita("")
        setAnyaSartHaruOne("")
        setAnyaSartHaruTwo("")
        setKaryalayaKoTarfabata("")
        setKaryalayaKoTarfabataChild("")
        setYojanaSakhaTarfabata("")
        setYojanaSakhaTarfabataChild("")
        setYojanaKaryaKramKoNaam("")
        toast.success("successfully Created")
      } else {
        console.error("Error occurred during save")
      }
    }
  }

  const handleAlertData = async (yojanaKaryaKramKoNaam: string) => {
    if (!yojanaKaryaKramKoNaam) {
      alert("Please select yojana")
      return
    }

    try {
      const response = await fetchDataByYojanaKaryakramKonaamInYojanaSamjhauta(
        value || "",
        pid
      )

      if (response.status === "success") {
        // Alerting the data as a string
        alert(JSON.stringify(response.data, null, 2))
      } else {
        alert("Error: " + response.error)
      }
    } catch (error) {
      console.error("Error in handleAlertData:", error)
      alert("An unexpected error occurred.")
    }
  }

  useEffect(() => {
    const fetchYojanaDartaKoNaamData = async () => {
      try {
        const data = await fetchYojanaDartaData(value || "")
        const dataGetStaff = await getStaff()
        setKarmachariKoNaamData(dataGetStaff || [])
        setYojanaKoNaamData(data)
        setLoading(false)
      } catch (e) {
        console.error("Error fetching anudaan data", e)
      }
    }
    fetchYojanaDartaKoNaamData()
  }, [value])

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        setPid(pid)
        const data = await getSamjhautaSwikritiTippani(value || "", pid)
        const dataYojanaDarta = await getYojanaDartaForSwikriti(
          pid,
          value || ""
        )
        if (dataYojanaDarta.length > 0 && dataYojanaDarta) {
          setYojanaKaryaKramKoNaam(dataYojanaDarta[0].yojanaKoNaam)
          setBudgetKarayakram(dataYojanaDarta[0].anudanKoNaam)
          setChaluAawa(data[0].aawa)
          setSamjhautaMiti(data[0].miti)
          setSamjhautaNaam(data[0].adhyachyaKoNaam)
          setPaad("अध्यक्ष")
          setSamjhautaThegana(place)
          setYojanaThegana(place)
          setYojanaTheganaChild(dataYojanaDarta[0].wada)

          setLagatAnumanRu(dataYojanaDarta[0].prabidhikEstimateAmount)
          setBinbatkachyat(dataYojanaDarta[0].prabidhikEstimateAmount)
          setJanaSramdanRu(dataYojanaDarta[0].janaSramdanRakam)
          setJammaRakamRuTwo(
            (
              Number(dataYojanaDarta[0].prabidhikEstimateAmount) +
              Number(dataYojanaDarta[0].janaSramdanRakam)
            ).toString()
          )

          setGharpariwarSankhya(dataYojanaDarta[0].gharPariwarSankhya)
          setJanaSankhya(dataYojanaDarta[0].janaSankhya)
          setSamudaya("मिस्रित")

          setKamgarneNikaya(dataYojanaDarta[0].karyagatSamuha)
          setUpavoktaSamiti(
            `${dataYojanaDarta[0].yojanaKoNaam} (${dataYojanaDarta[0].karyagatSamuha})`
          )
          setGathanVayekoMiti(data[0].ushaGathanMiti)
          setAdhyakchya(data[0].adhyachyaKoNaam)

          setGathanGardaUpastithi(data[0].velamaUpasthitiSankhya)
          setSamitimaJamma(data[0].padakariSankhya)
          setMahilaSadasya(data[0].mahilaSankhya)

          setMarmatSambhar(
            `${dataYojanaDarta[0].yojanaKoNaam} (${dataYojanaDarta[0].karyagatSamuha})`
          )
        }
      } catch (error) {
        console.error("Error fetching Yojana Darta data:", error)
      } finally {
        setLoading(false)
      }
    }

    const handleSaveOrEdit = async () => {
      try {
        const response =
          await fetchDataByYojanaKaryakramKonaamInYojanaSamjhauta(
            value || "",
            pid
          )

        const dataCheck = await getYojanaSamjhauta(value || "", pid)

        if (
          response.status === "success" &&
          response.data &&
          dataCheck &&
          response.data.length > 0
        ) {
          const data = response.data[0]
          setPhoneNum(data.phoneNum)
          setYojanaUdeskya(data.yojanaUdeskya)
          setYojanaSwikritiGarneNikaya(data.yojanaSwikritiGarneNikaya)
          setYojanaSuruhuneMiti(data.yojanaSuruhuneMiti)
          setYojanaSsampanaHuneMiti(data.yojanaSsampanaHuneMiti)
          setYojanaKarya(data.yojanaKarya)
          setKisimPrakar(data.kisimPrakar)
          setLambaiMi(data.lambaiMi)
          setChetrafal(data.chetrafal)
          setLagatAnumanRu(data.lagatAnumanRu)
          setBinbatkachyat(data.binbatkachyat)
          setJanaSramdanRu(data.janaSramdanRu)
          setJammaRakamRuTwo(data.jammaRakamRuTwo)
          setNepalsarkarbataRuPariman(data.nepalsarkarbataRuPariman)
          setNagarpalikabataRuPariman(data.nagarpalikabataRuPariman)
          setGaupalikaBataRuPariman(data.gaupalikaBataRuPariman)
          setGairsarkariSanghRuPariman(data.gairsarkariSanghRuPariman)
          setSamudayamaAdharitRuPariman(data.samudayamaAdharitRuPariman)
          setBideshDatriSanghRuPariman(data.bideshDatriSanghRuPariman)
          setLagatSahavagitaRuPariman(data.lagatSahavagitaRuPariman)
          setAnyaNikayaRuPariman(data.anyaNikayaRuPariman)
          setNepalsarkarbataRuSamagrikoNaam(data.nepalsarkarbataRuSamagrikoNaam)
          setNagarpalikabataRuSamagrikoNaam(data.nagarpalikabataRuSamagrikoNaam)
          setGaupalikaBataRuSamagrikoNaam(data.gaupalikaBataRuSamagrikoNaam)
          setGairsarkariSanghRuSamagrikoNaam(
            data.gairsarkariSanghRuSamagrikoNaam
          )
          setSamudayamaAdharitRuSamagrikoNaam(
            data.samudayamaAdharitRuSamagrikoNaam
          )
          setBideshDatriSanghRuSamagrikoNaam(
            data.bideshDatriSanghRuSamagrikoNaam
          )
          setLagatSahavagitaRuSamagrikoNaam(data.lagatSahavagitaRuSamagrikoNaam)
          setAnyaNikayaRuSamagrikoNaam(data.anyaNikayaRuSamagrikoNaam)
          setNepalsarkarbataRuYekai(data.nepalsarkarbataRuYekai)
          setNagarpalikabataRuYekai(data.nagarpalikabataRuYekai)
          setGaupalikaBataRuYekai(data.gaupalikaBataRuYekai)
          setGairsarkariSanghRuYekai(data.gairsarkariSanghRuYekai)
          setSamudayamaAdharitRuYekai(data.samudayamaAdharitRuYekai)
          setBideshDatriSanghRuYekai(data.bideshDatriSanghRuYekai)
          setLagatSahavagitaRuYekai(data.lagatSahavagitaRuYekai)
          setAnyaNikayaRuYekai(data.anyaNikayaRuYekai)
          setNepalsarkarbataRuShramRu(data.nepalsarkarbataRuShramRu)
          setNagarpalikabataRuShramRu(data.nagarpalikabataRuShramRu)
          setGaupalikaBataRuShramRu(data.gaupalikaBataRuShramRu)
          setGairsarkariSanghRuShramRu(data.gairsarkariSanghRuShramRu)
          setSamudayamaAdharitRuShramRu(data.samudayamaAdharitRuShramRu)
          setBideshDatriSanghRuShramRu(data.bideshDatriSanghRuShramRu)
          setLagatSahavagitaRuShramRu(data.lagatSahavagitaRuShramRu)
          setAnyaNikayaRuShramRu(data.anyaNikayaRuShramRu)
          setSamudayaAdharit(data.samudayaAdharit)
          setUpavoktaSamiti(data.upavoktaSamiti)
          setAdhyakchyaNaPraNa(data.adhyakchyaNaPraNa)
          setUpadhyekchya(data.upadhyekchya)
          setSachib(data.sachib)
          setSachibNaPraNa(data.sachibNaPraNa)
          setKosaAdakshya(data.kosaAdakshya)
          setKosaAdakshyaNaPraNa(data.kosaAdakshyaNaPraNa)
          setSadasyaOne(data.sadasyaOne)
          setSadasyaTwo(data.sadasyaTwo)
          setSadasyaThree(data.sadasyaThree)
          setSadasyaFour(data.sadasyaFour)
          setSadasyaFive(data.sadasyaFive)
          setSadasyaSix(data.sadasyaSix)
          setSadasyaSeven(data.sadasyaSeven)
          setPahiloKistaMiti(data.pahiloKistaMiti)
          setPahiloKistaPratisad(data.pahiloKistaPratisad)
          setPahiloKistaKistaKoRakam(data.pahiloKistaKistaKoRakam)
          setPahiloKistaNirmanSamagri(data.pahiloKistaNirmanSamagri)
          setPahiloKistaKaifiyat(data.pahiloKistaKaifiyat)
          setDosroKistaMiti(data.dosroKistaMiti)
          setDosroKistaPratisat(data.dosroKistaPratisat)
          setDosroKistaKistaKoRakam(data.dosroKistaKistaKoRakam)
          setDosroKistaNirmanSamagri(data.dosroKistaNirmanSamagri)
          setDosroKistaKaifiyat(data.dosroKistaKaifiyat)
          setTesroKistaMiti(data.tesroKistaMiti)
          setTesroKistaPratisat(data.tesroKistaPratisat)
          setTesroKistaKistaKoRakam(data.tesroKistaKistaKoRakam)
          setTesroKistaNirmanSamagri(data.tesroKistaNirmanSamagri)
          setTesroKistaKaifiyat(data.tesroKistaKaifiyat)
          setJammaRakamRuTwoFour(data.jammaRakamRuTwoFour)
          setMarmatSambhar(data.marmatSambhar)
          setJanaSramdan(data.janaSramdan)
          setDastur(data.dastur)
          setByaj(data.byaj)
          setLagatSahavagita(data.lagatSahavagita)
          setAnyaSartHaruOne(data.anyaSartHaruOne)
          setAnyaSartHaruTwo(data.anyaSartHaruTwo)
          setKaryalayaKoTarfabata(data.karyalayaKoTarfabata)
          setKaryalayaKoTarfabataChild(data.karyalayaKoTarfabataChild)
          setYojanaSakhaTarfabata(data.yojanaSakhaTarfabata)
          setYojanaSakhaTarfabataChild(data.yojanaSakhaTarfabataChild)
          setSaveOrEdit("Edit")
        } else {
          setPhoneNum("")
          setYojanaUdeskya("")
          setYojanaSwikritiGarneNikaya("")
          setYojanaSuruhuneMiti("")
          setYojanaSsampanaHuneMiti("")
          setYojanaKarya("")
          setKisimPrakar("")
          setLambaiMi("")
          setChetrafal("")
          setLagatAnumanRu("")
          setBinbatkachyat("")
          setJanaSramdanRu("")
          setJammaRakamRuTwo("")
          setNepalsarkarbataRuPariman("")
          setNagarpalikabataRuPariman("")
          setGaupalikaBataRuPariman("")
          setGairsarkariSanghRuPariman("")
          setSamudayamaAdharitRuPariman("")
          setBideshDatriSanghRuPariman("")
          setLagatSahavagitaRuPariman("")
          setAnyaNikayaRuPariman("")
          setNepalsarkarbataRuSamagrikoNaam("")
          setNagarpalikabataRuSamagrikoNaam("")
          setGaupalikaBataRuSamagrikoNaam("")
          setGairsarkariSanghRuSamagrikoNaam("")
          setSamudayamaAdharitRuSamagrikoNaam("")
          setBideshDatriSanghRuSamagrikoNaam("")
          setLagatSahavagitaRuSamagrikoNaam("")
          setAnyaNikayaRuSamagrikoNaam("")
          setNepalsarkarbataRuYekai("")
          setNagarpalikabataRuYekai("")
          setGaupalikaBataRuYekai("")
          setGairsarkariSanghRuYekai("")
          setSamudayamaAdharitRuYekai("")
          setBideshDatriSanghRuYekai("")
          setLagatSahavagitaRuYekai("")
          setAnyaNikayaRuYekai("")
          setNepalsarkarbataRuShramRu("")
          setNagarpalikabataRuShramRu("")
          setGaupalikaBataRuShramRu("")
          setGairsarkariSanghRuShramRu("")
          setSamudayamaAdharitRuShramRu("")
          setBideshDatriSanghRuShramRu("")
          setLagatSahavagitaRuShramRu("")
          setAnyaNikayaRuShramRu("")
          setSamudayaAdharit("")
          setUpavoktaSamiti("")
          setAdhyakchyaNaPraNa("")
          setUpadhyekchya("")
          setSachib("")
          setSachibNaPraNa("")
          setKosaAdakshya("")
          setKosaAdakshyaNaPraNa("")
          setSadasyaOne("")
          setSadasyaTwo("")
          setSadasyaThree("")
          setSadasyaFour("")
          setSadasyaFive("")
          setSadasyaSix("")
          setSadasyaSeven("")
          setPahiloKistaMiti("")
          setPahiloKistaPratisad("")
          setPahiloKistaKistaKoRakam("")
          setPahiloKistaNirmanSamagri("")
          setPahiloKistaKaifiyat("")
          setDosroKistaMiti("")
          setDosroKistaPratisat("")
          setDosroKistaKistaKoRakam("")
          setDosroKistaNirmanSamagri("")
          setDosroKistaKaifiyat("")
          setTesroKistaMiti("")
          setTesroKistaPratisat("")
          setTesroKistaKistaKoRakam("")
          setTesroKistaNirmanSamagri("")
          setTesroKistaKaifiyat("")
          setJammaRakamRuTwoFour("")
          setMarmatSambhar("")
          setJanaSramdan("")
          setDastur("")
          setByaj("")
          setLagatSahavagita("")
          setAnyaSartHaruOne("")
          setAnyaSartHaruTwo("")
          setKaryalayaKoTarfabata("")
          setKaryalayaKoTarfabataChild("")
          setYojanaSakhaTarfabata("")
          setYojanaSakhaTarfabataChild("")
          setSaveOrEdit("Save")
        }
      } catch (error) {
        console.error("Error in handleAlertData:", error)
        alert("An unexpected error occurred.")
      }
    }
    handleSaveOrEdit()
    getData()
  }, [yojanaKaryaKramKoNaam, value, pid, place])

  return (
    <div className="flex w-full justify-center ">
      <div className="flex w-full flex-col ">
        <div className="overflow-auto">
          <div>
            <h1 className="form-title text-center text-xl font-semibold sm:text-2xl">
              उपभोक्ता समिति/सस्थागत / व्यक्तिगत र अनुदानको सम्झौता
            </h1>
            <br />
            <div className="flex items-center gap-4">
              <Input
                type="text"
                label="वजेट कार्यक्रम "
                size="sm"
                className="w-1/2"
                value={budgetKaryakram}
                onChange={(e) => setBudgetKarayakram(e.target.value)}
              />
              <p className="text-lg text-blue-600">चालु आ.वः- {value}</p>
            </div>
          </div>
          <br />
          <Tabs
            aria-label="Options"
            radius="sm"
            className="flex justify-center"
          >
            <Tab key="1" title="सम्झौता गर्ने पक्ष / योजना">
              <Card>
                <CardBody>
                  <div>
                    <div className="flex gap-8">
                      <div className=" w-2/5">
                        <p>उपभोक्ता समिति / संघ सस्था / व्यक्तिको विवरण</p>
                        <br />
                        <form className="flex items-center gap-2 ">
                          <label htmlFor="date">सम्झौता मितिः-</label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            className="rounded-lg border p-1 "
                            value={samjhautaMiti}
                            onChange={(value: string) =>
                              setSamjhautaMiti(value)
                            }
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />
                        </form>
                        <br />
                        <div className="flex flex-col gap-2">
                          <p>सम्झौता गर्ने संस्थाको व्यक्तिको विवरण</p>
                          <Input
                            type="text"
                            label="१. नाम"
                            size="sm"
                            value={samjhautaNaam}
                            onChange={(e) => setSamjhautaNaam(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="२.पद"
                            size="sm"
                            value={paad}
                            onChange={(e) => setPaad(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="ठेगाना"
                            size="sm"
                            value={samjhautaThegana}
                            onChange={(e) =>
                              setSamjhautaThegana(e.target.value)
                            }
                          />
                          <Input
                            type="text"
                            label="४. फोन न."
                            size="sm"
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                          />
                        </div>
                        <br />
                        <p className=" text-purple-600">
                          उपभोक्ता समितिको पदमा:- अध्यक्ष/सचिव/ कोषाध्यक्ष
                          <br /> सघ/संस्थाको भएमा पदमा:- पद दिनुहोस । <br />
                          व्यक्तिगत भएमा पदमा :- पद दिनुहोस ।
                        </p>
                      </div>

                      <div className="flex w-3/5 flex-col gap-2">
                        <p>योजनाको विवरण</p>
                        <Select
                          label="योजना / कार्यक्रमको नाम"
                          size="sm"
                          placeholder="Select an option" // Optional: if you want a placeholder
                          selectedKeys={
                            yojanaKaryaKramKoNaam
                              ? new Set([yojanaKaryaKramKoNaam])
                              : new Set()
                          }
                          endContent={loading ? "loading..." : null}
                          onSelectionChange={(keys) => {
                            const selectedValue = Array.from(keys).join(", ")
                            setYojanaKaryaKramKoNaam(selectedValue)

                            // Find the selected item by its name and set the pid
                            const selectedItem = yojanaKoNaamData.find(
                              (item) => item.yojanaKoNaam === selectedValue
                            )
                            if (selectedItem) {
                              setPid(selectedItem.id)
                            }
                          }}
                        >
                          {yojanaKoNaamData.map((item) => (
                            <SelectItem
                              key={item.yojanaKoNaam}
                              value={item.yojanaKoNaam}
                            >
                              {item.yojanaKoNaam}
                            </SelectItem>
                          ))}
                        </Select>
                        <div className="flex w-full gap-8">
                          <Input
                            type="text"
                            label="ठेगाना"
                            size="sm"
                            className="w-[70%]"
                            value={yojanaThegana}
                            onChange={(e) => setYojanaThegana(e.target.value)}
                          />
                          <Input
                            type="text"
                            label=" "
                            size="sm"
                            className="w-[30%]"
                            value={yojanaTheganaChild}
                            onChange={(e) =>
                              setYojanaTheganaChild(e.target.value)
                            }
                          />
                        </div>
                        <Input
                          type="text"
                          label="योजनाको उद्देश्य"
                          size="sm"
                          value={yojanaUdeskya}
                          onChange={(e) => setYojanaUdeskya(e.target.value)}
                        />
                        <Select
                          label="योजना स्वीकृत गर्ने निकाय"
                          size="sm"
                          fullWidth
                        >
                          {swikritiGarneNikaya.map((items) => (
                            <SelectItem key={items.key}>
                              {items.label}
                            </SelectItem>
                          ))}
                        </Select>
                        <form className="flex items-center gap-4 ">
                          <label htmlFor="date">योजना सुरू हुने मितिः-</label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            className="rounded-lg border p-1 "
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                            value={yojanaSuruhuneMiti}
                            onChange={(value: string) =>
                              setYojanaSuruhuneMiti(value)
                            }
                          />
                        </form>
                        <form className="flex items-center gap-2 ">
                          <label htmlFor="date">
                            योजना सम्पन्न हुने मितिः-
                          </label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            className="rounded-lg border p-1 "
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                            value={yojanaSsampanaHuneMiti}
                            onChange={(value: string) =>
                              setYojanaSsampanaHuneMiti(value)
                            }
                          />
                        </form>
                        <p>आयोजनाको लागत अनुमानबाट प्राविधिक विवरण</p>
                        <div className="flex gap-2">
                          <Select label="योजना कार्य" size="sm" fullWidth>
                            {yojanaKoKaryaData.map((items) => (
                              <SelectItem key={items.key}>
                                {items.label}
                              </SelectItem>
                            ))}
                          </Select>
                          <Select label="किसिम / प्रकार" size="sm" fullWidth>
                            {kisimPrakarData.map((items) => (
                              <SelectItem key={items.key}>
                                {items.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            label="लम्बाइ मि."
                            size="sm"
                            value={lambaiMi}
                            onChange={(e) => setLambaiMi(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="क्षेत्रफल"
                            size="sm"
                            value={chetrafal}
                            onChange={(e) => setChetrafal(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="2" title="लागत श्रोतको विवरण">
              <Card>
                <CardBody>
                  <div>
                    <div className="flex gap-8">
                      <div className=" w-2/5">
                        <p>लागत विवरण</p>
                        <br />
                        <div className="flex flex-col gap-2">
                          <Input
                            type="text"
                            label="लागत अनुमान रु."
                            size="sm"
                            value={lagatAnumanRu}
                            onChange={(e) => setLagatAnumanRu(e.target.value)}
                          />
                          <p className="text-blue-600 underline">
                            लागत व्यहोर्ने निकायहरु
                          </p>
                          <Input
                            type="text"
                            label="बिनबत कचयत"
                            size="sm"
                            value={binbatkachyat}
                            onChange={(e) => setBinbatkachyat(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="जनश्रमदान रु."
                            size="sm"
                            value={janaSramdanRu}
                            onChange={(e) => setJanaSramdanRu(e.target.value)}
                          />
                        </div>
                        <br />
                        <Input
                          isDisabled
                          type="text"
                          label="जम्मा रकम रु."
                          labelPlacement="outside-left"
                          size="lg"
                          className="font-bold"
                          value={jammaRakamRuTwo}
                          onChange={(e) => setJammaRakamRuTwo(e.target.value)}
                        />
                      </div>

                      <div className="flex w-3/5 flex-col gap-2">
                        <p className="text-blue-600">
                          निर्माण सामाग्रीको विवरणः-
                        </p>
                        <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn className="w-56">
                              सामाग्री उपलब्ध गराउने निकाय
                            </TableColumn>
                            <TableColumn className="w-28">परिमाण</TableColumn>
                            <TableColumn className="w-40">
                              सामाग्रीको नाम
                            </TableColumn>
                            <TableColumn className="w-24">एकाई</TableColumn>
                            <TableColumn className="w-28">श्रम रु.</TableColumn>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>१.नेपाल सरकारबाट रु.</TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={nepalsarkarbataRuPariman}
                                  onChange={(e) =>
                                    setNepalsarkarbataRuPariman(e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={nepalsarkarbataRuSamagrikoNaam}
                                  onChange={(e) =>
                                    setNepalsarkarbataRuSamagrikoNaam(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {test.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={nepalsarkarbataRuShramRu}
                                  onChange={(e) =>
                                    setNepalsarkarbataRuShramRu(e.target.value)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>२.नगरपालिकाबाट रु.</TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={nagarpalikabataRuPariman}
                                  onChange={(e) =>
                                    setNagarpalikabataRuPariman(e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={nagarpalikabataRuSamagrikoNaam}
                                  onChange={(e) =>
                                    setNagarpalikabataRuSamagrikoNaam(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {test.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={nagarpalikabataRuShramRu}
                                  onChange={(e) =>
                                    setNagarpalikabataRuShramRu(e.target.value)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>३.गाउँपालिकाबाट रु.</TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={gaupalikaBataRuPariman}
                                  onChange={(e) =>
                                    setGaupalikaBataRuPariman(e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={gaupalikaBataRuSamagrikoNaam}
                                  onChange={(e) =>
                                    setGaupalikaBataRuSamagrikoNaam(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {test.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={gaupalikaBataRuShramRu}
                                  onChange={(e) =>
                                    setGaupalikaBataRuShramRu(e.target.value)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                ४.गैर सरकारी संघ संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={gairsarkariSanghRuPariman}
                                  onChange={(e) =>
                                    setGairsarkariSanghRuPariman(e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={gairsarkariSanghRuSamagrikoNaam}
                                  onChange={(e) =>
                                    setGairsarkariSanghRuSamagrikoNaam(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {test.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={gairsarkariSanghRuShramRu}
                                  onChange={(e) =>
                                    setGairsarkariSanghRuShramRu(e.target.value)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                ५.समुदायमा आधारित संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={samudayamaAdharitRuPariman}
                                  onChange={(e) =>
                                    setSamudayamaAdharitRuPariman(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={samudayamaAdharitRuSamagrikoNaam}
                                  onChange={(e) =>
                                    setSamudayamaAdharitRuSamagrikoNaam(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {test.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={samudayamaAdharitRuShramRu}
                                  onChange={(e) =>
                                    setSamudayamaAdharitRuShramRu(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                ६.विदेशी दातृ संघ,संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={bideshDatriSanghRuPariman}
                                  onChange={(e) =>
                                    setBideshDatriSanghRuPariman(e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={bideshDatriSanghRuSamagrikoNaam}
                                  onChange={(e) =>
                                    setBideshDatriSanghRuSamagrikoNaam(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {test.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={bideshDatriSanghRuShramRu}
                                  onChange={(e) =>
                                    setBideshDatriSanghRuShramRu(e.target.value)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>७.लागत सहभागिताबाट रु.</TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={lagatSahavagitaRuPariman}
                                  onChange={(e) =>
                                    setLagatSahavagitaRuPariman(e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={lagatSahavagitaRuSamagrikoNaam}
                                  onChange={(e) =>
                                    setLagatSahavagitaRuSamagrikoNaam(
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {test.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={lagatSahavagitaRuShramRu}
                                  onChange={(e) =>
                                    setLagatSahavagitaRuShramRu(e.target.value)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>८.अन्य निकायबाट रु.</TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={anyaNikayaRuPariman}
                                  onChange={(e) =>
                                    setAnyaNikayaRuPariman(e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={anyaNikayaRuSamagrikoNaam}
                                  onChange={(e) =>
                                    setAnyaNikayaRuSamagrikoNaam(e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {test.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="text"
                                  label=""
                                  size="sm"
                                  value={anyaNikayaRuShramRu}
                                  onChange={(e) =>
                                    setAnyaNikayaRuShramRu(e.target.value)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <div className="flex gap-2 overflow-auto">
                          <Input
                            label="घर परिवार संख्या"
                            size="sm"
                            className="w-40"
                            value={gharpariwarSankhya}
                            onChange={(e) =>
                              setGharpariwarSankhya(e.target.value)
                            }
                          />
                          <Input
                            label=" जनसंख्या"
                            size="sm"
                            className="w-40"
                            value={janaSankhya}
                            onChange={(e) => setJanaSankhya(e.target.value)}
                          />
                          <Input
                            label="समुदाय"
                            size="sm"
                            className="w-40"
                            value={samudaya}
                            onChange={(e) => setSamudaya(e.target.value)}
                          />
                          <Input
                            label=" समुदायमा आधारित / गैर सरकारी संस्था"
                            size="sm"
                            className="w-64"
                            value={samudayaAdharit}
                            onChange={(e) => setSamudayaAdharit(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="3" title="उ.स/ संघ सस्थाको विवरण">
              <Card>
                <CardBody>
                  <div>
                    <p className="underline">
                      क.उपभोक्ता समिति/संघ सस्था / समुदायमा आधारित संघ सस्थाको
                      विवरण
                    </p>
                    <div className="mt-2 flex flex-col gap-2">
                      {/* <Select label="काम गर्ने निकाय" placeholder="" size="sm">
                        {test.map((animal) => (
                          <SelectItem key={animal.key}>
                            {animal.label}
                          </SelectItem>
                        ))}
                      </Select> */}
                      <Input
                        type="text"
                        label="काम गर्ने निकाय"
                        size="sm"
                        value={kamgarneNikaya}
                        onChange={(e) => setKamgarneNikaya(e.target.value)}
                      />
                      <Input
                        type="text"
                        label="उपवोक्ता समिति"
                        size="sm"
                        value={upavoktaSamiti}
                        onChange={(e) => setUpavoktaSamiti(e.target.value)}
                      />

                      <form className="flex items-center gap-2 pl-2 sm:p-0">
                        <label htmlFor="date" className="block text-sm">
                          गठन भएको मिति
                        </label>
                        <NepaliDatePicker
                          inputClassName="form-control"
                          className="rounded-lg border p-1"
                          value={gathanVayekoMiti}
                          onChange={(value: string) =>
                            setGathanVayekoMiti(value)
                          }
                          options={{ calenderLocale: "ne", valueLocale: "en" }}
                        />
                      </form>
                      <p className="underline">
                        ख. पदाधिकारीकोहरुको नाम र ठेगाना
                      </p>
                      <div className="flex w-full gap-8">
                        <div className="flex w-full flex-col gap-2">
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              label="१. अध्यक्ष"
                              size="sm"
                              value={adhyakchya}
                              onChange={(e) => setAdhyakchya(e.target.value)}
                            />
                            <Input
                              type="text"
                              label="ना.प्र.न."
                              size="sm"
                              value={adhyakchyaNaPraNa}
                              onChange={(e) =>
                                setAdhyakchyaNaPraNa(e.target.value)
                              }
                            />
                          </div>
                          <Input
                            type="text"
                            label="२.उपाध्यक्ष"
                            size="sm"
                            className="w-1/2"
                            value={upadhyekchya}
                            onChange={(e) => setUpadhyekchya(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              label="३. सचिव"
                              size="sm"
                              value={sachib}
                              onChange={(e) => setSachib(e.target.value)}
                            />
                            <Input
                              type="text"
                              label="ना.प्र.न."
                              size="sm"
                              value={sachibNaPraNa}
                              onChange={(e) => setSachibNaPraNa(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              label="४. कोषाध्यक्ष"
                              size="sm"
                              value={kosaAdakshya}
                              onChange={(e) => setKosaAdakshya(e.target.value)}
                            />
                            <Input
                              type="text"
                              label="ना.प्र.न."
                              size="sm"
                              value={kosaAdakshyaNaPraNa}
                              onChange={(e) =>
                                setKosaAdakshyaNaPraNa(e.target.value)
                              }
                            />
                          </div>
                          <Input
                            type="text"
                            label="५. सदस्य"
                            size="sm"
                            className="w-1/2"
                            value={sadasyaOne}
                            onChange={(e) => setSadasyaOne(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="६. सदस्य"
                            size="sm"
                            className="w-1/2"
                            value={sadasyaTwo}
                            onChange={(e) => setSadasyaTwo(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="७. सदस्य"
                            size="sm"
                            className="w-1/2"
                            value={sadasyaThree}
                            onChange={(e) => setSadasyaThree(e.target.value)}
                          />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <Input
                            type="text"
                            label="८. सदस्य"
                            size="sm"
                            className="w-1/2"
                            value={sadasyaFour}
                            onChange={(e) => setSadasyaFour(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="९. सदस्य"
                            size="sm"
                            className="w-1/2"
                            value={sadasyaFive}
                            onChange={(e) => setSadasyaFive(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="१०. सदस्य"
                            size="sm"
                            className="w-1/2"
                            value={sadasyaSix}
                            onChange={(e) => setSadasyaSix(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="११. सदस्य"
                            size="sm"
                            className="w-1/2"
                            value={sadasyaSeven}
                            onChange={(e) => setSadasyaSeven(e.target.value)}
                          />
                          <Input
                            type="text"
                            label="गठन गर्दा उपस्थित लाभान्वितको संख्या"
                            size="sm"
                            value={gathanGardaUpastithi}
                            onChange={(e) =>
                              setGathanGardaUpastithi(e.target.value)
                            }
                          />
                          <Input
                            type="text"
                            label="समितिमा जम्मा सदस्य संख्या"
                            size="sm"
                            value={samitimaJamma}
                            onChange={(e) => setSamitimaJamma(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              label="महिला सदस्य संख्या"
                              size="sm"
                              value={mahilaSadasya}
                              onChange={(e) => setMahilaSadasya(e.target.value)}
                            />
                            <Button color="primary">अनुगमन सदस्य</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="4" title="किस्ता तथा मर्मत विवरण">
              <Card>
                <CardBody>
                  <Table aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn className="w-36">किस्ता क्रम</TableColumn>
                      <TableColumn className="w-32">मिति</TableColumn>
                      <TableColumn className="w-32">प्रतिशत %</TableColumn>
                      <TableColumn className="w-36">किस्ताको रकम</TableColumn>
                      <TableColumn className="w-44">
                        निर्माण सामाग्री परिमाण
                      </TableColumn>
                      <TableColumn className="">कैफियत</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>पहिलो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
                            <NepaliDatePicker
                              inputClassName="form-control"
                              className="rounded-lg border p-1 "
                              value={pahiloKistaMiti}
                              onChange={(value: string) =>
                                setPahiloKistaMiti(value)
                              }
                              options={{
                                calenderLocale: "ne",
                                valueLocale: "en",
                              }}
                            />
                          </form>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={pahiloKistaPratisad}
                            onChange={(e) =>
                              setPahiloKistaPratisad(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={pahiloKistaKistaKoRakam}
                            onChange={(e) =>
                              setPahiloKistaKistaKoRakam(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={pahiloKistaNirmanSamagri}
                            onChange={(e) =>
                              setPahiloKistaNirmanSamagri(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={pahiloKistaKaifiyat}
                            onChange={(e) =>
                              setPahiloKistaKaifiyat(e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>दोश्रो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
                            <NepaliDatePicker
                              inputClassName="form-control"
                              className="rounded-lg border p-1 "
                              value={dosroKistaMiti}
                              onChange={(value: string) =>
                                setDosroKistaMiti(value)
                              }
                              options={{
                                calenderLocale: "ne",
                                valueLocale: "en",
                              }}
                            />
                          </form>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={dosroKistaPratisat}
                            onChange={(e) =>
                              setDosroKistaPratisat(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={dosroKistaKistaKoRakam}
                            onChange={(e) =>
                              setDosroKistaKistaKoRakam(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={dosroKistaNirmanSamagri}
                            onChange={(e) =>
                              setDosroKistaNirmanSamagri(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={dosroKistaKaifiyat}
                            onChange={(e) =>
                              setDosroKistaKaifiyat(e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>तेश्रो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
                            <NepaliDatePicker
                              inputClassName="form-control"
                              className="rounded-lg border p-1 "
                              value={tesroKistaMiti}
                              onChange={(value: string) =>
                                setTesroKistaMiti(value)
                              }
                              options={{
                                calenderLocale: "ne",
                                valueLocale: "en",
                              }}
                            />
                          </form>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={tesroKistaPratisat}
                            onChange={(e) =>
                              setTesroKistaPratisat(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={tesroKistaKistaKoRakam}
                            onChange={(e) =>
                              setTesroKistaKistaKoRakam(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={tesroKistaNirmanSamagri}
                            onChange={(e) =>
                              setTesroKistaNirmanSamagri(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            label=""
                            size="sm"
                            value={tesroKistaKaifiyat}
                            onChange={(e) =>
                              setTesroKistaKaifiyat(e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <br />
                  <Input
                    type="text"
                    label="जम्मा रकम रु."
                    labelPlacement="outside-left"
                    size="lg"
                    className="font-bold sm:ml-96"
                    value={jammaRakamRuTwoFour}
                    onChange={(e) => setJammaRakamRuTwoFour(e.target.value)}
                  />
                  <br />
                  <div>
                    <div className="">
                      <div className="">
                        <p className="text-blue-600">
                          आयोजना मर्मत सम्भार व्यहोर्ने व्यवस्था (मासिक,
                          चौमासिक, वार्षिक श्रोत)
                        </p>
                        <br />
                        <div className="flex flex-col gap-2 overflow-auto">
                          <Input
                            type="text"
                            label="क.मर्मत सम्भारको जिम्मा लिने समिति / संस्थाको नाम"
                            size="sm"
                            className="w-[90%]"
                            value={marmatSambhar}
                            onChange={(e) => setMarmatSambhar(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              label="ख. जनश्रमदान (श्रमशक्ति संख्या)"
                              size="sm"
                              value={janaSramdan}
                              onChange={(e) => setJanaSramdan(e.target.value)}
                            />
                            <Input
                              type="text"
                              label="ग. दस्तुर, चन्दा रु."
                              size="sm"
                              value={dastur}
                              onChange={(e) => setDastur(e.target.value)}
                            />

                            <Input
                              type="text"
                              label="घ. ब्याज, अन्य बचत रु."
                              size="sm"
                              value={byaj}
                              onChange={(e) => setByaj(e.target.value)}
                            />
                            <Input
                              type="text"
                              label="ङ. लागत सहभागिता वा अनुदानबाट रु."
                              size="sm"
                              value={lagatSahavagita}
                              onChange={(e) =>
                                setLagatSahavagita(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="5" title="प्राविधिक तथा अन्य विवरण">
              <Card>
                <CardBody>
                  <div>
                    <ScrollShadow className="h-60 text-sm">
                      <Content />
                    </ScrollShadow>
                    <p className="mt-2 text-blue-600 underline">अन्य शर्तहरु</p>
                    <div className="flex gap-2">
                      <div className="flex w-full flex-col gap-2">
                        <Textarea
                          className="h-20"
                          placeholder="1"
                          value={anyaSartHaruOne}
                          onChange={(e) => setAnyaSartHaruOne(e.target.value)}
                        />
                        <Textarea
                          className="h-20"
                          placeholder="2"
                          value={anyaSartHaruTwo}
                          onChange={(e) => setAnyaSartHaruTwo(e.target.value)}
                        />
                      </div>
                      <div className="w-full ">
                        <div className="flex gap-2">
                          <div className="flex w-full flex-col gap-2">
                            {/* <Select
                              label="कार्यालय तर्फबाट "
                              placeholder=""
                              size="sm"
                            >
                              {test.map((animal) => (
                                <SelectItem key={animal.key}>
                                  {animal.label}
                                </SelectItem>
                              ))}
                            </Select> */}
                            <Select
                              label="कार्यालय तर्फबाट "
                              size="sm"
                              placeholder="Select an option" // Optional: if you want a placeholder
                              selectedKeys={
                                karyalayaKoTarfabata
                                  ? new Set([karyalayaKoTarfabata])
                                  : new Set()
                              }
                              onSelectionChange={(keys) => {
                                const selectedValue =
                                  Array.from(keys).join(", ")
                                setKaryalayaKoTarfabata(selectedValue)
                              }}
                            >
                              {karmachariKoNaamData.map((item) => (
                                <SelectItem key={item.id} value={item.name}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </Select>

                            {/* <Select
                              label="योजना शाखा तर्फबाट"
                              placeholder=""
                              size="sm"
                            >
                              {test.map((animal) => (
                                <SelectItem key={animal.key}>
                                  {animal.label}
                                </SelectItem>
                              ))}
                            </Select> */}

                            <Select
                              label="योजना शाखा तर्फबाट"
                              size="sm"
                              placeholder="Select an option"
                              selectedKeys={
                                yojanaSakhaTarfabataChild
                                  ? new Set([yojanaSakhaTarfabataChild])
                                  : new Set()
                              }
                              onSelectionChange={(keys) => {
                                const selectedValue =
                                  Array.from(keys).join(", ")
                                setKaryalayaKoTarfabata(selectedValue)
                              }}
                            >
                              {karmachariKoNaamData.map((item) => (
                                <SelectItem key={item.id} value={item.name}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="flex w-full flex-col gap-2">
                            <Select
                              size="sm"
                              label="कर्मचारी पद "
                              placeholder="select"
                              value={karyalayaKoTarfabataChild}
                              onChange={(e) =>
                                setKaryalayaKoTarfabataChild(e.target.value)
                              }
                            >
                              <SelectItem key="प्रमुख प्रशासकिय अधिकृत">
                                प्रमुख प्रशासकिय अधिकृत
                              </SelectItem>
                              <SelectItem key=" निमित्त प्रमुख प्रशासकिय अधिकृत">
                                निमित्त प्रमुख प्रशासकिय अधिकृत
                              </SelectItem>
                              <SelectItem key="प्रशासकीय  अधिकृत ">
                                प्रशासकीय अधिकृत
                              </SelectItem>
                              <SelectItem key="अधिकृतस्तर आठौँ">
                                अधिकृतस्तर आठौँ
                              </SelectItem>
                              <SelectItem key="अधिकृतस्तर सातौँ">
                                अधिकृतस्तर सातौँ
                              </SelectItem>
                              <SelectItem key="लेखा अधिकृत">
                                लेखा अधिकृत
                              </SelectItem>
                              <SelectItem key="अधिकृतस्तर छैठौँ">
                                अधिकृतस्तर छैठौँ
                              </SelectItem>
                              <SelectItem key="कार्यक्रम अधिकृत">
                                कार्यक्रम अधिकृत
                              </SelectItem>
                              <SelectItem key="योजना अधिकृत">
                                योजना अधिकृत
                              </SelectItem>
                              <SelectItem key="शाखा अधिकृत">
                                शाखा अधिकृत{" "}
                              </SelectItem>
                              <SelectItem key="इन्जिनियर">इन्जिनियर</SelectItem>
                              <SelectItem key="सहायकस्तर पाचौँ">
                                सहायकस्तर पाचौँ
                              </SelectItem>
                              <SelectItem key="सहायकस्तर चौथो">
                                सहायकस्तर चौथो
                              </SelectItem>
                            </Select>
                            <Select
                              size="sm"
                              label="कर्मचारी पद "
                              placeholder="select"
                              value={yojanaSakhaTarfabataChild}
                              onChange={(e) =>
                                setYojanaSakhaTarfabataChild(e.target.value)
                              }
                            >
                              <SelectItem key="प्रमुख प्रशासकिय अधिकृत">
                                प्रमुख प्रशासकिय अधिकृत
                              </SelectItem>
                              <SelectItem key=" निमित्त प्रमुख प्रशासकिय अधिकृत">
                                निमित्त प्रमुख प्रशासकिय अधिकृत
                              </SelectItem>
                              <SelectItem key="प्रशासकीय  अधिकृत ">
                                प्रशासकीय अधिकृत
                              </SelectItem>
                              <SelectItem key="अधिकृतस्तर आठौँ">
                                अधिकृतस्तर आठौँ
                              </SelectItem>
                              <SelectItem key="अधिकृतस्तर सातौँ">
                                अधिकृतस्तर सातौँ
                              </SelectItem>
                              <SelectItem key="लेखा अधिकृत">
                                लेखा अधिकृत
                              </SelectItem>
                              <SelectItem key="अधिकृतस्तर छैठौँ">
                                अधिकृतस्तर छैठौँ
                              </SelectItem>
                              <SelectItem key="कार्यक्रम अधिकृत">
                                कार्यक्रम अधिकृत
                              </SelectItem>
                              <SelectItem key="योजना अधिकृत">
                                योजना अधिकृत
                              </SelectItem>
                              <SelectItem key="शाखा अधिकृत">
                                शाखा अधिकृत{" "}
                              </SelectItem>
                              <SelectItem key="इन्जिनियर">इन्जिनियर</SelectItem>
                              <SelectItem key="सहायकस्तर पाचौँ">
                                सहायकस्तर पाचौँ
                              </SelectItem>
                              <SelectItem key="सहायकस्तर चौथो">
                                सहायकस्तर चौथो
                              </SelectItem>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
        <div className="flex justify-between gap-1 overflow-auto">
          <Button color="primary" startContent={<FaPrint />}>
            Sign Board
          </Button>
          <div className="flex gap-2">
            <Button startContent={<GrDocumentPdf />} color="default">
              Add PDF Files
            </Button>
            <Button startContent={<AiOutlineFileAdd />} color="default">
              Add Images/Photo
            </Button>
            <Button
              color="secondary"
              startContent={<FaRegSave />}
              onClick={onSubmit}
            >
              {saveOrEdit}
            </Button>

            <Button
              color="default"
              startContent={<FaRegSave />}
              onClick={async () => {
                if (!yojanaKaryaKramKoNaam) {
                  alert("Please select yojana")
                  return
                }

                try {
                  const response =
                    await fetchDataByYojanaKaryakramKonaamInYojanaSamjhauta(
                      pid,
                      value || ""
                    )

                  // Ensure response.data exists and is not empty
                  if (
                    response.status === "success" &&
                    response.data &&
                    response.data.length > 0
                  ) {
                    // Pass the first item in the data array to printContent
                    yojanaSamjhautaPrint(response.data[0])
                  } else {
                    alert("No data found or error occurred.")
                  }
                } catch (error) {
                  console.error("Error fetching data:", error)
                  alert("An unexpected error occurred.")
                }
              }}
            >
              Print
            </Button>
            <Button
              color="default"
              startContent={<FaRegSave />}
              onClick={() => handleAlertData(yojanaKaryaKramKoNaam)}
            >
              show data for Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
