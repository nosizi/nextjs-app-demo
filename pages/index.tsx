import type { NextPage } from 'next'
import React from 'react'
import Router from 'next/router'

const Index: NextPage = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { name, email }
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={submit}>
        <h1>Sign up</h1>
        <input
          placeholder="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br/>
        <br/>
        <input
          placeholder="email address"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br/>
        <br/>
        <button onClick={() => Router.push('/create')}>sign up now</button>
      </form>
    </div>
  )
}

export default Index