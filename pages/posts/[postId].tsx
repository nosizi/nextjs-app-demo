import { NextPageContext, GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { Post } from '../../types/posts'

type Props = NextPageContext & {
  post: Post,
}
export default function Page(props: Props) {
  const { post } = props
  console.log(1, post)
  return (
    <div
      style={{
        width: 800,
        margin: '0 auto',
      }}
    >
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/posts">
          <a href="#">go back list</a>
        </Link>
        <Link href="/create">
          <a href="#">create new</a>
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const result = await fetch(`http://localhost:3000/api/posts/${params?.postId}`, {
    method: 'GET',
  })
  const post = await result.json()
  console.log(post)

  return {
    props: {
      post,
    }
  }
}


