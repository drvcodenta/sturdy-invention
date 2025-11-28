import type { MenuItem } from '../types/menu'

export const primaryMenu: MenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    description: 'Welcome to our comprehensive platform',
    icon: 'home',
  },
  {
    id: 'products-services',
    title: 'Products & Services',
    description: 'Explore our comprehensive offerings',
    icon: 'products',
    children: [
      {
        id: 'digital-payments',
        title: 'Digital Payments',
        description: 'Unified payments experience across channels',
      },
      {
        id: 'risk-management',
        title: 'Risk Management',
        description: 'Adaptive fraud and compliance controls',
      },
      {
        id: 'developer-platform',
        title: 'Developer Platform',
        description: 'SDKs, APIs, and tools for rapid integration',
      },
    ],
  },
  {
    id: 'industry-solutions',
    title: 'Industry Solutions',
    description: 'Specialized solutions for different industries',
    icon: 'industry',
    children: [
      {
        id: 'financial-services',
        title: 'Financial Services',
        description: 'Banking-grade infrastructure and insights',
      },
      {
        id: 'retail-commerce',
        title: 'Retail & Commerce',
        description: 'Scalable commerce journeys and loyalty',
      },
      {
        id: 'mobility',
        title: 'Mobility & Transport',
        description: 'High-availability experiences for on-the-go',
      },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    description: 'Learn about our organization and culture',
    icon: 'company',
    children: [
      {
        id: 'about-us',
        title: 'About Us',
      },
      {
        id: 'leadership',
        title: 'Leadership',
      },
      {
        id: 'careers',
        title: 'Careers',
      },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Knowledge base, tools, and learning materials',
    icon: 'resources',
  },
  {
    id: 'support',
    title: 'Support',
    description: 'Get help and support when you need it',
    icon: 'support',
    children: [
      {
        id: 'status',
        title: 'Status Page',
      },
      {
        id: 'contact-support',
        title: 'Contact Support',
      },
    ],
  },
  {
    id: 'research-innovation',
    title: 'Research & Innovation',
    description: 'Cutting-edge research and innovation initiatives',
    icon: 'research',
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description: 'Environmental responsibility and sustainable technology',
    icon: 'sustainability',
  },
  {
    id: 'investor-relations',
    title: 'Investor Relations',
    description: 'Financial information and investor resources',
    icon: 'investor',
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch with our team',
    icon: 'contact',
  },
]
