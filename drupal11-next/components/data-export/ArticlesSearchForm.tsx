'use client';

import React, { FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Facets } from '@/types';

interface ArticlesSearchFormProps {
  facets: Facets;
  defaultValues?: Record<string, string | string[]>;
}

const FACET_LABELS: Record<string, string> = {
  'field_tags': 'Tags',
  uid: 'Author',
};

export function ArticlesSearchForm({
  facets,
  defaultValues,
}: ArticlesSearchFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData(formRef.current as HTMLFormElement);
      const fulltext = formData.get('fulltext') as string;

      const filters = Object.keys(facets).reduce(
        (acc, facet) => ({
          ...acc,
          [facet]: formData.getAll(facet).map(String),
        }),
        {} as Record<string, string | string[]>,
      );

      // Build query string
      const params = new URLSearchParams();
      if (fulltext) {
        params.set('filter[fulltext]', fulltext);
      }
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(`filter[${key}]`, v));
        } else if (value) {
          params.set(`filter[${key}]`, value);
        }
      });

      router.push(`?${params.toString()}`);
    },
    [facets, router, formRef],
  );

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
          defaultValue={defaultValues?.['filter[fulltext]'] || ''}
        />
      </div>

      {Object.keys(facets).map((facet) => (
        <div key={facet} className="mb-4">
          <div className="font-semibold mb-2">{FACET_LABELS[facet]}</div>
          <div className="flex flex-wrap gap-4">
            {(facets[facet])?.map(item => (
              <label
                key={item.raw_value}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name={facet}
                  value={item.raw_value}
                  defaultChecked={
                    defaultValues?.[`filter[${facet}]`]?.includes(
                      item.raw_value,
                    ) || false
                  }
                />
                {item.values.value} ({item.values.count})
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
