"use client"
import {
  memberEditSchema,
  MemberEditSchema,
} from "@/lib/schemas/memberEditSchema"
import { User } from "@prisma/client"
import { Button, Input } from "@nextui-org/react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { updateMemberProfile } from "@/app/actions/userActions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { handleFormServerErrors } from "@/lib/util"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
  user: User
}

export default function EditForm({ user }: Props) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
      })
    }
  }, [user, reset])

  const onSubmit = async (data: MemberEditSchema) => {
    const result = await updateMemberProfile(data)
    if (result.status === "success") {
      toast.success("Profile udpated")
      router.refresh()
      reset({ ...data })
    } else {
      handleFormServerErrors(result, setError)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        variant="bordered"
        {...register("name")}
        defaultValue={user.name ?? ""}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      {errors.root?.serverError && (
        <p className="text-sm text-danger">{errors.root.serverError.message}</p>
      )}
      <Button
        type="submit"
        className="flex self-end"
        variant="solid"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color="secondary"
      >
        Update profile
      </Button>
    </form>
  )
}
