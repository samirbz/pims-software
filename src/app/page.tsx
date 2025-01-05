"use client";
import { signInUser } from "@/actions/authActions";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { GrLogin } from "react-icons/gr";
import { MdCopyright } from "react-icons/md";
import { useMyContext, usePlaceContext, useDistrictContext,useOfficeContext } from "@/context/MyContext";

export default function LoginForm() {
  const { clearValue } = useMyContext();
  const { place } = usePlaceContext();
  const { district } = useDistrictContext();
  const { office } = useOfficeContext();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    clearValue();
    const result = await signInUser(data);
    if (result.status === "success") {
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-200 to-blue-300 p-4">
      <Card className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <CardHeader className="flex flex-col items-center justify-center rounded-t-lg bg-blue-700 py-6">
          <Image
            src="/images/gov-logo.png"
            alt="logo"
            width={60}
            height={60}
            className="mb-2"
            priority
          />
          <p className="text-xl font-bold text-white">{place}</p>
          <p className="text-lg text-gray-100">{office}</p>
          <p className="text-lg font-semibold text-gray-200">{district}</p>
        </CardHeader>

        <CardBody className="bg-gray-50 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Username"
              placeholder="Enter your username"
              variant="bordered"
              {...register("username")}
              radius="lg"
              size="md"
              className="bg-gray-100"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              variant="bordered"
              {...register("password")}
              radius="lg"
              size="md"
              className="bg-gray-100"
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="focus:outline-none"
                >
                  {isVisible ? (
                    <FaRegEye className="text-2xl text-gray-500" />
                  ) : (
                    <FaRegEyeSlash className="text-2xl text-gray-500" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            <div className="flex justify-center">
              <Button
                isLoading={isSubmitting}
                color="primary"
                type="submit"
                radius="md"
                size="lg"
                className="flex items-center gap-2 bg-blue-600 font-semibold text-white hover:bg-blue-600"
              >
                <GrLogin />
                Sign in
              </Button>
            </div>
          </form>
        </CardBody>
        <div className="flex items-center justify-center rounded-b-lg bg-gray-100 py-2 text-sm text-gray-600">
          <MdCopyright className="mr-1" />
          <span>2024 PIMS Software</span>
        </div>
      </Card>
    </div>
  );
}
