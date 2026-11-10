import {
  BadgeCheck,
  Cable,
  Cpu,
  Gauge,
  GraduationCap,
  HandHeart,
  MapPin,
  MessageSquareText,
  PanelsTopLeft,
  ToggleRight,
  Zap,
} from 'lucide-react'
import type { Feature, NavItem } from '../types'
import { company } from './company'

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

/** "Why choose us": each point is based only on verified company details. */
export const whyChooseUs: Feature[] = [
  {
    icon: GraduationCap,
    title: 'Engineer-Led Business',
    text: `Led by our proprietor, ${company.proprietor.name}, a qualified electrical engineer with a ${company.proprietor.qualification} degree.`,
  },
  {
    icon: PanelsTopLeft,
    title: 'Focused on Control Panels',
    text: 'Manufacturing electrical control panels is at the core of what we do.',
  },
  {
    icon: HandHeart,
    title: 'A Spirit of Seva',
    text: `Our work is guided by the idea of seva, or dedicated service, and by our commitment of “${company.slogan}”.`,
  },
  {
    icon: MapPin,
    title: 'Based in Bangalore',
    text: `Located at Sunkadakatte, Bangalore - ${company.address.postalCode}, close to our customers in the region.`,
  },
  {
    icon: MessageSquareText,
    title: 'Direct Communication',
    text: 'Speak with us directly by phone, WhatsApp or email to discuss your requirement.',
  },
  {
    icon: BadgeCheck,
    title: 'Clear, Agreed Scope',
    text: 'Every requirement is discussed with the customer so that the scope of work is clear from the start.',
  },
]

/**
 * PLACEHOLDER: illustrative panel categories for the "Engineering Capabilities" section.
 * The company must confirm or edit this list before the labels are removed.
 */
export const capabilities: Feature[] = [
  { icon: Zap, title: 'Power Distribution Panels', text: 'Placeholder: confirm scope with company.' },
  { icon: ToggleRight, title: 'Motor Control Panels', text: 'Placeholder: confirm scope with company.' },
  { icon: Cpu, title: 'Automation / PLC Panels', text: 'Placeholder: confirm scope with company.' },
  { icon: Gauge, title: 'Metering & Monitoring Panels', text: 'Placeholder: confirm scope with company.' },
  { icon: Cable, title: 'Panel Wiring & Modifications', text: 'Placeholder: confirm scope with company.' },
  { icon: PanelsTopLeft, title: 'Custom-Built Panels', text: 'Placeholder: confirm scope with company.' },
]

/** Generic enquiry process; describes how to engage, not technical capabilities. */
export const enquirySteps = [
  { title: 'Share Your Requirement', text: 'Call, WhatsApp, email or send the enquiry form with your requirement.' },
  { title: 'Discuss the Details', text: 'We discuss the application, specifications and scope with you.' },
  { title: 'Receive a Proposal', text: 'We share a proposal based on the agreed scope of work.' },
  { title: 'Execution', text: 'Work proceeds as agreed, with direct communication throughout.' },
]
