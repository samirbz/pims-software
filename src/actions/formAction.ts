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

//  setup
//  mukhya samiti
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
    const fy = await prisma.mukhyaSamitiKoNaam.findMany()
    return fy
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
