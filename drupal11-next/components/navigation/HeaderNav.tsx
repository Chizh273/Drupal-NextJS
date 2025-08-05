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
            {props.menu?.tree?.map((item) => (
              <li key={item.id}>
                <Link href={item.url} className="hover:text-blue-600">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
