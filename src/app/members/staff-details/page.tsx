import { createStaff } from "@/actions/actions"
import { Button } from "@nextui-org/react"

export default function StaffPage() {
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <form action={createStaff} className="flex w-[300px] flex-col gap-y-2">
        <input
          type="text"
          name="name"
          placeholder="name"
          className="rounded-sm px-2 py-1"
        />
        <input
          type="text"
          name="position"
          placeholder="position"
          className="rounded-sm px-2 py-1"
        />
        <input
          type="number"
          name="ranking"
          placeholder="ranking"
          className="rounded-sm px-2 py-1"
        />
        <Button
          type="submit"
          className="rounded-lg bg-purple-500 p-2 text-white"
        >
          Submit
        </Button>
      </form>
    </main>
  )
}
