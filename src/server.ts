import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import prismaClient from './prisma';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { routes } from './routes';

const app = fastify({ logger: true })

const start = async () => {

  app.register(routes);

  // LOGIN DE USUÁRIO
  // app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
  //   const { email, password } = request.body as {email: string, password: string}

  //   if(!email || !password) {
  //     reply.status(400).send({ message: "Todos os campos são requiridos"})
  //   }

  //   const user = await prismaClient.user.findFirst({
  //     where: {
  //       email: email
  //     }
  //   })

  //   if(!user) {
  //     return reply.status(400).send({ error: true, message: "Usuário não encontrado" })
  //   }

  //   const isPasswordValid = await bcrypt.compare(password, user.password)
  //   if(!isPasswordValid) {
  //     return reply.status(400).send({ message: "Credenciais invalidas" })
  //   }

  //   const accessToken = jwt.sign(
  //     { userId: user.id },
  //     process.env.ACCESS_TOKEN_SECRET!,
  //     { expiresIn: "72h" }
  //   )

  //   return {
  //     erro: false,
  //     message: "Login bem sucedido!",
  //     user: { fullName: user.fullName, email: user.email},
  //     accessToken
  //   }
  // })

  app.listen({ port: 8000 }, () => {
    console.log('O servidor está rodando! 🚀')
  })
}

start();
