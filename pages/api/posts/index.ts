import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body: { title, content, email }, method } = req

  switch (method) {
    case 'GET':
      await handleGET(res)
      break
    case 'POST':
      await handlePOST({ title, content, email }, res)
      break
    default:
      res.status(500)
      break
  }
}

async function handleGET(res: NextApiResponse) {
  const posts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  })
  res.json(posts)
}

async function handlePOST({ title, content, email }, res: NextApiResponse) {
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email } },
    }
  })
  res.json(result)
}