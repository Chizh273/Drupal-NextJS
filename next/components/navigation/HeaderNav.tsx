import { DrupalMenuItem } from "next-drupal"

import { Link } from "@/components/navigation/Link"

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
            {props.menu?.tree?.map((item) => (
              <li key={item.id} className="list-none">
                <Link href={item.url} className="hover:text-blue-600">
                  {item.title}
                </Link>
              </li>
            ))}

            <li className="list-none">
              <Link
                href="/articles"
                className="hover:text-blue-600 cursor-pointer"
              >
                Articles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
