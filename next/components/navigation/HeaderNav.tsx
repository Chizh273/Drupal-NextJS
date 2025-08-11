import { Link } from "@/components/navigation/Link"

export function HeaderNav() {
  return (
    <header>
      <div className="container flex items-center justify-between py-6 mx-auto">
        <Link href="/" className="text-2xl font-semibold no-underline">
          Next.js for Drupal
        </Link>
        <Link href="/articles" className="hover:text-blue-600">
          Articles
        </Link>
      </div>
    </header>
  )
}
