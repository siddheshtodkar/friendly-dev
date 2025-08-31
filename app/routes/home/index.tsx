import FeaturedProjects from "~/components/FeaturedProjects"
import type { Route } from "./+types";
import type { Post, Project, StrapiPost, StrapiProject, StrapiResponse } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
const API_URL = import.meta.env.VITE_API_URL
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[], posts: Post[] }> {
  const [projectsRes, postsRes] = await Promise.all([
    await fetch(`${API_URL}/projects?filters[featured][$eq]=true&populate=*`),
    // await fetch(new URL('/posts-meta.json', request.url))
    await fetch(`${API_URL}/posts?sort[0]=date:desc&sort[1]=title:desc&populate=image`)
  ])

  if (!projectsRes.ok || !postsRes.ok)
    throw new Response('Failed to load data')

  const [projectJson, postJson]: [StrapiResponse<StrapiProject>, StrapiResponse<StrapiPost>] = await Promise.all([projectsRes.json(), postsRes.json()])

  const projects = projectJson.data.map(item => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
    // image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : '/images/no-image.png'
    image: item.image?.url ? item.image.url : '/images/no-image.png'
  }))

  const posts = postJson.data.map(item => ({
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

  return { projects, posts }
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
}

export default HomePage;