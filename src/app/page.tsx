import { Button } from "@nextui-org/react"
import { FaRegSmile } from "react-icons/fa"

export default function Home() {
  return (
    <div>
      <h1>Hello app</h1>
      <Button
        color="primary"
        variant="bordered"
        startContent={<FaRegSmile size={20} />}
      >
        Click me
      </Button>
    </div>
  )
}
