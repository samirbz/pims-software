"use client"
import React, { useState } from "react"
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
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { FaPrint, FaRegSave } from "react-icons/fa"
import { GrDocumentPdf } from "react-icons/gr"
import { AiOutlineFileAdd } from "react-icons/ai"

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
  const animals = [
    { key: "cat", label: "1234567890123456789" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ]
  const [date, setDate] = useState<string>("")
  return (
    <div className="flex w-full justify-center ">
      <div className="flex w-full flex-col ">
        <div className="overflow-auto">
          <div>
            <h1 className="form-title">
              योजना / कार्यक्रम प्रस्ताव स्वीकृत टिप्पणी
            </h1>
            <br />
            <div className="flex items-center justify-between">
              <Input
                type="text"
                label="वजेट कार्यक्रम "
                size="sm"
                className="w-1/2"
              />
              <p className="text-blue-600">
                चालु आ.वः- २०८०/८१चालु आ.वः- २०८०/८१
              </p>
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
                            value={date}
                            onChange={(value: string) => setDate(value)}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />
                        </form>
                        <br />
                        <div className="flex flex-col gap-2">
                          <p>सम्झौता गर्ने संस्थाको व्यक्तिको विवरण</p>
                          <Input type="text" label="१. नाम" size="sm" />
                          <Input type="text" label="२.पद" size="sm" />
                          <Input type="text" label="ठेगाना" size="sm" />
                          <Input type="text" label="४. फोन न." size="sm" />
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
                        <Select label="नाम" size="sm" fullWidth>
                          {animals.map((animal) => (
                            <SelectItem key={animal.key}>
                              {animal.label}
                            </SelectItem>
                          ))}
                        </Select>
                        <div className="flex w-full gap-8">
                          <Input
                            type="text"
                            label="ठेगाना"
                            size="sm"
                            className="w-[70%]"
                          />
                          <Input
                            type="text"
                            label="वोडा "
                            size="sm"
                            className="w-[30%]"
                          />
                        </div>
                        <Input type="text" label="योजनाको उद्देश्य" size="sm" />
                        <Select
                          label="योजना स्वीकृत गर्ने निकाय"
                          size="sm"
                          fullWidth
                        >
                          {animals.map((animal) => (
                            <SelectItem key={animal.key}>
                              {animal.label}
                            </SelectItem>
                          ))}
                        </Select>
                        <form className="flex items-center gap-4 ">
                          <label htmlFor="date">योजना सुरू हुने मितिः-</label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            className="rounded-lg border p-1 "
                            value={date}
                            onChange={(value: string) => setDate(value)}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />
                        </form>
                        <form className="flex items-center gap-2 ">
                          <label htmlFor="date">
                            योजना सम्पन्न हुने मितिः-
                          </label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            className="rounded-lg border p-1 "
                            value={date}
                            onChange={(value: string) => setDate(value)}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />
                        </form>
                        <p>आयोजनाको लागत अनुमानबाट प्राविधिक विवरण</p>
                        <div className="flex gap-2">
                          <Select label="योजना कार्य" size="sm" fullWidth>
                            {animals.map((animal) => (
                              <SelectItem key={animal.key}>
                                {animal.label}
                              </SelectItem>
                            ))}
                          </Select>
                          <Select label="किसिम / प्रकार" size="sm" fullWidth>
                            {animals.map((animal) => (
                              <SelectItem key={animal.key}>
                                {animal.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Input type="text" label="लम्बाइ मि." size="sm" />
                          <Input type="text" label="क्षेत्रफल" size="sm" />
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
                          />
                          <p className="text-blue-600 underline">
                            लागत व्यहोर्ने निकायहरु
                          </p>
                          <Input
                            type="text"
                            label="समानिकरण अनुदान"
                            size="sm"
                          />
                          <Input type="text" label="जनश्रमदान रु." size="sm" />
                        </div>
                        <br />
                        <Input
                          isDisabled
                          type="text"
                          label="जम्मा रकम रु."
                          labelPlacement="outside-left"
                          size="lg"
                          className="font-bold"
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
                            <TableRow key="1">
                              <TableCell>१.नेपाल सरकारबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="2">
                              <TableCell>२.नगरपालिकाबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="3">
                              <TableCell>३.गाउँपालिकाबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>
                                ४.गैर सरकारी संघ संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>
                                ५.समुदायमा आधारित संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>
                                ६.विदेशी दातृ संघ,संस्थाबाट रु.
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>७.लागत सहभागिताबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell>८.अन्य निकायबाट रु.</TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                              <TableCell>
                                <Select label="" className="max-w-xs" size="sm">
                                  {animals.map((animal) => (
                                    <SelectItem key={animal.key}>
                                      {animal.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input type="text" label="" size="sm" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <div className="flex gap-2 overflow-auto">
                          <Input
                            label="घर परिवार संख्या"
                            size="sm"
                            className="w-40"
                          ></Input>
                          <Input
                            label=" जनसंख्या"
                            size="sm"
                            className="w-40"
                          ></Input>
                          <Input
                            label="समुदाय"
                            size="sm"
                            className="w-40"
                          ></Input>
                          <Input
                            label=" समुदायमा आधारित / गैर सरकारी संस्था"
                            size="sm"
                            className="w-64"
                          ></Input>
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
                      <Select
                        label="काम गर्ने निकाय"
                        placeholder="संस्थागत"
                        className="max-w-xs"
                        size="sm"
                      >
                        {animals.map((animal) => (
                          <SelectItem key={animal.key}>
                            {animal.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        type="text"
                        label="कार्यालय तथा संस्थाको नाम"
                        size="sm"
                        className="w-3/5"
                      />
                      <div className="flex w-3/5 gap-8">
                        <Input type="text" label="संस्थाको ठेगाना" size="sm" />
                        <Input type="text" label="पान नं." size="sm" />
                      </div>
                      <p className="underline">
                        कार्यालय तथा संस्थाको प्रतिनिधीको विवरण
                      </p>
                      <div className="flex w-1/2 gap-2">
                        <Input type="text" label="व्यक्तिको नाम" size="sm" />
                        <Input type="text" label="ना.प्र.न." size="sm" />
                      </div>
                      <Input
                        type="text"
                        label="रोहवरको नाम"
                        size="sm"
                        className="w-1/4"
                      />
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
                      <TableRow key="1">
                        <TableCell>पहिलो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
                            <NepaliDatePicker
                              inputClassName="form-control"
                              className="rounded-lg border p-1 "
                              value={date}
                              onChange={(value: string) => setDate(value)}
                              options={{
                                calenderLocale: "ne",
                                valueLocale: "en",
                              }}
                            />
                          </form>
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>दोश्रो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
                            <NepaliDatePicker
                              inputClassName="form-control"
                              className="rounded-lg border p-1 "
                              value={date}
                              onChange={(value: string) => setDate(value)}
                              options={{
                                calenderLocale: "ne",
                                valueLocale: "en",
                              }}
                            />
                          </form>
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>तेश्रो किस्ता</TableCell>
                        <TableCell>
                          <form className="flex items-center gap-4 ">
                            <NepaliDatePicker
                              inputClassName="form-control"
                              className="rounded-lg border p-1 "
                              value={date}
                              onChange={(value: string) => setDate(value)}
                              options={{
                                calenderLocale: "ne",
                                valueLocale: "en",
                              }}
                            />
                          </form>
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="text" label="" size="sm" />
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
                          />
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              label="ख. जनश्रमदान (श्रमशक्ति संख्या)"
                              size="sm"
                            />
                            <Input
                              type="text"
                              label="ग. दस्तुर, चन्दा रु."
                              size="sm"
                            />

                            <Input
                              type="text"
                              label="घ. ब्याज, अन्य बचत रु."
                              size="sm"
                            />
                            <Input
                              type="text"
                              label="ङ. लागत सहभागिता वा अनुदानबाट रु."
                              size="sm"
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
                  <div className="">
                    <ScrollShadow className="h-60 text-sm">
                      <Content />
                    </ScrollShadow>
                    <p className="mt-2 text-blue-600 underline">अन्य शर्तहरु</p>

                    <div className="flex flex-col gap-2">
                      <Textarea className="h-20 max-w-xs" placeholder="1" />
                      <Textarea className="h-20 max-w-xs" placeholder="2" />
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
            <Button startContent={<FaRegSave />} color="secondary">
              Save/Update
            </Button>
            <Button startContent={<FaPrint />} color="primary">
              Print Doc
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
