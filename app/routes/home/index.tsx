import FeaturedProjects from "~/components/FeaturedProjects"
import type { Route } from "./+types";
import type { Post, Project } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
const API_URL = import.meta.env.VITE_API_URL

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[], posts: Post[] }> {
  const [projectsRes, postsRes] = await Promise.all([
    await fetch(API_URL),
    await fetch(new URL('/posts-meta.json', request.url))
  ])

  if (!projectsRes.ok || !postsRes.ok)
    throw new Response('Failed to load data')

  const [projects, posts] = await Promise.all([projectsRes.json(), postsRes.json()])

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