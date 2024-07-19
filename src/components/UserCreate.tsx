"use client"
import { registerUser } from "@/actions/authActions"
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
import { toast } from "react-toastify"
import { handleFormServerErrors } from "@/lib/util"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

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
      handleFormServerErrors(result, setError)
    }
  }

  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="vertical-center mt-4 flex h-auto">
      <Card className="mx-auto w-10/12 sm:w-96">
        <CardHeader className="">
          <h1 className="text-3xl font-semibold">User Setup</h1>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                size="sm"
                defaultValue=""
                label="fullname"
                variant="bordered"
                {...register("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
              <Input
                size="sm"
                defaultValue=""
                label="username"
                variant="bordered"
                {...register("username")}
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
              />

              <Select
                size="sm"
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
                size="sm"
                defaultValue=""
                label="password"
                variant="bordered"
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaRegEye className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <FaRegEyeSlash className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />

              {errors.root?.serverError && (
                <p className="text-sm text-danger">
                  {errors.root.serverError.message}
                </p>
              )}

              <Button
                size="sm"
                isLoading={isSubmitting}
                fullWidth
                color="primary"
                type="submit"
                isDisabled={!isValid}
              >
                Save
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
