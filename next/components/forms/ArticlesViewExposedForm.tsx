"use client"

import { DrupalTaxonomyTerm } from "next-drupal"
import { useCallback, useRef } from "react"
import { useRouter } from "next/navigation"

type ArticlesViewExposedFormProps = {
  terms: DrupalTaxonomyTerm[]
}

export function ArticlesViewExposedForm(props: ArticlesViewExposedFormProps) {
  const router = useRouter()

  const termsFieldRef = useRef<HTMLSelectElement>(null)
  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      const selectedTermId = termsFieldRef.current?.value
      const urlSearchParams = new URLSearchParams(window.location.search)

      if (selectedTermId) {
        urlSearchParams.set("views-filter[tags]", selectedTermId)
      } else {
        urlSearchParams.delete("views-filter[tags]")
      }

      router.push(`?${urlSearchParams.toString()}`)
    },
    [termsFieldRef, router]
  )

  return (
    <form className="mb-10" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <label htmlFor="tags" className="text-lg font-semibold">
          Filter by tags
        </label>
        <div className="flex flex-row gap-4 items-center">
          <select
            id="tags"
            name="tags"
            className="p-2 border border-gray-300 rounded min-w-[220px] text-base"
            ref={termsFieldRef}
          >
            <option value="">All tags</option>
            {props.terms.map((term) => (
              <option key={term.id} value={term.drupal_internal__tid}>
                {term.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </form>
  )
}
