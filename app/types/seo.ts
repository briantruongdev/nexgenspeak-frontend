export interface BreadcrumbItem {
  name: string
  url: string
}

export interface CourseSchemaOption {
  name: string
  description: string
  provider: string
  url?: string
  image?: string
  price?: number
  priceCurrency?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface OrganizationSchemaOption {
  name: string
  url: string
  logo: string
  description?: string
  telephone?: string
  addressCountry?: string
}
