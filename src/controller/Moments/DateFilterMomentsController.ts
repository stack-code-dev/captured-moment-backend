import { FastifyReply, FastifyRequest } from "fastify"
import { DateFilterMomentsService } from "../../service/Moments/DateFilterMomentsService"

class DateFilterMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { startDate, endDate } = request.query as { startDate: string, endDate: string }
    const { user } = request
    
    if(!user) {
      return reply.status(400).send({ error: true, message: "User does not exists!" })
    }
  
    
    try {
      const dateFilterMomentsService = new DateFilterMomentsService()
      const dateFiltered = await dateFilterMomentsService.execute({ endDate, startDate, user })

      reply.status(201).send({ moment: dateFiltered})
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }

}
export { DateFilterMomentsController }
