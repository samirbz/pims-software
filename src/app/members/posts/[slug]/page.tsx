import { prisma } from "@/lib/prisma"
import Link from "next/link"
import React from "react"

export default async function PostsPage({ params }: any) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  })
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>

      <Link
        href="/members"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  )
}
