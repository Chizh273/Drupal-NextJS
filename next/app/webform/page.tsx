"use client"

import { FormEvent, useRef, useState } from "react"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState<"waiting" | "error" | "success">(
    "waiting"
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(formRef.current as HTMLFormElement)

    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }),
    })

    if (response.ok) {
      setFormState("success")
      formRef.current?.reset()
    }

    if (!response.ok) {
      setFormState("error")
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow">
      {formState === "success" && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Your message has been sent successfully!
        </div>
      )}
      {formState === "error" && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          There was an error sending your message. Please try again.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold mb-6">Contact us</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
