import { FastifyReply, FastifyRequest } from "fastify"
import { GetAllMomentsService } from "../../service/Moments/GetAllMomentsService"

class GetAllMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { user } = request;

    if(!user) {
      throw new Error('User does not exists!')
    }
  
    try {
      const getAllMomentsService = new GetAllMomentsService()
      const getAllMoments = await getAllMomentsService.execute({ user })

      reply.status(200).send({ memories: getAllMoments })
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }

}
export { GetAllMomentsController }
