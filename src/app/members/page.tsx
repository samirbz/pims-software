import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { createPost } from "@/actions/actions"
import { Button } from "@nextui-org/react"

export default async function PostsPage({ params }: any) {
  const posts = await prisma.post.findMany({
    where: {
      slug: params.slug,
    },
  })

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">Comments ({posts.length})</h1>
      <ul className="border-y border-black/10 py-5 leading-8">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link
              href={`/members/posts/${post.slug}`}
              className="flex items-center justify-center gap-4"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="flex w-[300px] flex-col gap-y-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="rounded-sm px-2 py-1"
        />
        <textarea
          name="content"
          rows={5}
          placeholder="Content"
          className="rounded-sm px-2 py-1"
        />
        <Button
          type="submit"
          className="rounded-lg bg-purple-500 p-2 text-white"
        >
          Add Feedback
        </Button>
      </form>
    </main>
  )
}
