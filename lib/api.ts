import jwt from 'jsonwebtoken'
import type { NextApiRequest } from 'next'
import prisma from "./prisma";

export const getUserFromReq = async (req: NextApiRequest) => {
  const token = req.cookies['token']

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    return await prisma.user.findUnique({
      where: {
        name: payload.name,
      }
    })
  } catch (e) {

  }
}