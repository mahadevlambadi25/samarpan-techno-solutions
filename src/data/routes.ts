export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

/** Route + SEO metadata. Used by navigation, useSeo() and the build-time sitemap. */
export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    label: 'Home',
    title: 'Electrical Control Panel Manufacturers in Bangalore | Samarpan Techno Solutions',
    description:
      'SAMARPAN TECHNO SOLUTIONS, Bangalore: manufacturers of electrical control panels, providing electrical engineering services. Led by M N Gurunath, B.E. (Elec.).',
    changefreq: 'monthly',
    priority: 1,
  },
  {
    path: '/about',
    label: 'About Us',
    title: 'About Us | Samarpan Techno Solutions, Bangalore',
    description:
      'About SAMARPAN TECHNO SOLUTIONS, an electrical control panel manufacturer in Sunkadakatte, Bangalore, led by proprietor M N Gurunath, B.E. (Elec.).',
    changefreq: 'yearly',
    priority: 0.8,
  },
  {
    path: '/services',
    label: 'Services',
    title: 'Electrical Control Panels & Engineering Services in Bangalore | Samarpan Techno Solutions',
    description:
      'Electrical control panel manufacturing, electrical engineering services and industrial electrical solutions from SAMARPAN TECHNO SOLUTIONS, Bangalore.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/projects',
    label: 'Projects',
    title: 'Projects | Samarpan Techno Solutions',
    description: 'Project portfolio of SAMARPAN TECHNO SOLUTIONS, electrical control panel manufacturers in Bangalore.',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/gallery',
    label: 'Gallery',
    title: 'Gallery | Electrical Control Panels & Industrial Work | Samarpan Techno Solutions',
    description:
      'Image gallery of electrical control panels, manufacturing, engineering work and industrial equipment: SAMARPAN TECHNO SOLUTIONS, Bangalore.',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/contact',
    label: 'Contact',
    title: 'Contact Us | Samarpan Techno Solutions, Bangalore',
    description:
      'Contact SAMARPAN TECHNO SOLUTIONS, Sunkadakatte, Bangalore - 560091. Call 9972766644, WhatsApp or email samarpantekk@gmail.com for electrical control panel enquiries.',
    changefreq: 'yearly',
    priority: 0.9,
  },
]

export function routeMeta(path: string): RouteMeta {
  return ROUTES.find((r) => r.path === path) ?? ROUTES[0]
}
