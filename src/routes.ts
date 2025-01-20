import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/CreateUserController";
import { LoginUserController } from "./controller/LoginUserController";

export function routes(fastify: FastifyInstance) {
  
  // CRIAÇÃO DE USUÁRIO
  fastify.post('/create-account', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply)
  })

  // LOGIN DE USUÁRIO
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    return new LoginUserController().handle(request, reply)
  })
}

// ROTA -> CONTROLLER -> SERVICE -> DB
