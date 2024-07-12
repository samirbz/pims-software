import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import React from "react"
import { GiPadlock } from "react-icons/gi"

export default function LoginForm() {
  return (
    <div className="vertical-center mt-20 flex h-auto">
      <Card className="mx-auto w-10/12 sm:w-96">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <div className=" flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Login</h1>
            </div>
            <p className="text-neutral-500">Welcome to PIMS software</p>
          </div>
        </CardHeader>

        <CardBody>
          <form action="">
            <div className="space-y-4">
              <Input defaultValue="" label="username" variant="bordered" />
              <Input defaultValue="" label="password" variant="bordered" />
              <Button fullWidth color="primary" type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
