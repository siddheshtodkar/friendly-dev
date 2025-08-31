import type { Post, StrapiPost, StrapiResponse } from "~/types";
import type { Route } from "./+types/details";
import ReactMarkdown from 'react-markdown'
import { Link } from "react-router";
const API_URL = import.meta.env.VITE_API_URL
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL

export async function loader({ request, params }: Route.LoaderArgs): Promise<Post> {
  const { slug } = params
  // const url = new URL('/posts-meta.json', request.url)
  const url = `${API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`
  const res = await fetch(url)

  if (!res.ok)
    throw new Error('Blogs Details not found')

  // const data = await res.json()
  // const post = data.find((post: Post) => post.slug === slug)

  // if (!post)
  //   throw new Response('Not Found', { status: 404 })

  // const markdown = await import(`../../posts/${slug}.md?raw`)

  // return {
  //   post,
  //   markdown: markdown.default
  // }

  const json: StrapiResponse<StrapiPost> = await res.json()

  const post = json.data.map(item => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    date: item.date,
    slug: item.slug,
    // image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : '/images/no-image.png'
    image: item.image?.url ? item.image.url : '/images/no-image.png'
  }))

  return post[0]
}

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  // const { post, markdown } = loaderData
  const post = loaderData
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{new Date(post.date).toDateString()}</p>
      <div>
        <img src={post.image} alt={post.title} className="w-full rounded-lg shadow-md" />
      </div>
      <div className="prose prose-invert max-w-none mb-12">
        {/* <ReactMarkdown>{markdown}</ReactMarkdown> */}
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
      <Link to={'/blog'} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Back to Posts</Link>
    </div>
  );
}

export default BlogPostDetailsPage;