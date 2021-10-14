import type { NextPage } from 'next'
import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import styles from '../styles/Home.module.css'
import { queryClient } from './_app'

async function getPosts() {
  const result = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  return result.data
}

type Post = {
  title: string,
  body: string,
}
async function addPost({ title, body }: Post) {
  await axios.post('https://jsonplaceholder.typicode.com/posts', {
    title,
    body,
  })
}

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery('getPosts', getPosts)

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
      {isLoading && <div>Loading....</div>}
      {error && <div>Something error</div>}
      {data?.map((post: any) => {
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
