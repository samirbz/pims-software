"use client"
import { signInUser } from "@/app/actions/authActions"
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"
import { toast } from "react-toastify"

export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  })

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data)
    if (result.status === "success") {
      router.push("/members")
      router.refresh()
    } else {
      toast.error(result.error as string)
    }
  }

  return (
    <div className="vertical-center  mt-20 flex h-auto">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                defaultValue=""
                label="username"
                variant="bordered"
                {...register("username")}
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
              />
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
                isLoading={isSubmitting}
                isDisabled={!isValid}
                fullWidth
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
