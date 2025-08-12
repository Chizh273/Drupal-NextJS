import { drupal } from "@/lib/drupal"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    const url = drupal.buildUrl("/webform_rest/submit")
    const result = await drupal.fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify({
        webform_id: "contact",
        name,
        email,
        subject,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const content = await result.json()

    if (!result.ok) {
      return new NextResponse(JSON.stringify(content), { status: 400 })
    }

    return NextResponse.json(content)
  } catch (error) {
    console.log("error", error)
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}
