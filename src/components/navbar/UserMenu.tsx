"use client"

import { signOutUser } from "@/app/actions/authActions"
import { Button } from "@nextui-org/react"
import { Session } from "next-auth"
import Link from "next/link"
import React from "react"

type Props = {
  user: Session["user"]
}

export default function UserMenu({ user }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Signed in as {user?.name}</h1>
      <h1 className="text-3xl">Role: {user?.id}</h1>
      <Button
        as={Link}
        href="/register"
        radius="full"
        className="bg-gradient-to-tr from-blue-700 to-blue-300 text-white shadow-lg"
      >
        Create User
      </Button>
      <Button
        as={Link}
        href="/dashboard"
        radius="full"
        className="bg-gradient-to-tr from-blue-700 to-blue-300 text-white shadow-lg"
      >
        Dashboard
      </Button>
      <Button onClick={async () => signOutUser()} variant="shadow">
        Log out
      </Button>
    </div>
  )
}