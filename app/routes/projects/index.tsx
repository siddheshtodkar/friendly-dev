import type { Project } from "~/types";
import type { Route } from "./+types";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const API_URL = import.meta.env.VITE_API_URL

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(API_URL)
  const data = await res.json()
  return { projects: data }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData

  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...new Set(projects.map(project => project.category))]
  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter(project => project.category === selectedCategory)

  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 4
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  const last = currentPage * projectsPerPage
  const first = last - projectsPerPage
  const currentProjects = filteredProjects.slice(first, last)

  const changeCategory = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category, i) => (
          <button key={i} onClick={() => changeCategory(category)}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map(project => (
            <motion.div layout key={project.id}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </>
  );
}

export default ProjectsPage;