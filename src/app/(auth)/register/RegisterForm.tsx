"use client"
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react"
import React from "react"
import { useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })

  const onSubmit = (data: RegisterSchema) => {
    console.log(data)
  }

  return (
    <div className="vertical-center mt-20 flex h-auto">
      <Card className="mx-auto w-10/12 sm:w-96">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <div className=" flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Register</h1>
            </div>
            <p className="text-neutral-500">Welcome to PIMS software</p>
          </div>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                defaultValue=""
                label="fullname"
                variant="bordered"
                {...register("fullname")}
                isInvalid={!!errors.fullname}
                errorMessage={errors.fullname?.message}
              />
              <Input
                defaultValue=""
                label="username"
                variant="bordered"
                {...register("username")}
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
              />

              <Select label="role" placeholder="select a role">
                <SelectItem key="user">user</SelectItem>
                <SelectItem key="admin">admin</SelectItem>
              </Select>

              <Input
                defaultValue=""
                label="password"
                variant="bordered"
                type="password"
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />

              <Button
                fullWidth
                color="primary"
                type="submit"
                isDisabled={!isValid}
              >
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
