import type { Post } from "~/types";
import type { Route } from "./+types";
import ReactMarkdown from 'react-markdown'
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs): Promise<{ post: Post, markdown: string }> {
  const { slug } = params
  const url = new URL('/posts-meta.json', request.url)
  const res = await fetch(url.href)

  if (!res.ok)
    throw new Error('Blogs Details not found')

  const data = await res.json()
  const post = data.find((post: Post) => post.slug === slug)

  if (!post)
    throw new Response('Not Found', { status: 404 })

  const markdown = await import(`../../posts/${slug}.md?raw`)

  return {
    post,
    markdown: markdown.default
  }
}

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { post, markdown } = loaderData
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{new Date(post.date).toDateString()}</p>
      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <Link to={'/blog'} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Back to Posts</Link>
    </div>
  );
}

export default BlogPostDetailsPage;