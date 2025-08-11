import { Link } from "@/components/navigation/Link"
import { DrupalMenuItem } from "next-drupal"

type HeaderNavProps = {
  menu?: {
    items: DrupalMenuItem[]
    tree: DrupalMenuItem[]
  }
}

export function HeaderNav(props: HeaderNavProps) {
  return (
    <header>
      <div className="container flex items-center justify-between py-6 mx-auto">
        <nav className="flex items-center w-full">
          <Link href="/" className="text-2xl font-semibold no-underline">
            Home
          </Link>
          <div className="flex-1" />
          <ul className="flex items-center gap-6">
            <fieldset className="border border-gray-300 rounded p-2 flex flex-row items-center gap-4">
              <legend className="px-2 text-sm font-semibold">
                Drupal Menu Links
              </legend>
              {props.menu?.tree?.map((item) => (
                <li key={item.id} className="list-none">
                  <Link href={item.url} className="hover:text-blue-600">
                    {item.title}
                  </Link>
                </li>
              ))}
            </fieldset>
            <fieldset className="border border-gray-300 rounded p-2 flex flex-row items-center gap-4">
              <legend className="px-2 text-sm font-semibold">
                Static Links
              </legend>
              <li className="list-none">
                <Link
                  href="/latest-articles"
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Latest Articles
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/search-api/articles"
                  className="hover:text-blue-600 cursor-pointer"
                >
                  [Search API] - Articles
                </Link>
              </li>
            </fieldset>
          </ul>
        </nav>
      </div>
    </header>
  )
}
