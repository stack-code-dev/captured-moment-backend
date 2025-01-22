import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';

export async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers["authorization"];
  const token = authHeader?.split(" ")[1]

  if(!token) return reply.status(400).send({ message: "Token not provided" })

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string
    }

    request.user = decoded
  } catch (error) {
    return reply.status(400).send({ message: "Invalid token" })
  }
}