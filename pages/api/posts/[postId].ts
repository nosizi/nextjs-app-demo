import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { postId } } = req
  switch (method) {
    case 'GET':
      await GET(postId as string, res)
      break
    case 'DELETE':
      await DELETE(postId as string, res)
      break
    default:
      res.status(500)
      break
  }
}

async function GET(postId: string, res: NextApiResponse) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  })
  res.json(post)
}

async function DELETE(postId: string, res: NextApiResponse) {
  const post = await prisma.post.delete({
    where: { id: postId },
  })
  res.json(post)
}