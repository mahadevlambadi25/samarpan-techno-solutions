import type { Project } from '../types'
import { photos } from './photos'

/**
 * DEMO PLACEHOLDERS ONLY. These are NOT real projects or clients of SAMARPAN TECHNO SOLUTIONS.
 * Replace each entry with an approved project (title, category, description, real photo)
 * and set isDemo: false. Do not add client names without written permission.
 */
export const projects: Project[] = [
  {
    slug: 'demo-control-panel-1',
    title: 'Demo Project: Control Panel Assembly',
    category: 'Control Panels',
    description: 'Placeholder description. Replace with a short, approved summary of an actual control panel project.',
    photo: photos.panelOpen,
    isDemo: true,
  },
  {
    slug: 'demo-distribution-2',
    title: 'Demo Project: Distribution Panel',
    category: 'Control Panels',
    description: 'Placeholder description. Replace with the scope, application and outcome of a real project.',
    photo: photos.breakerBox,
    isDemo: true,
  },
  {
    slug: 'demo-engineering-3',
    title: 'Demo Project: Panel Testing & Commissioning',
    category: 'Engineering Services',
    description: 'Placeholder description. Replace with details of an actual engineering service assignment.',
    photo: photos.testing,
    isDemo: true,
  },
  {
    slug: 'demo-industrial-4',
    title: 'Demo Project: Industrial Electrical Work',
    category: 'Industrial Solutions',
    description: 'Placeholder description. Replace with a real industrial electrical project summary.',
    photo: photos.panelRoom,
    isDemo: true,
  },
  {
    slug: 'demo-monitoring-5',
    title: 'Demo Project: Metering Panel',
    category: 'Control Panels',
    description: 'Placeholder description. Replace with an approved project description and photographs.',
    photo: photos.meters,
    isDemo: true,
  },
  {
    slug: 'demo-wiring-6',
    title: 'Demo Project: Wiring & Modifications',
    category: 'Engineering Services',
    description: 'Placeholder description. Replace with an actual project once approved for publication.',
    photo: photos.wiresClose,
    isDemo: true,
  },
]

export const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
