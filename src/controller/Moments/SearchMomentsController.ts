import { FastifyReply, FastifyRequest } from "fastify"
import { SearchMomentsService } from "../../service/Moments/SearchMomentsService";

class SearchMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { query } = request.query as { query: string }
    const { user } = request;

    if(!user) {
      throw new Error('User does not exists!')
    }
  
    try {
      const searchMomentsService = new SearchMomentsService()
      const searchMoments = await searchMomentsService.execute({ query, user })

      reply.status(200).send({ moment: searchMoments })

    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }

}
export { SearchMomentsController }
