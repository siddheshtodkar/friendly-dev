export type Project = {
  id: string,
  title: string,
  description: string,
  image: string,
  url: string,
  date: string,
  category: string,
  featured: boolean,
  documentId: string
}

export type Post = {
  id: string,
  title: string,
  slug: string,
  excerpt: string,
  date: string,
  image: string,
  body: string
}

export type StrapiProject = {
  id: string,
  documentId: string,
  title: string,
  description: string,
  image?: {
    url: string
  },
  url: string,
  date: string,
  category: string,
  featured: boolean
}

export type StrapiPost = {
  id: string,
  title: string,
  slug: string,
  excerpt: string,
  date: string,
  image?: {
    url: string
  },
  body: string,
  documentId: string
}

export type StrapiResponse<T> = {
  data: T[]
}