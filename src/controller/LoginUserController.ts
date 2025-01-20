import { FastifyReply, FastifyRequest } from "fastify"
import { LoginUserService } from "../service/LoginUserService"

class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { email, password } = request.body as {email: string, password: string}

    if(!email || !password) {
      reply.status(400).send({ message: "Todos os campos são requiridos"})
    }
   
    try {
      // INICIALIZO O SERVIÇO
      const loginUserService = new LoginUserService()
      // Chamar o serviço acessando o método
      const login = await loginUserService.execute({ email, password })

      reply.send(login);
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }

}
export { LoginUserController }
