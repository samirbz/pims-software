"use client"
import { signInUser } from "@/actions/authActions"
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import Image from "next/image"
import { GrLogin } from "react-icons/gr"
import { MdCopyright } from "react-icons/md"

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
      router.refresh()
    } else {
      toast.error(result.error as string)
    }
  }

  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-t from-blue-200 to-blue-800">
      <Card className=" h-[29rem] w-10/12 sm:w-[26rem]">
        <CardHeader className="flex justify-center">
          <div className="flex flex-col items-center">
            <Image
              src="/images/gov-logo.png"
              alt="logo"
              width={50}
              height={50}
              className=" size-auto"
              priority
            />
            <p className="mr-4 text-xl font-semibold text-blue-600 sm:text-2xl">
              वाणगङ्गा नगरपालिका
            </p>
            <p className="mt-2 whitespace-nowrap text-sm font-semibold text-red-600 sm:text-lg">
              नगर कार्यपालिकाको कार्यालय
            </p>
            <p className="mr-4 text-lg font-semibold text-red-600">कपिलवस्तु</p>
          </div>
        </CardHeader>

        <CardBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="ml-4 flex h-2/5 w-11/12 flex-col items-center space-y-6"
          >
            <Input
              defaultValue=""
              label="username"
              variant="bordered"
              {...register("username")}
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              radius="full"
              size="sm"
            />
            <Input
              defaultValue=""
              radius="full"
              size="sm"
              label="password"
              variant="bordered"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  className="mb-1 focus:outline-none"
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
            <div>
              <Button
                isLoading={isSubmitting}
                isDisabled={!isValid}
                color="primary"
                type="submit"
                radius="sm"
                endContent={<GrLogin />}
                className="mt-2 text-[1rem] font-semibold"
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardBody>
        <p className="mb-2 flex items-center self-center text-sm text-neutral-500">
          <MdCopyright />
          <span>2024 PIMS software</span>
        </p>
      </Card>
    </div>
  )
}
