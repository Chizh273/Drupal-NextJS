"use client"

import React, { FormEvent, useCallback } from "react"
import { DrupalSearchApiFacet } from "next-drupal"
import { useRouter } from "next/navigation"

interface ArticlesSearchFormProps {
  facets: DrupalSearchApiFacet[]
  defaultValues?: Record<string, string | string[]>
}

export function ArticlesSearchForm({
  facets,
  defaultValues,
}: ArticlesSearchFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const router = useRouter()

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const formData = new FormData(formRef.current as HTMLFormElement)
      const fulltext = formData.get("fulltext") as string

      const filters = facets.reduce(
        (acc, facet) => ({
          ...acc,
          [facet.id]: formData.getAll(facet.id).map(String),
        }),
        {} as Record<string, string | string[]>
      )

      // Build query string
      const params = new URLSearchParams()
      if (fulltext) params.set("filter[fulltext]", fulltext)
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(`filter[${key}]`, v))
        } else if (value) {
          params.set(`filter[${key}]`, value)
        }
      })

      router.push(`?${params.toString()}`)
    },
    [facets, router, formRef]
  )

  return (
    <form
      className="mb-8 p-4 border rounded bg-gray-50"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="fulltext" className="block font-semibold mb-2">
          Full text search
        </label>
        <input
          id="fulltext"
          name="fulltext"
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Search articles..."
          defaultValue={defaultValues?.["filter[fulltext]"] || ""}
        />
      </div>

      {facets.map((facet) => (
        <div key={facet.id} className="mb-4">
          <div className="font-semibold mb-2">{facet.label}</div>
          <div className="flex flex-wrap gap-4">
            {facet?.terms?.map((term) => (
              <label
                key={term.values.value}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name={facet.id}
                  value={term.values.value}
                  defaultChecked={
                    defaultValues?.[`filter[${facet.id}]`]?.includes(
                      term.values.value
                    ) || false
                  }
                />
                {term.values.label} ({term.values.count})
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded font-bold"
      >
        Search
      </button>
    </form>
  )
}
