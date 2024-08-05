import React from "react"
import { AntdRegistry } from "@ant-design/nextjs-registry"

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main>
      <AntdRegistry>{children}</AntdRegistry>
    </main>
  )
}
