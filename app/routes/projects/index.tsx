import type { Project } from "~/types";
import type { Route } from "./+types";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";
import { useState } from "react";

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch("http://localhost:8000/projects")
  const data = await res.json()
  return { projects: data }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData

  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 4
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const last = currentPage * projectsPerPage
  const first = last - projectsPerPage
  const currentProjects = projects.slice(first, last)

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </>
  );
}

export default ProjectsPage;