import { CircuitBoard, Factory, Wrench } from 'lucide-react'
import type { Service } from '../types'
import { photos } from './photos'

/**
 * Initial service categories, derived from the company tagline.
 * EDITABLE: descriptions are intentionally general. Add specific technical scope
 * (panel types, ratings, standards, etc.) only after it is confirmed by the company.
 */
export const services: Service[] = [
  {
    slug: 'control-panel-manufacturing',
    title: 'Electrical Control Panel Manufacturing',
    icon: CircuitBoard,
    summary: 'Electrical control panels manufactured to suit the requirements of each customer and application.',
    description:
      'Manufacturing electrical control panels is our core business. Share your requirements and specifications with us, and we will discuss a suitable panel solution for your application.',
    photo: photos.panelOpen,
  },
  {
    slug: 'electrical-engineering-services',
    title: 'Electrical Engineering Services',
    icon: Wrench,
    summary: 'Electrical engineering services (Seva) led by a qualified electrical engineer.',
    description:
      'Led by our proprietor, M N Gurunath, B.E. (Elec.), we provide services in the field of electrical engineering. Contact us to discuss your requirement and the scope of work involved.',
    photo: photos.testing,
  },
  {
    slug: 'industrial-electrical-solutions',
    title: 'Industrial Electrical Solutions',
    icon: Factory,
    summary: 'Electrical solutions for industrial requirements, planned around your facility and operations.',
    description:
      'We work with industrial customers to address their electrical requirements. The scope of every engagement is discussed and agreed with the customer before work begins.',
    photo: photos.factoryLine,
  },
]

export const serviceOptions = [...services.map((s) => s.title), 'Other / General Enquiry'] as const
