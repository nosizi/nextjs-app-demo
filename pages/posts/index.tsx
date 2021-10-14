import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import React from 'react'
import { Post } from '../../types/posts'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/posts', {
    method: 'GET',
  })
  const posts = await res.json()
  return {
    props: {
      posts,
    }
  }
}

type Props = {
  posts: Post[]
}
export default function Posts({ posts }: Props) {
  console.log(posts)
  return (
    <div>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}