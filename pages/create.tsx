import React from 'react'
import Router from 'next/router'

const Create: React.FC = () => {
  const [title, setTitle] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [content, setContent] = React.useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content, email }
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/posts')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={submitData}>
        <h1>Create Post</h1>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br/>
        <br/>
        <input
          type="text"
          placeholder="email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br/>
        <br/>
        <textarea
          rows={10}
          cols={50}
          placeholder="post content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <br/>
        <br/>
        <button type="submit" disabled={!content || !title || !email}>Create</button>
        <a href="#" onClick={() => Router.push('/')}>or Cancel</a>
      </form>
    </div>
  )
}

export default Create