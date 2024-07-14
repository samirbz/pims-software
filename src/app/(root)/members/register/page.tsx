"use client"
import { registerUser } from "@/app/actions/authActions"
import { RegisterSchema } from "@/lib/schemas/registerSchema"
// import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"
import { IoArrowBack } from "react-icons/io5"
import { toast } from "react-toastify"
import Link from "next/link"

export default function RegisterForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data)

    if (result.status === "success") {
      toast.success("User created successfully")
      router.push("/members")
      router.refresh()
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e: any) => {
          const fieldName = e.path.join(".") as
            | "username"
            | "name"
            | "password"
            | "email"
          setError(fieldName, { message: e.message })
        })
      } else {
        setError("root.serverError", { message: result.error })
      }
    }
  }

  return (
    <div className="vertical-center mt-20 flex h-auto">
      <Card className="mx-auto w-10/12 sm:w-96">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <div className=" flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Create User</h1>
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
                {...register("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
              <Input
                defaultValue=""
                label="username"
                variant="bordered"
                {...register("username")}
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
              />

              <Select
                label="role"
                placeholder="select a role"
                {...register("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              >
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

              {errors.root?.serverError && (
                <p className="text-sm text-danger">
                  {errors.root.serverError.message}
                </p>
              )}

              <Button
                isLoading={isSubmitting}
                fullWidth
                color="primary"
                type="submit"
                isDisabled={!isValid}
              >
                Register
              </Button>
              <Button
                as={Link}
                href="/members"
                fullWidth
                color="default"
                variant="bordered"
                startContent={<IoArrowBack />}
              >
                Return back
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
