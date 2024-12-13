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
export async function saveMukyaSamiti(
  mukhyaSamitiKoNaam: string,
  fiscalyear: string
) {
  try {
    const mukhyaSamiti = await prisma.mukhyaSamitiKoNaam.create({
      data: {
        mukhyaSamitiKoNaam,
        fiscalyear, // Save fiscalyear as well
      },
    })
    return { status: "success", data: mukhyaSamiti }
  } catch (error) {
    console.error("Error in saveMukyaSamiti:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchMukyaSamitiData(fiscalyear: string) {
  try {
    const data = await prisma.mukhyaSamitiKoNaam.findMany({
      where: {
        fiscalyear, // Match the provided fiscalyear
      },
    })
    return data
  } catch (error) {
    console.error("Error fetching Mukya Samiti data:", error)
    throw error
  }
}

export async function deleteMukyaSamitiKoNaam(id: string, fiscalyear: string) {
  try {
    await prisma.mukhyaSamitiKoNaam.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete Mukya Samiti:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function editMukhyaSamitiKonaam(
  id: string,
  mukhyaSamitiKoNaam: string,
  fiscalyear: string
) {
  try {
    const updatedRecord = await prisma.mukhyaSamitiKoNaam.updateMany({
      where: { id, fiscalyear },
      data: {
        mukhyaSamitiKoNaam,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in editMukhyaSamitiKonaam:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

//  2. anudan kisim
export async function saveAnudaanKoNaam(
  anudaanKoNaam: string,
  fiscalyear: string
) {
  try {
    const anudaan = await prisma.anudaanKoNaam.create({
      data: {
        anudaanKoNaam,
        fiscalyear,
      },
    })
    return { status: "success", data: anudaan }
  } catch (error) {
    console.error("Error in saveAnudaanKoNaam:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchAnudaanKoNaamData(fiscalyear: string) {
  try {
    const data = await prisma.anudaanKoNaam.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching Anudaan Ko Naam data:", error)
    throw error
  }
}
export async function deleteAnudaanKoNaam(id: string, fiscalyear: string) {
  try {
    await prisma.anudaanKoNaam.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete Anudaan Ko Naam:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function editAnudaanKoNaam(
  id: string,
  anudaanKoNaam: string,
  fiscalyear: string
) {
  try {
    const updatedRecord = await prisma.anudaanKoNaam.updateMany({
      where: { id, fiscalyear },
      data: {
        anudaanKoNaam,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in editAnudaanKoNaam:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 3.Lagat srot
export async function saveLagatSrot(
  anudanKoKisim: string,
  lagatSrotKoNaam: string,
  fiscalyear: string
) {
  try {
    const dt = await prisma.lagatSrot.create({
      data: {
        anudanKoKisim,
        lagatSrotKoNaam,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in saveLagatSrot:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchLagatSrotData(fiscalyear: string) {
  try {
    const data = await prisma.lagatSrot.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching Lagat Srot data:", error)
    throw error
  }
}

export async function fetchFilterLagatSrotData(
  anudaanKoNaam: string,
  fiscalyear: string
) {
  try {
    const data = await prisma.lagatSrot.findMany({
      where: {
        anudanKoKisim: anudaanKoNaam,
        fiscalyear,
      },
    })
    return data
  } catch (error) {
    console.error("Error fetching lagat srot data:", error)
    throw error
  }
}

export async function deleteLagatSrot(id: string, fiscalyear: string) {
  try {
    await prisma.lagatSrot.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete Lagat Srot:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function editLagatSrot(
  id: string,
  anudanKoKisim: string,
  lagatSrotKoNaam: string,
  fiscalyear: string
) {
  try {
    const updatedRecord = await prisma.lagatSrot.updateMany({
      where: { id, fiscalyear },
      data: {
        anudanKoKisim,
        lagatSrotKoNaam,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in editLagatSrot:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 4.yojana prakar
export async function saveYojanaPrakar(
  yojanaPrakar: string,
  fiscalyear: string
) {
  try {
    const yojana = await prisma.yojanaPrakar.create({
      data: {
        yojanaPrakar,
        fiscalyear,
      },
    })
    return { status: "success", data: yojana }
  } catch (error) {
    console.error("Error in saveYojanaPrakar:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaPrakarData(fiscalyear: string) {
  try {
    const data = await prisma.yojanaPrakar.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching Yojana Prakar data:", error)
    throw error
  }
}
export async function deleteYojanaPrakar(id: string, fiscalyear: string) {
  try {
    await prisma.yojanaPrakar.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editYojanaPrakar(
  id: string,
  yojanaPrakar: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaPrakar.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        yojanaPrakar,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 5.Yojaana karya bivaran
export async function saveYonanaKaryaBivaran(
  yojanaKoKisim: string,
  yojanaKoKarya: string,
  fiscalyear: string
) {
  try {
    const dt = await prisma.yojanaKaryaBivaran.create({
      data: {
        yojanaKoKisim,
        yojanaKoKarya,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaKaryaBivaranData(fiscalyear: string) {
  try {
    const data = await prisma.yojanaKaryaBivaran.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteYojanaKarayBivaran(id: string, fiscalyear: string) {
  try {
    await prisma.yojanaKaryaBivaran.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editYojanaKaryaBivaran(
  id: string,
  yojanaKoKisim: string,
  yojanaKoKarya: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaKaryaBivaran.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        yojanaKoKisim,
        yojanaKoKarya,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 6.yojana chanot nikaya
export async function saveYojanaChanotNikaya(
  yojanaChanotNikaya: string,
  fiscalyear: string
) {
  try {
    const yojana = await prisma.yojanaChanotNikaya.create({
      data: {
        yojanaChanotNikaya,
        fiscalyear,
      },
    })
    return { status: "success", data: yojana }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaChanotNikayaData(fiscalyear: string) {
  try {
    const data = await prisma.yojanaChanotNikaya.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteYojanaChanotNikaya(id: string, fiscalyear: string) {
  try {
    await prisma.yojanaChanotNikaya.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editYojanaChanotNikaya(
  id: string,
  yojanaChanotNikaya: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaChanotNikaya.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        yojanaChanotNikaya,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 7.gapa/nagarpalikako naam
export async function saveGapa(gapa: string, fiscalyear: string) {
  try {
    const dt = await prisma.gapa.create({
      data: {
        gapa,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchGapaData(fiscalyear: string) {
  try {
    const data = await prisma.gapa.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteGapa(id: string, fiscalyear: string) {
  try {
    await prisma.gapa.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editGapa(id: string, gapa: string, fiscalyear: string) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.gapa.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        gapa,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 8.wada num
export async function savewadaNum(wadaNum: string, fiscalyear: string) {
  try {
    const dt = await prisma.wadaNum.create({
      data: {
        wadaNum,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchWadaNumData(fiscalyear: string) {
  try {
    const data = await prisma.wadaNum.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteWadaNum(id: string, fiscalyear: string) {
  try {
    await prisma.wadaNum.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editWadaNum(
  id: string,
  wadaNum: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.wadaNum.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        wadaNum,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 9.Bank bivaran
export async function saveBankBivaran(
  bankKoNaam: string,
  sakha: string,
  fiscalyear: string
) {
  try {
    const dt = await prisma.bankBivaran.create({
      data: {
        bankKoNaam,
        sakha,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchBankBivaranData(fiscalyear: string) {
  try {
    const data = await prisma.bankBivaran.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function fetchBankBivaranByBank(
  fiscalyear: string,
  bankKoNaam: string
) {
  try {
    const data = await prisma.bankBivaran.findMany({
      where: { fiscalyear, bankKoNaam },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteBankBivaran(id: string, fiscalyear: string) {
  try {
    await prisma.bankBivaran.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editBankBivaran(
  id: string,
  bankKoNaam: string,
  sakha: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.bankBivaran.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        bankKoNaam,
        sakha,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
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
  mukhyaSamiti: string,
  fiscalyear: string
) {
  try {
    // Check if a record with the same yojanaKoNaam and wadaNum already exists
    const existingRecord = await prisma.yojanaBudget.findFirst({
      where: {
        yojanaKoNaam,
        wadaNum,
        fiscalyear,
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
        fiscalyear,
      },
    })

    return { status: "success", data: newRecord }
  } catch (error) {
    console.error("Error in saveYojanaBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaBudgetData(fiscalyear: string) {
  try {
    const data = await prisma.yojanaBudget.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteYojanaBudget(id: string, fiscalyear: string) {
  try {
    await prisma.yojanaBudget.deleteMany({
      where: { id, fiscalyear },
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
  biniyojanBudget: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaBudget.updateMany({
      where: {
        id,
        fiscalyear,
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
  chaniyekoMukhyaYojana: string,
  fiscalyear: string
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
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

//  yojan darta auto fill

export async function fetchYojanaBudgetDataSecond(fiscalyear: string) {
  try {
    const data = await prisma.yojanaBudgetSecond.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}

export async function deleteYojanaBudgetSecond(id: string, fiscalyear: string) {
  try {
    await prisma.yojanaBudgetSecond.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function deleteYojanaBudgetChaniyekoMukhyaYojanaSecond(
  chaniyekoMukhyaYojana: string,
  fiscalyear: string
) {
  try {
    // Check if no records match the chaniyekoMukhyaYojana
    const existingRecords = await prisma.yojanaBudgetSecond.findMany({
      where: { chaniyekoMukhyaYojana, fiscalyear },
    })

    if (existingRecords.length === 0) {
      // No matching records found, proceed to delete
      await prisma.yojanaBudgetSecond.deleteMany({
        where: { chaniyekoMukhyaYojana, fiscalyear },
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
  wadaNumDt: string,
  fiscalyear: string
) {
  try {
    // Fetch all records that match both chaniyekoMukhyaYojana and wadaNum
    const matchingRecords = await prisma.yojanaBudgetSecond.findMany({
      where: {
        chaniyekoMukhyaYojana,
        wadaNumDt, // Ensure wadaNum matches
        fiscalyear,
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
  mukhyaSamiti: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaBudget.updateMany({
      where: {
        id,
        fiscalyear,
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

export async function getIdForYojanaBudgetFromSecondEdit(
  yojanaKoNaam: string,
  wadaNum: string,
  fiscalyear: string
) {
  try {
    // Fetch the record(s) matching yojanaKoNaam and wadaNum, and return the id and biniyojanBudget
    const matchingRecords = await prisma.yojanaBudget.findMany({
      where: {
        yojanaKoNaam,
        wadaNum,
        fiscalyear,
      },
      select: {
        id: true, // Return the id
        biniyojanBudget: true, // Return the biniyojanBudget
      },
    })

    return matchingRecords
  } catch (error) {
    console.error("Error in getIdForYojanaBudgetFromSecondEdit:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function editYojanaBudgetYojanaKoNaamFromFirstEdit(
  oldYojanaKoNaam: string, // Old value to search for
  newYojanaKoNaam: string, // New value to update
  fiscalyear: string
) {
  try {
    // Update all records where chaniyekoMukhyaYojana matches the old value
    const updatedRecord = await prisma.yojanaBudgetSecond.updateMany({
      where: {
        chaniyekoMukhyaYojana: oldYojanaKoNaam,
        fiscalyear, // Match the old value
      },
      data: {
        chaniyekoMukhyaYojana: newYojanaKoNaam, // Set to the new value
      },
    })

    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in editYojanaBudgetYojanaKoNaamFromFirstEdit:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

//  10. yojana budget Edit second
export async function editYojanaBudgetSecond(
  id: string,
  yojanaKoNaamDt: string,
  wadaNumDt: string,
  biniyojanBudgetDt: string,
  chaniyekoMukhyaYojana: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.yojanaBudgetSecond.updateMany({
      where: {
        id,
        fiscalyear,
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
  suchikritHunaChahekoKharid: string,
  fiscalyear: string
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
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchSuchikritFormData(fiscalyear: string) {
  try {
    const data = await prisma.suchikritFarm.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteSuchikritForm(
  id: string,
  fiscalyear: string
): Promise<{ status: string; error?: string }> {
  try {
    await prisma.suchikritFarm.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete record:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function editSuchikritForm(
  id: string,
  formKoNaam: string,
  dartaMiti: string,
  formKoThegana: string,
  panVat: string,
  companyDartaNum: string,
  pramanPatraSankhya: string,
  phoneNum: string,
  suchiDartaNum: string,
  suchikritHunaChahekoKharid: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.suchikritFarm.updateMany({
      where: {
        id,
        fiscalyear,
      },
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
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 12. suchana prakasan
export async function saveSuchanaPrakasan(
  suchanaPrakasan: string,
  fiscalyear: string
) {
  try {
    const dt = await prisma.suchanaPrakasan.create({
      data: {
        suchanaPrakasan,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchSuchanaPrakasanData(fiscalyear: string) {
  try {
    const data = await prisma.suchanaPrakasan.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteSuchanaPrakasan(id: string, fiscalyear: string) {
  try {
    await prisma.suchanaPrakasan.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editSuchanaPrakasan(
  id: string,
  suchanaPrakasan: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.suchanaPrakasan.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        suchanaPrakasan,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 13.Lab Test
export async function saveLabTest(
  karyalayaKoNaam: string,
  thegana: string,
  fiscalyear: string
) {
  try {
    const dt = await prisma.labTest.create({
      data: {
        karyalayaKoNaam,
        thegana,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchLabTestData(fiscalyear: string) {
  try {
    const data = await prisma.labTest.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function deleteLabTest(id: string, fiscalyear: string) {
  try {
    await prisma.labTest.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editLabTest(
  id: string,
  karyalayaKoNaam: string,
  thegana: string,
  fiscalyear: string
) {
  try {
    // Update the record in the database
    const updatedRecord = await prisma.labTest.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        karyalayaKoNaam,
        thegana,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 3-1. yojana darta
export async function saveYojanaDarta(
  sabhaNirnayaMiti: string,
  prastabSwikritMiti: string,
  yojanaKoWada: string,
  yojanaKoNaam: string,
  budgetKitabSnum: string,
  mukhyaSamiti: string,
  anudanKoNaam: string,
  lagatSrotHaru: string,
  lagatSrotAmount: string,
  anudanKoNaam2: string,
  lagatSrotHaru2: string,
  lagatSrotAmount2: string,
  anudanKoNaam3: string,
  lagatSrotHaru3: string,
  lagatSrotAmount3: string,
  yojanaUpachetra: string,
  yojanaKoKisim: string,
  wada: string,
  karyagatSamuha: string,
  prabidhikEstimateAmount: string,
  budgetType: string,
  biniyojitRakam: string,
  yojanaSwikrit: string,
  contengency: string,
  contengencyResult: string,
  marmatRakam: string,
  markmatRakamResult: string,
  dharautiRakam: string,
  dharautiRakamResult: string,
  kulAnudaanRakam: string,
  janaSramdanRakam: string,
  thegana: string,
  gharPariwarSankhya: string,
  janaSankhya: string,
  karyaBivaran: string,
  upalabdhiLakshya: string,
  uplabdhiLakhshyaQty: string,
  barsikYojana: boolean,
  kramagatYojana: boolean,
  fiscalyear: string
) {
  try {
    const dt = await prisma.yojanaDarta.create({
      data: {
        sabhaNirnayaMiti,
        prastabSwikritMiti,
        yojanaKoWada,
        yojanaKoNaam,
        budgetKitabSnum,
        mukhyaSamiti,
        anudanKoNaam,
        lagatSrotHaru,
        lagatSrotAmount,
        anudanKoNaam2,
        lagatSrotHaru2,
        lagatSrotAmount2,
        anudanKoNaam3,
        lagatSrotHaru3,
        lagatSrotAmount3,
        yojanaUpachetra,
        yojanaKoKisim,
        wada,
        karyagatSamuha,
        prabidhikEstimateAmount,
        budgetType,
        biniyojitRakam,
        yojanaSwikrit,
        contengency,
        contengencyResult,
        marmatRakam,
        markmatRakamResult,
        dharautiRakam,
        dharautiRakamResult,
        kulAnudaanRakam,
        janaSramdanRakam,
        thegana,
        gharPariwarSankhya,
        janaSankhya,
        karyaBivaran,
        upalabdhiLakshya,
        uplabdhiLakhshyaQty,
        barsikYojana,
        kramagatYojana,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in yojanadarta:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function fetchYojanaDartaData(fiscalyear: string) {
  try {
    const data = await prisma.yojanaDarta.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}

export async function getYojanaDartaForSwikriti(
  yojanaKoNaam: string,
  fiscalyear: string
) {
  try {
    const data = await prisma.yojanaDarta.findMany({
      where: {
        yojanaKoNaam,
        fiscalyear,
      },
    })
    return data
  } catch (error) {
    console.error("Error fetching Yojana Darta data:", error)
    throw error
  }
}

export async function deleteYojanaDarta(id: string, fiscalyear: string) {
  try {
    await prisma.yojanaDarta.deleteMany({
      where: { id, fiscalyear },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete date:", error)
    return { status: "error", error: "something went wrong" }
  }
}

export async function editYojanaDarta(
  id: string,
  sabhaNirnayaMiti: string,
  prastabSwikritMiti: string,
  yojanaKoWada: string,
  yojanaKoNaam: string,
  budgetKitabSnum: string,
  mukhyaSamiti: string,
  anudanKoNaam: string,
  lagatSrotHaru: string,
  lagatSrotAmount: string,
  anudanKoNaam2: string,
  lagatSrotHaru2: string,
  lagatSrotAmount2: string,
  anudanKoNaam3: string,
  lagatSrotHaru3: string,
  lagatSrotAmount3: string,
  yojanaUpachetra: string,
  yojanaKoKisim: string,
  wada: string,
  karyagatSamuha: string,
  prabidhikEstimateAmount: string,
  budgetType: string,
  biniyojitRakam: string,
  yojanaSwikrit: string,
  contengency: string,
  contengencyResult: string,
  marmatRakam: string,
  markmatRakamResult: string,
  dharautiRakam: string,
  dharautiRakamResult: string,
  kulAnudaanRakam: string,
  janaSramdanRakam: string,
  thegana: string,
  gharPariwarSankhya: string,
  janaSankhya: string,
  karyaBivaran: string,
  upalabdhiLakshya: string,
  uplabdhiLakhshyaQty: string,
  barsikYojana: boolean,
  kramagatYojana: boolean,
  fiscalyear: string
) {
  try {
    const updatedRecord = await prisma.yojanaDarta.updateMany({
      where: {
        id,
        fiscalyear,
      },
      data: {
        sabhaNirnayaMiti,
        prastabSwikritMiti,
        yojanaKoWada,
        yojanaKoNaam,
        budgetKitabSnum,
        mukhyaSamiti,
        anudanKoNaam,
        lagatSrotHaru,
        lagatSrotAmount,
        anudanKoNaam2,
        lagatSrotHaru2,
        lagatSrotAmount2,
        anudanKoNaam3,
        lagatSrotHaru3,
        lagatSrotAmount3,
        yojanaUpachetra,
        yojanaKoKisim,
        wada,
        karyagatSamuha,
        prabidhikEstimateAmount,
        budgetType,
        biniyojitRakam,
        yojanaSwikrit,
        contengency,
        contengencyResult,
        marmatRakam,
        markmatRakamResult,
        dharautiRakam,
        dharautiRakamResult,
        kulAnudaanRakam,
        janaSramdanRakam,
        thegana,
        gharPariwarSankhya,
        janaSankhya,
        karyaBivaran,
        upalabdhiLakshya,
        uplabdhiLakhshyaQty,
        barsikYojana,
        kramagatYojana,
      },
    })
    return { status: "success", data: updatedRecord }
  } catch (error) {
    console.error("Error in updateBiniyojanBudget:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 30-2 samjhauta swikriti tippani
export async function saveYojanaSwikritiTippani(
  pid: string,
  fiscalyear: string,
  aawa: string,
  miti: string,
  upavoktaSamitiKoNaam: string,
  adhyachyaKoNaam: string,
  velamaUpasthitiSankhya: string,
  padakariSankhya: string,
  mahilaSankhya: string,
  anugamanSamitikaSadasya: string,
  ushaGathanMiti: string,
  ushaNibedandiyiyekoMiti: string,
  anyaTipaniBivaran: string,

  yojanakoNaam: string,
  wadaNum: string,
  biniyojitRakamRu: string,
  sanyojak: string,
  sadasyaOne: string,
  sadasyaTwo: string
) {
  try {
    const dt = await prisma.samjhautaSwikritiTippani.create({
      data: {
        pid,
        aawa,
        miti,
        upavoktaSamitiKoNaam,
        adhyachyaKoNaam,
        velamaUpasthitiSankhya,
        padakariSankhya,
        mahilaSankhya,
        anugamanSamitikaSadasya,
        ushaGathanMiti,
        ushaNibedandiyiyekoMiti,
        anyaTipaniBivaran,
        yojanakoNaam,
        wadaNum,
        biniyojitRakamRu,
        sanyojak,
        sadasyaOne,
        sadasyaTwo,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in yojanadarta:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// Get swikriti tippani data
export async function fetchSamjhautaSwikritiData(fiscalyear: string) {
  try {
    const data = await prisma.samjhautaSwikritiTippani.findMany({
      where: { fiscalyear },
    })
    return data
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
export async function fetchDataByYojanaKaryaKramKoNaam(
  fiscalyear: string,
  pid: string
) {
  try {
    const data = await prisma.samjhautaSwikritiTippani.findMany({
      where: {
        fiscalyear,
        pid,
      },
    })

    if (data && data.length > 0) {
      return { status: "success", data }
    } else {
      return { status: "error", error: "No records found" }
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function getSamjhautaSwikritiTippani(
  fiscalyear: string,
  pid: string
) {
  try {
    const data = await prisma.samjhautaSwikritiTippani.findMany({
      where: {
        fiscalyear,
        pid,
      },
    })
    return data
  } catch (error) {
    console.error("Error fetching Yojana Darta data:", error)
    throw error
  }
}

export async function updateYojanaSwikritiTippani(
  pid: string,
  fiscalyear: string,
  aawa: string,
  miti: string,
  upavoktaSamitiKoNaam: string,
  adhyachyaKoNaam: string,
  velamaUpasthitiSankhya: string,
  padakariSankhya: string,
  mahilaSankhya: string,
  anugamanSamitikaSadasya: string,
  ushaGathanMiti: string,
  ushaNibedandiyiyekoMiti: string,
  anyaTipaniBivaran: string,

  yojanakoNaam: string,
  wadaNum: string,
  biniyojitRakamRu: string,
  sanyojak: string,
  sadasyaOne: string,
  sadasyaTwo: string
) {
  try {
    const result = await prisma.samjhautaSwikritiTippani.updateMany({
      where: {
        fiscalyear,
        pid,
      },
      data: {
        aawa,
        miti,
        upavoktaSamitiKoNaam,
        adhyachyaKoNaam,
        velamaUpasthitiSankhya,
        padakariSankhya,
        mahilaSankhya,

        anugamanSamitikaSadasya,
        ushaGathanMiti,
        ushaNibedandiyiyekoMiti,
        anyaTipaniBivaran,
        yojanakoNaam,
        wadaNum,
        biniyojitRakamRu,
        sanyojak,
        sadasyaOne,
        sadasyaTwo,
      },
    })

    if (result.count > 0) {
      return { status: "success", message: "Record updated successfully" }
    } else {
      return { status: "error", error: "No matching record found" }
    }
  } catch (error) {
    console.error("Error updating record:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

// 3-1. yojana samjhauta
export async function saveYojanaSamjhauta(
  pid: string,
  yojanaKaryaKramKoNaam: string,
  budgetKaryakram: string,
  chaluAawa: string,
  samjhautaMiti: string,
  samjhautaNaam: string,
  paad: string,
  samjhautaThegana: string,
  phoneNum: string,
  yonanaNaam: string,
  yojanaThegana: string,
  yojanaTheganaChild: string,
  yojanaUdeskya: string,
  yojanaSwikritiGarneNikaya: string,
  yojanaSuruhuneMiti: string,
  yojanaSsampanaHuneMiti: string,
  yojanaKarya: string,
  kisimPrakar: string,
  lambaiMi: string,
  chetrafal: string,
  lagatAnumanRu: string,
  binbatkachyat: string,
  janaSramdanRu: string,
  jammaRakamRuTwo: string,
  nepalsarkarbataRuPariman: string,
  nagarpalikabataRuPariman: string,
  gaupalikaBataRuPariman: string,
  gairsarkariSanghRuPariman: string,
  samudayamaAdharitRuPariman: string,
  bideshDatriSanghRuPariman: string,
  lagatSahavagitaRuPariman: string,
  anyaNikayaRuPariman: string,
  nepalsarkarbataRuSamagrikoNaam: string,
  nagarpalikabataRuSamagrikoNaam: string,
  gaupalikaBataRuSamagrikoNaam: string,
  gairsarkariSanghRuSamagrikoNaam: string,
  samudayamaAdharitRuSamagrikoNaam: string,
  bideshDatriSanghRuSamagrikoNaam: string,
  lagatSahavagitaRuSamagrikoNaam: string,
  anyaNikayaRuSamagrikoNaam: string,
  nepalsarkarbataRuYekai: string,
  nagarpalikabataRuYekai: string,
  gaupalikaBataRuYekai: string,
  gairsarkariSanghRuYekai: string,
  samudayamaAdharitRuYekai: string,
  bideshDatriSanghRuYekai: string,
  lagatSahavagitaRuYekai: string,
  anyaNikayaRuYekai: string,
  nepalsarkarbataRuShramRu: string,
  nagarpalikabataRuShramRu: string,
  gaupalikaBataRuShramRu: string,
  gairsarkariSanghRuShramRu: string,
  samudayamaAdharitRuShramRu: string,
  bideshDatriSanghRuShramRu: string,
  lagatSahavagitaRuShramRu: string,
  anyaNikayaRuShramRu: string,
  gharpariwarSankhya: string,
  janaSankhya: string,
  samudaya: string,
  samudayaAdharit: string,
  kamgarneNikaya: string,
  upavoktaSamiti: string,
  gathanVayekoMiti: string,
  adhyakchya: string,
  adhyakchyaNaPraNa: string,
  upadhyekchya: string,
  sachib: string,
  sachibNaPraNa: string,
  kosaAdakshya: string,
  kosaAdakshyaNaPraNa: string,
  sadasyaOne: string,
  sadasyaTwo: string,
  sadasyaThree: string,
  sadasyaFour: string,
  sadasyaFive: string,
  sadasyaSix: string,
  sadasyaSeven: string,
  gathanGardaUpastithi: string,
  samitimaJamma: string,
  mahilaSadasya: string,
  pahiloKistaMiti: string,
  pahiloKistaPratisad: string,
  pahiloKistaKistaKoRakam: string,
  pahiloKistaNirmanSamagri: string,
  pahiloKistaKaifiyat: string,
  dosroKistaMiti: string,
  dosroKistaPratisat: string,
  dosroKistaKistaKoRakam: string,
  dosroKistaNirmanSamagri: string,
  dosroKistaKaifiyat: string,
  tesroKistaMiti: string,
  tesroKistaPratisat: string,
  tesroKistaKistaKoRakam: string,
  tesroKistaNirmanSamagri: string,
  tesroKistaKaifiyat: string,
  jammaRakamRuTwoFour: string,
  marmatSambhar: string,
  janaSramdan: string,
  dastur: string,
  byaj: string,
  lagatSahavagita: string,
  anyaSartHaruOne: string,
  anyaSartHaruTwo: string,
  karyalayaKoTarfabata: string,
  karyalayaKoTarfabataChild: string,
  yojanaSakhaTarfabata: string,
  yojanaSakhaTarfabataChild: string,
  fiscalyear: string
) {
  try {
    const dt = await prisma.yojanaSamjhauta.create({
      data: {
        pid,
        yojanaKaryaKramKoNaam,
        budgetKaryakram,
        chaluAawa,
        samjhautaMiti,
        samjhautaNaam,
        paad,
        samjhautaThegana,
        phoneNum,
        yonanaNaam,
        yojanaThegana,
        yojanaTheganaChild,
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
        gharpariwarSankhya,
        janaSankhya,
        samudaya,
        samudayaAdharit,
        kamgarneNikaya,
        upavoktaSamiti,
        gathanVayekoMiti,
        adhyakchya,
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
        gathanGardaUpastithi,
        samitimaJamma,
        mahilaSadasya,
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
        yojanaSakhaTarfabataChild,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in yojanadarta:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function getYojanaSamjhautaData(fiscalyear: string) {
  try {
    const data = await prisma.yojanaSamjhauta.findMany({
      where: {
        fiscalyear,
      },
    })
    return data
  } catch (error) {
    console.error("Error fetching Yojana Darta data:", error)
    throw error
  }
}
export async function getYojanaSamjhauta(
  yojanaKaryaKramKoNaam: string,
  fiscalyear: string,
  pid: string
) {
  try {
    const data = await prisma.yojanaSamjhauta.findMany({
      where: {
        yojanaKaryaKramKoNaam,
        fiscalyear,
        pid,
      },
    })
    return data
  } catch (error) {
    console.error("Error fetching Yojana Darta data:", error)
    throw error
  }
}

export async function fetchDataByYojanaKaryakramKonaamInYojanaSamjhauta(
  yojanaKaryaKramKoNaam: string,
  fiscalyear: string,
  pid: string
) {
  try {
    const data = await prisma.yojanaSamjhauta.findMany({
      where: {
        yojanaKaryaKramKoNaam,
        fiscalyear,
        pid,
      },
    })

    if (data && data.length > 0) {
      return { status: "success", data }
    } else {
      return { status: "error", error: "No records found" }
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function updateYojanaSamjhauta(
  pid: string,
  yojanaKaryaKramKoNaam: string,
  budgetKaryakram: string,
  chaluAawa: string,
  samjhautaMiti: string,
  samjhautaNaam: string,
  paad: string,
  samjhautaThegana: string,
  phoneNum: string,
  yonanaNaam: string,
  yojanaThegana: string,
  yojanaTheganaChild: string,
  yojanaUdeskya: string,
  yojanaSwikritiGarneNikaya: string,
  yojanaSuruhuneMiti: string,
  yojanaSsampanaHuneMiti: string,
  yojanaKarya: string,
  kisimPrakar: string,
  lambaiMi: string,
  chetrafal: string,
  lagatAnumanRu: string,
  binbatkachyat: string,
  janaSramdanRu: string,
  jammaRakamRuTwo: string,
  nepalsarkarbataRuPariman: string,
  nagarpalikabataRuPariman: string,
  gaupalikaBataRuPariman: string,
  gairsarkariSanghRuPariman: string,
  samudayamaAdharitRuPariman: string,
  bideshDatriSanghRuPariman: string,
  lagatSahavagitaRuPariman: string,
  anyaNikayaRuPariman: string,
  nepalsarkarbataRuSamagrikoNaam: string,
  nagarpalikabataRuSamagrikoNaam: string,
  gaupalikaBataRuSamagrikoNaam: string,
  gairsarkariSanghRuSamagrikoNaam: string,
  samudayamaAdharitRuSamagrikoNaam: string,
  bideshDatriSanghRuSamagrikoNaam: string,
  lagatSahavagitaRuSamagrikoNaam: string,
  anyaNikayaRuSamagrikoNaam: string,
  nepalsarkarbataRuYekai: string,
  nagarpalikabataRuYekai: string,
  gaupalikaBataRuYekai: string,
  gairsarkariSanghRuYekai: string,
  samudayamaAdharitRuYekai: string,
  bideshDatriSanghRuYekai: string,
  lagatSahavagitaRuYekai: string,
  anyaNikayaRuYekai: string,
  nepalsarkarbataRuShramRu: string,
  nagarpalikabataRuShramRu: string,
  gaupalikaBataRuShramRu: string,
  gairsarkariSanghRuShramRu: string,
  samudayamaAdharitRuShramRu: string,
  bideshDatriSanghRuShramRu: string,
  lagatSahavagitaRuShramRu: string,
  anyaNikayaRuShramRu: string,
  gharpariwarSankhya: string,
  janaSankhya: string,
  samudaya: string,
  samudayaAdharit: string,
  kamgarneNikaya: string,
  upavoktaSamiti: string,
  gathanVayekoMiti: string,
  adhyakchya: string,
  adhyakchyaNaPraNa: string,
  upadhyekchya: string,
  sachib: string,
  sachibNaPraNa: string,
  kosaAdakshya: string,
  kosaAdakshyaNaPraNa: string,
  sadasyaOne: string,
  sadasyaTwo: string,
  sadasyaThree: string,
  sadasyaFour: string,
  sadasyaFive: string,
  sadasyaSix: string,
  sadasyaSeven: string,
  gathanGardaUpastithi: string,
  samitimaJamma: string,
  mahilaSadasya: string,
  pahiloKistaMiti: string,
  pahiloKistaPratisad: string,
  pahiloKistaKistaKoRakam: string,
  pahiloKistaNirmanSamagri: string,
  pahiloKistaKaifiyat: string,
  dosroKistaMiti: string,
  dosroKistaPratisat: string,
  dosroKistaKistaKoRakam: string,
  dosroKistaNirmanSamagri: string,
  dosroKistaKaifiyat: string,
  tesroKistaMiti: string,
  tesroKistaPratisat: string,
  tesroKistaKistaKoRakam: string,
  tesroKistaNirmanSamagri: string,
  tesroKistaKaifiyat: string,
  jammaRakamRuTwoFour: string,
  marmatSambhar: string,
  janaSramdan: string,
  dastur: string,
  byaj: string,
  lagatSahavagita: string,
  anyaSartHaruOne: string,
  anyaSartHaruTwo: string,
  karyalayaKoTarfabata: string,
  karyalayaKoTarfabataChild: string,
  yojanaSakhaTarfabata: string,
  yojanaSakhaTarfabataChild: string,
  fiscalyear: string
) {
  try {
    const result = await prisma.yojanaSamjhauta.updateMany({
      where: {
        yojanaKaryaKramKoNaam,
        fiscalyear,
        pid,
      },
      data: {
        yojanaKaryaKramKoNaam,
        budgetKaryakram,
        chaluAawa,
        samjhautaMiti,
        samjhautaNaam,
        paad,
        samjhautaThegana,
        phoneNum,
        yonanaNaam,
        yojanaThegana,
        yojanaTheganaChild,
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
        gharpariwarSankhya,
        janaSankhya,
        samudaya,
        samudayaAdharit,
        kamgarneNikaya,
        upavoktaSamiti,
        gathanVayekoMiti,
        adhyakchya,
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
        gathanGardaUpastithi,
        samitimaJamma,
        mahilaSadasya,
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
        yojanaSakhaTarfabataChild,
      },
    })

    if (result.count > 0) {
      return { status: "success", message: "Record updated successfully" }
    } else {
      return { status: "error", error: "No matching record found" }
    }
  } catch (error) {
    console.error("Error updating record:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function saveKaryaDesh(
  pid: string,
  patraSankhya: string,
  date: string,
  yojanaKaryaKramKoNaam: string,
  sansthaKoNaam: string,
  adachyaKoNaam: string,
  lagatAnumanRakam: string,
  nagarpalikaRu: string,
  contengencyRakam: string,
  khudpauneRakam: string,
  budgetKitabSNum: string,
  gathanMiti: string,
  mukhyaSamitiKoNaam: string,
  sabhaNirnayaMiti: string,
  ayojanaSampanaMiti: string,
  karmachariKoNaam: string,
  karmachariKoPaad: string,
  fiscalyear: string
) {
  try {
    const dt = await prisma.karyadesh.create({
      data: {
        pid,
        patraSankhya,
        date,
        yojanaKaryaKramKoNaam,
        sansthaKoNaam,
        adachyaKoNaam,
        lagatAnumanRakam,
        nagarpalikaRu,
        contengencyRakam,
        khudpauneRakam,
        budgetKitabSNum,
        gathanMiti,
        mukhyaSamitiKoNaam,
        sabhaNirnayaMiti,
        ayojanaSampanaMiti,
        karmachariKoNaam,
        karmachariKoPaad,
        fiscalyear,
      },
    })
    return { status: "success", data: dt }
  } catch (error) {
    console.error("Error in data:", error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function updatekaryaDesh(
  patraSankhya: string,
  date: string,
  yojanaKaryaKramKoNaam: string,
  sansthaKoNaam: string,
  adachyaKoNaam: string,
  lagatAnumanRakam: string,
  nagarpalikaRu: string,
  contengencyRakam: string,
  khudpauneRakam: string,
  budgetKitabSNum: string,
  gathanMiti: string,
  mukhyaSamitiKoNaam: string,
  sabhaNirnayaMiti: string,
  ayojanaSampanaMiti: string,
  karmachariKoNaam: string,
  karmachariKoPaad: string,
  fiscalyear: string
) {
  try {
    const result = await prisma.karyadesh.updateMany({
      where: {
        yojanaKaryaKramKoNaam,
        fiscalyear,
      },
      data: {
        patraSankhya,
        date,
        yojanaKaryaKramKoNaam,
        sansthaKoNaam,
        adachyaKoNaam,
        lagatAnumanRakam,
        nagarpalikaRu,
        contengencyRakam,
        khudpauneRakam,
        budgetKitabSNum,
        gathanMiti,
        mukhyaSamitiKoNaam,
        sabhaNirnayaMiti,
        ayojanaSampanaMiti,
        karmachariKoNaam,
        karmachariKoPaad,
        fiscalyear,
      },
    })

    if (result.count > 0) {
      return { status: "success", message: "Record updated successfully" }
    } else {
      return { status: "error", error: "No matching record found" }
    }
  } catch (error) {
    console.error("Error updating record:", error)
    return { status: "error", error: "Something went wrong" }
  }
}
