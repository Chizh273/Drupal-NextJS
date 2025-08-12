"use client"

import { useRouter } from "next/navigation"

interface PagerProps {
  total_count: number
  elements_per_page: number
  current_offset: number
  param_key: string
}

export const SearchApiPager = ({
  total_count,
  elements_per_page,
  current_offset,
  param_key,
}: PagerProps) => {
  const totalPages = Math.ceil(total_count / elements_per_page)
  if (totalPages <= 1) return null

  const current_page =
    current_offset <= 0
      ? 0
      : Math.floor(Number(current_offset) / elements_per_page)
  const pages = Array.from({ length: totalPages }, (_, i) => i)
  const router = useRouter()

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return
    let params = new URLSearchParams(window.location.search)

    console.log(page)

    if (param_key) {
      params.set(param_key, String(page * elements_per_page))
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <nav className="flex items-center gap-2 mt-4" aria-label="Pagination">
      <button
        className="px-2 py-1 border rounded disabled:opacity-50"
        disabled={current_page <= 1}
        onClick={() => handlePageChange(current_page - 1)}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-2 py-1 border rounded ${
            page === current_page ? "bg-blue-600 text-white" : ""
          }`}
          onClick={() => handlePageChange(page)}
          disabled={page === current_page}
        >
          {page + 1}
        </button>
      ))}
      <button
        className="px-2 py-1 border rounded disabled:opacity-50"
        disabled={current_page >= totalPages - 1}
        onClick={() => handlePageChange(current_page + 1)}
      >
        Next
      </button>
    </nav>
  )
}
