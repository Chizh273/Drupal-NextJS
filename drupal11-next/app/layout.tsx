import { DraftAlert } from "@/components/misc/DraftAlert"
import { HeaderNav } from "@/components/navigation/HeaderNav"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@/styles/globals.css"
import { drupal } from "@/lib/drupal"

export const metadata: Metadata = {
  title: {
    default: "Next.js for Drupal",
    template: "%s | Next.js for Drupal",
  },
  description: "A Next.js site powered by a Drupal backend.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  const menu = await drupal.getMenu("main")

  return (
    <html lang="en">
      <body>
        <DraftAlert />
        <div className="px-6 mx-auto">
          <HeaderNav menu={menu} />
          <main className="container py-10 mx-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
