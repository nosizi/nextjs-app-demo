import { Author } from './user'

export interface Post {
  id: string,
  createdAt: string,
  updatedAt: string,
  title: string,
  content: string,
  published: boolean,
  viewCount: number,
  author: Author,
  authorId: string,
}