import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const posts = await prisma.post.findMany()

        res.status(200).json(posts.map(i => {
          if (typeof i.id === 'bigint') {
            return {
              ...i,
              id: i.id.toString(),
            }
          }
          return i
        }))
      } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Error fetching' })
      }
      break
    default:
      res.setHeader('Allow', ["GET"])
      res.status(500).end(`Method ${method} Not Allowed`)
      break
  }
}