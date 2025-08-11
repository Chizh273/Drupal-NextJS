import { NodeFullPageProps } from "@/components/nodes/full/types"

export const params = {}

export default function BasicPage({ node, ...props }: NodeFullPageProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose"
        />
      )}
    </article>
  )
}
