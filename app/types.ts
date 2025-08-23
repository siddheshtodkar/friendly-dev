export type Project = {
  id: string,
  title: string,
  description: string,
  image: string,
  url: string,
  date: string,
  category: string,
  featured: boolean
}

export type Post = {
  id: string,
  title: string,
  slug: string,
  excerpt: string,
  date: string
}