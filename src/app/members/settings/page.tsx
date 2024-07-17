"use client"

import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react"
import React, { useState } from "react"
import { resetPassword } from "@/app/actions/userActions"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

export default function Settings() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Add validation logic for new password length
    if (newPassword.length < 5) {
      setError("New password must be at least 5 characters long")
      return
    }

    try {
      await resetPassword(oldPassword, newPassword)
      setSuccess("Password reset successful")
    } catch (error) {
      setError("Failed to reset password")
    }
  }

  return (
    <div className="vertical-center mt-20 flex h-auto">
      <Card className="mx-auto w-10/12 sm:w-96">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <div className=" flex flex-row items-center gap-3">
              <h1 className="text-xl font-semibold">Change Password</h1>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Old Password"
                variant="bordered"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
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

              <Input
                label="New Password"
                variant="bordered"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

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
