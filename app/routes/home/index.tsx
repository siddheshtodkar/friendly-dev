import FeaturedProjects from "~/components/FeaturedProjects"
import type { Route } from "./+types";
import type { Project } from "~/types";
import AboutPreview from "~/components/AboutPreview";
const API_URL = import.meta.env.VITE_API_URL

export async function loader({ request }: Route.LoaderArgs): Promise<Project[]> {
  const res = await fetch(API_URL)
  const data = await res.json()
  return data
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <FeaturedProjects projects={loaderData} count={2} />
      <AboutPreview />
    </>
  );
}

export default HomePage;