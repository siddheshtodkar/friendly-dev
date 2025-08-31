import type { Post, StrapiPost, StrapiResponse } from "~/types";
import type { Route } from "./+types";
import PostCard from "~/components/PostCard";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";
const API_URL = import.meta.env.VITE_API_URL
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  // const url = new URL('/posts-meta.json', request.url)
  const url = `${API_URL}/posts?sort=date:desc&populate=image`
  const res = await fetch(url)
  if (!res.ok)
    throw new Error('Failed to fetch Posts')
  const json: StrapiResponse<StrapiPost> = await res.json()
  const posts = json.data.map(item => ({
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
  // data.sort((a: Post, b: Post) => {
  //   return new Date(b.date).getTime() - new Date(a.date).getTime()
  // })
  return { posts }
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = [...posts].filter((post) => post.title.toLowerCase().includes(searchQuery) || post.excerpt.toLowerCase().includes(searchQuery))

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const last = currentPage * postsPerPage
  const first = last - postsPerPage
  const currentposts = filteredPosts.slice(first, last)

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8">Blog</h2>
      <PostFilter searchQuery={searchQuery} onSearchChange={(query) => {
        setSearchQuery(query.toLowerCase())
        setCurrentPage(1)
      }} />
      {
        currentposts.length == 0 ?
          <p className="text-gray-400 text-center">No Posts Found</p> :
          currentposts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))
      }
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
}

export default BlogPage;