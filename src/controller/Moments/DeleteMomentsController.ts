import { FastifyReply, FastifyRequest } from "fastify"
import { DeleteMomentsService } from "../../service/Moments/DeleteMomentsService"

class DeleteMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { id } = request.params as { id: string }
    const { user } = request
  
    if(!user) {
      return reply.status(400).send({ message: "User not found!" })
    }
  
    if(!id) {
      return reply.status(400).send({ message: "Image ID is required!" })
    }
    
    try {
      const deleteMomentsService = new DeleteMomentsService()
      const deleteMoments = await deleteMomentsService.execute({ id, user })

      reply.status(201).send(deleteMoments)
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }

}
export { DeleteMomentsController }
