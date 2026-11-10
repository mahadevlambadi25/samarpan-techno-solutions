import type { Project } from '../types'
import { PlaceholderBadge } from './ui/PlaceholderBadge'
import { ResponsiveImage } from './ui/ResponsiveImage'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-white">
      <div className="relative">
        <ResponsiveImage
          photo={project.photo}
          aspect={4 / 3}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
          alt={project.isDemo ? `Illustrative image: ${project.photo.alt}` : project.photo.alt}
        />
        <span className="absolute bottom-0 left-0 bg-navy px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-white uppercase">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {project.isDemo && <PlaceholderBadge label="Demo placeholder" className="self-start" />}
        <h3 className="mt-3 text-[1.45rem] font-bold uppercase">{project.title}</h3>
        <p className="mt-2 text-muted">{project.description}</p>
      </div>
    </article>
  )
}
