import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/Auth/CreateUserController";
import { LoginUserController } from "./controller/Auth/LoginUserController";
import { GetUserController } from "./controller/Auth/GetUserController";
import { authenticateToken } from "./middleware/authenticateToken";
import { AddMomentsController } from "./controller/Moments/AddMomentsController";
import { GetAllMomentsController } from "./controller/Moments/GetAllMomentsController";
import { SearchMomentsController } from "./controller/Moments/SearchMomentsController";
import { UpdateMomentsController } from "./controller/Moments/UpdateMomentsController";
import { GenerateIAController } from "./controller/IA/GenerateIAController";

export function routes(fastify: FastifyInstance) {
  // AUTH: CRIAÇÃO DE USUÁRIO
  fastify.post('/create-account', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply)
  })

  // AUTH: LOGIN DE USUÁRIO
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    return new LoginUserController().handle(request, reply)
  })

  // AUTH: BUSCA DE USUÁRIO
  fastify.get('/get-user', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetUserController().handle(request, reply)
  })



  // MOMENT: ADICIONAR UM NOVO MOMENTO
  fastify.post('/add-registered-moment', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new AddMomentsController().handle(request, reply)
  })

  // MOMENT: BUSCAR TODO OS MOMENTO POR USUÁRIO
  fastify.get('/get-all-moments', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetAllMomentsController().handle(request, reply)
  })

  // MOMENT: BUSCAR POR TERMOS
  fastify.get('/search', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new SearchMomentsController().handle(request, reply)
  })

  // MOMENT: BUSCAR POR TERMOS
  fastify.put('/edit-moments/:id', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateMomentsController().handle(request, reply)
  })


  // MOMENT: BUSCAR POR TERMOS
  fastify.post('/ia', async (request: FastifyRequest, reply: FastifyReply) => {
    return new GenerateIAController().handle(request, reply)
  })


}

// ROTA -> CONTROLLER -> SERVICE -> DB
