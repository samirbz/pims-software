import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react"
import React from "react"

export default function Settings() {
  return (
    <div className="vertical-center  mt-20 flex h-auto">
      <Card className="mx-auto w-10/12 sm:w-96">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <div className=" flex flex-row items-center gap-3">
              <h1 className="text-xl font-semibold">Change Password</h1>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <form>
            <div className="space-y-4">
              <Input
                defaultValue=""
                label="old password"
                variant="bordered"
                type="password"
              />
              <Input
                defaultValue=""
                label="new password"
                variant="bordered"
                type="password"
              />

              <Button fullWidth color="primary" type="submit">
                Reset Password
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
