import type { NextPage } from 'next'
import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import styles from '../styles/Home.module.css'
import { queryClient } from './_app'

async function getPosts() {
  const result = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  return result.data
}

async function addPost({ title, body }) {
  await axios.post('https://jsonplaceholder.typicode.com/posts', {
    title,
    body,
  })
}

const Home: NextPage = () => {
  const getPostsQuery = useQuery('getPosts', getPosts)

  const addPostMutation = useMutation(addPost)

  const onClickAddPost = () => {
    addPostMutation.mutate({ title: 'foo', body: 'bar' }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries('getPosts')
      }
    })
  }

  return (
    <div className={styles.container}>
      {getPostsQuery.isLoading && <div>Loading....</div>}
      {getPostsQuery.error && <div>Something error</div>}
      {getPostsQuery.data?.map(post => {
        return (
          <div key={post.id}>
            {post.title}
          </div>
        )
      })}

      {addPostMutation.isLoading && <div>Adding post...</div>}
      <button onClick={onClickAddPost}>Add post</button>
    </div>
  )
}

export default Home
