// server actions

"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  })
  // it will auto refresh website after above task complete
  revalidatePath("/posts")
}

export async function editPost(formData: FormData, id: string) {
  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  })
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } })
}