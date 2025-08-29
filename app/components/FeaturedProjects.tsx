import type { Project } from "~/types";
import ProjectCard from "./ProjectCard";

type FeaturedProjectsProps = {
  projects: Project[],
  count: number
}

const FeaturedProjects = ({ projects, count = 2 }: FeaturedProjectsProps) => {
  // const featuredProjects = projects.filter(project => project.featured === true).slice(0, count)
  const featuredProjects = projects.slice(0, count)
  if(featuredProjects.length==0) return null
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-200">Featured Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;