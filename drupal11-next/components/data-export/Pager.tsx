"use client";

import { useRouter } from 'next/navigation';
import { Pager as PagerTyping } from '@/types';

type PagerProps = PagerTyping

export const Pager: React.FC<PagerProps> = ({
  current_page,
  total_pages,
}) => {
  const router = useRouter();
  if (total_pages <= 1) return null;

  const handleClick = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(page));
    router.replace(`?${params.toString()}`);
  }

  const pages = Array.from({ length: total_pages }, (_, i) => i + 1)

  return (
    <nav className="flex gap-2 items-center mt-6" aria-label="Pagination">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={!current_page || current_page <= 1}
        onClick={() => handleClick((current_page || 1) - 1)}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded ${page === current_page ? "bg-blue-500 text-white" : ""}`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={!current_page || current_page >= total_pages}
        onClick={() => handleClick((current_page || 1) + 1)}
      >
        Next
      </button>
    </nav>
  )
}
