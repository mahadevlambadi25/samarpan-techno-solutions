import { FolderOpen } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { CTASection } from '../components/sections/CTASection'
import { PageHero } from '../components/sections/PageHero'
import { PlaceholderNote } from '../components/ui/PlaceholderBadge'
import { Reveal } from '../components/ui/Reveal'
import { cn } from '../lib/cn'
import { photos } from '../data/photos'
import { projectCategories, projects } from '../data/projects'
import { routeMeta } from '../data/routes'
import { useSeo } from '../hooks/useSeo'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects' }]

export default function ProjectsPage() {
  const meta = routeMeta('/projects')
  useSeo({ title: meta.title, description: meta.description, path: '/projects', breadcrumbs: crumbs })
  const [category, setCategory] = useState('All')
  const visible = useMemo(
    () => (category === 'All' ? projects : projects.filter((p) => p.category === category)),
    [category],
  )

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our Projects"
        intro="A selection of electrical control panel and engineering work."
        photo={photos.controlRoom}
        crumbs={crumbs}
      />

      <section className="py-20 sm:py-24" aria-label="Project portfolio">
        <div className="container-site">
          <PlaceholderNote className="mb-10">
            <strong>Demo content:</strong> the projects shown here are clearly labelled placeholders with illustrative
            stock images. They are not actual projects or clients of the company and will be replaced with approved
            project details and photographs.
          </PlaceholderNote>

          <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  'min-h-11 border px-4 font-display text-[0.95rem] font-semibold tracking-wider uppercase transition-colors',
                  category === c ? 'border-navy bg-navy text-white' : 'border-line text-ink/75 hover:border-navy hover:text-navy',
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {visible.length} project{visible.length === 1 ? '' : 's'}
          </p>

          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-3 border border-dashed border-line py-20 text-center text-muted">
              <FolderOpen className="size-8" aria-hidden="true" />
              <p>No projects in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection title="Planning a Similar Project?" />
    </>
  )
}
