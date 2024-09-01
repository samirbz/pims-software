"use server"

import { prisma } from "@/lib/prisma"

export async function saveFiscalYearDate(
  startDate: string,
  endDate: string,
  fy: string
) {
  try {
    const fyRecord = await prisma.fiscalyear.create({
      data: {
        startDate,
        endDate,
        fy,
      },
    })
    return { status: "success", data: fyRecord }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchFyData() {
  try {
    const fy = await prisma.fiscalyear.findMany()
    return fy
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}

export async function deleteFyDate(id: string) {
  try {
    await prisma.fiscalyear.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function saveTskData(
  tayarGarneKoName: string,
  tayarGarneKoPad: string,
  tippaniMaDekhauneHo: boolean,
  tayarGarneKoNaamPadDekhauneHo: boolean,
  peshGarneKoName: string,
  peshGarneKoPad: string,
  peshTippaniMaDekhauneHo: boolean,
  peshGarneKoNaamPadDekhauneHo: boolean,
  sifarishRujuGarne: string,
  sifarishRujuGarneKoPad: string,
  sifarisTippaniMaDekhauneHo: boolean,
  sifarishGarneKoNaamPadDekhauneHo: boolean,
  sadarGarneKoName: string,
  sadarGarneKopad: string,
  sadarTippaniMaDekhauneHo: boolean,
  sadarGarneKoNaamPadDekhauneHo: boolean,
  sifarishRujuGarneAmaanKoNaam: boolean,
  sifarishRujuGarneUpovoktaKoNaam: boolean
) {
  try {
    const tskRecord = await prisma.tskData.create({
      data: {
        tayarGarneKoName,
        tayarGarneKoPad,
        tippaniMaDekhauneHo,
        tayarGarneKoNaamPadDekhauneHo,

        peshGarneKoName,
        peshGarneKoPad,
        peshTippaniMaDekhauneHo,
        peshGarneKoNaamPadDekhauneHo,

        sifarishRujuGarne,
        sifarishRujuGarneKoPad,
        sifarisTippaniMaDekhauneHo,
        sifarishGarneKoNaamPadDekhauneHo,

        sadarGarneKoName,
        sadarGarneKopad,
        sadarTippaniMaDekhauneHo,
        sadarGarneKoNaamPadDekhauneHo,

        sifarishRujuGarneAmaanKoNaam,
        sifarishRujuGarneUpovoktaKoNaam,
      },
    })
    return { status: "success", data: tskRecord }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchTskData() {
  try {
    const tskData = await prisma.tskData.findMany()
    return tskData
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}

export async function deleteTskData(id: string) {
  try {
    await prisma.tskData.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

//  ***************setup menu item********************************
// 1. mukhya samiti
export async function saveMukyaSamiti(mukhyaSamitiKoNaam: string) {
  try {
    const mukhyaSamiti = await prisma.mukhyaSamitiKoNaam.create({
      data: {
        mukhyaSamitiKoNaam,
      },
    })
    return { status: "success", data: mukhyaSamiti }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchMukyaSamitiData() {
  try {
    const data = await prisma.mukhyaSamitiKoNaam.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteMukyaSamitiKoNaam(id: string) {
  try {
    await prisma.mukhyaSamitiKoNaam.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

//  2. anudan kisim
export async function saveAnudaanKoNaam(anudaanKoNaam: string) {
  try {
    const anudaan = await prisma.anudaanKoNaam.create({
      data: {
        anudaanKoNaam,
      },
    })
    return { status: "success", data: anudaan }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchAnudaanKoNaamData() {
  try {
    const data = await prisma.anudaanKoNaam.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteAnudaanKoNaam(id: string) {
  try {
    await prisma.anudaanKoNaam.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

// 3.Lagat srot
export async function saveLagatSrot(
  anudanKoKisim: string,
  lagatSrotKoNaam: string
) {
  try {
    const dt = await prisma.lagatSrot.create({
      data: {
        anudanKoKisim,
        lagatSrotKoNaam,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchLagatSrotData() {
  try {
    const data = await prisma.lagatSrot.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteLagatSrot(id: string) {
  try {
    await prisma.lagatSrot.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

// 4.yojana prakar
export async function saveYojanaPrakar(yojanaPrakar: string) {
  try {
    const yojana = await prisma.yojanaPrakar.create({
      data: {
        yojanaPrakar,
      },
    })
    return { status: "success", data: yojana }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaPrakarData() {
  try {
    const data = await prisma.yojanaPrakar.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteYojanaPrakar(id: string) {
  try {
    await prisma.yojanaPrakar.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}
// 5.Yojaana karya bivaran
export async function saveYonanaKaryaBivaran(
  yojanaKoKisim: string,
  yojanaKoKarya: string
) {
  try {
    const dt = await prisma.yojanaKaryaBivaran.create({
      data: {
        yojanaKoKisim,
        yojanaKoKarya,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaKaryaBivaranData() {
  try {
    const data = await prisma.yojanaKaryaBivaran.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteYojanaKarayBivaran(id: string) {
  try {
    await prisma.yojanaKaryaBivaran.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}
// 6.yojana chanot nikaya
export async function saveYojanaChanotNikaya(yojanaChanotNikaya: string) {
  try {
    const yojana = await prisma.yojanaChanotNikaya.create({
      data: {
        yojanaChanotNikaya,
      },
    })
    return { status: "success", data: yojana }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaChanotNikayaData() {
  try {
    const data = await prisma.yojanaChanotNikaya.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteYojanaChanotNikaya(id: string) {
  try {
    await prisma.yojanaChanotNikaya.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}
// 7.gapa/nagarpalikako naam
export async function saveGapa(gapa: string) {
  try {
    const dt = await prisma.gapa.create({
      data: {
        gapa,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchGapaData() {
  try {
    const data = await prisma.gapa.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteGapa(id: string) {
  try {
    await prisma.gapa.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}
// 8.wada num
export async function savewadaNum(wadaNum: string) {
  try {
    const dt = await prisma.wadaNum.create({
      data: {
        wadaNum,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchWadaNumData() {
  try {
    const data = await prisma.wadaNum.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteWadaNum(id: string) {
  try {
    await prisma.wadaNum.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}
// 9.Bank bivaran
export async function saveBankBivaran(bankKoNaam: string, sakha: string) {
  try {
    const dt = await prisma.bankBivaran.create({
      data: {
        bankKoNaam,
        sakha,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchBankBivaranData() {
  try {
    const data = await prisma.bankBivaran.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteBankBivaran(id: string) {
  try {
    await prisma.bankBivaran.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

// 10.yojana budget badfat
export async function saveYojanaBudget(
  yojanaKoNaam: string,
  wadaNum: string,
  anudanKisim: string,
  biniyojanBudget: string,
  budgetKaryakram: string,
  yojanaKisim: string,
  mukhyaSamiti: string
) {
  try {
    // Check if a record with the same yojanaKoNaam and wadaNum already exists
    const existingRecord = await prisma.yojanaBudget.findFirst({
      where: {
        yojanaKoNaam,
        wadaNum,
      },
    })

    if (existingRecord) {
      return {
        status: "error",
        error: "same yojana in same wada.",
      }
    }

    // If no such record exists, proceed to save the new data
    const newRecord = await prisma.yojanaBudget.create({
      data: {
        yojanaKoNaam,
        wadaNum,
        anudanKisim,
        biniyojanBudget,
        budgetKaryakram,
        yojanaKisim,
        mukhyaSamiti,
      },
    })

    return { status: "success", data: newRecord }
  } catch (error) {
    console.error("Error in saveYojanaBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaBudgetData() {
  try {
    const data = await prisma.yojanaBudget.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteYojanaBudget(id: string) {
  try {
    await prisma.yojanaBudget.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

//  10-1 yojana budget update
export async function updateBiniyojanBudget(
  id: string,
  biniyojanBudget: string 
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaBudget.update({
      where: {
        id,
      },
      data: {
        biniyojanBudget,
      },
    })

    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 10-2yojana budget badfat
export async function saveYojanaBudgetDt(
  yojanaKoNaamDt: string,
  wadaNumDt: string,
  anudanKisimDt: string,
  biniyojanBudgetDt: string,
  budgetKaryakramDt: string,
  yojanaKisimDt: string,
  mukhyaSamitiDt: string,
  chaniyekoMukhyaYojana: string
) {
  try {
    const dt = await prisma.yojanaBudgetSecond.create({
      data: {
        yojanaKoNaamDt,
        wadaNumDt,
        anudanKisimDt,
        biniyojanBudgetDt,
        budgetKaryakramDt,
        yojanaKisimDt,
        mukhyaSamitiDt,
        chaniyekoMukhyaYojana,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaBudgetDataSecond() {
  try {
    const data = await prisma.yojanaBudgetSecond.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}

export async function deleteYojanaBudgetSecond(id: string) {
  try {
    await prisma.yojanaBudgetSecond.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function deleteYojanaBudgetChaniyekoMukhyaYojanaSecond(
  chaniyekoMukhyaYojana: string
) {
  try {
    // Check if no records match the chaniyekoMukhyaYojana
    const existingRecords = await prisma.yojanaBudgetSecond.findMany({
      where: { chaniyekoMukhyaYojana },
    })

    if (existingRecords.length === 0) {
      // No matching records found, proceed to delete
      await prisma.yojanaBudgetSecond.deleteMany({
        where: { chaniyekoMukhyaYojana },
      })

      return { status: "success" }
    } else {
      return { status: "error", error: "Matching records exist, not deleted" }
    }
  } catch (error) {
    console.error("Failed to delete data:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function sumAllChaniyekoMukhyaYojanaBiniyojanBudgetDtSecond(
  chaniyekoMukhyaYojana: string,
  wadaNumDt: string
) {
  try {
    // Fetch all records that match both chaniyekoMukhyaYojana and wadaNum
    const matchingRecords = await prisma.yojanaBudgetSecond.findMany({
      where: {
        chaniyekoMukhyaYojana,
        wadaNumDt, // Ensure wadaNum matches
      },
      select: {
        biniyojanBudgetDt: true,
      },
    })

    // Sum all biniyojanBudgetDt values after converting to number
    const totalBudget = matchingRecords.reduce((sum, record) => {
      return sum + Number(record.biniyojanBudgetDt) || 0 // Ensure to handle any potential NaN values
    }, 0)

    return { status: "success", totalBudget }
  } catch (error) {
    console.error("Failed to calculate budget sum:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

//  10. yojana budget Edit first
export async function editYojanaBudgetFirst(
  id: string,
  yojanaKoNaam: string,
  wadaNum: string,
  anudanKisim: string,
  biniyojanBudget: string,
  budgetKaryakram: string,
  yojanaKisim: string,
  mukhyaSamiti: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaBudget.update({
      where: {
        id,
      },
      data: {
        yojanaKoNaam,
        wadaNum,
        anudanKisim,
        biniyojanBudget,
        budgetKaryakram,
        yojanaKisim,
        mukhyaSamiti,
      },
    })

    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}
//  10. yojana budget Edit second
export async function editYojanaBudgetSecond(
  id: string,
  yojanaKoNaamDt: string,
  wadaNumDt: string,
  biniyojanBudgetDt: string,
  chaniyekoMukhyaYojana: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaBudgetSecond.update({
      where: {
        id,
      },
      data: {
        yojanaKoNaamDt,
        wadaNumDt,
        biniyojanBudgetDt,
        chaniyekoMukhyaYojana,
      },
    })

    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 11. suchikrit form
export async function saveSuchikritForm(
  formKoNaam: string,
  dartaMiti: string,
  formKoThegana: string,
  panVat: string,
  companyDartaNum: string,
  pramanPatraSankhya: string,
  phoneNum: string,
  suchiDartaNum: string,
  suchikritHunaChahekoKharid: string
) {
  try {
    const dt = await prisma.suchikritFarm.create({
      data: {
        formKoNaam,
        dartaMiti,
        formKoThegana,
        panVat,
        companyDartaNum,
        pramanPatraSankhya,
        phoneNum,
        suchiDartaNum,
        suchikritHunaChahekoKharid,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchSuchikritFormData() {
  try {
    const data = await prisma.suchikritFarm.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteSuchikritForm(id: string) {
  try {
    await prisma.suchikritFarm.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

// 12. suchana prakasan
export async function saveSuchanaPrakasan(suchanaPrakasan: string) {
  try {
    const dt = await prisma.suchanaPrakasan.create({
      data: {
        suchanaPrakasan,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchSuchanaPrakasanData() {
  try {
    const data = await prisma.suchanaPrakasan.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteSuchanaPrakasan(id: string) {
  try {
    await prisma.suchanaPrakasan.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

// 13.Lab Test
export async function saveLabTest(karyalayaKoNaam: string, thegana: string) {
  try {
    const dt = await prisma.labTest.create({
      data: {
        karyalayaKoNaam,
        thegana,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchLabTestData() {
  try {
    const data = await prisma.labTest.findMany()
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteLabTest(id: string) {
  try {
    await prisma.labTest.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}
