import { FastifyReply, FastifyRequest } from "fastify"
import { UpdateMomentsService } from "../../service/Moments/UpdateMomentsService"

interface RegisteredMomentProps {
  title: string
  story: string
  visitedLocation: string[]
  imageUrl: string
  visitedDate: string
}

class UpdateMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { id } = request.params as { id: string }
    const { title, story, visitedLocation, imageUrl, visitedDate } = request.body as RegisteredMomentProps
    const { user } = request
  
    if(!title || !story || !visitedLocation || !visitedDate) {
      return reply.status(400).send({ error: true, message: "All fields are required!" })
    }
  
    if(!user) {
      return reply.status(400).send({ error: true, message: "User does not exists!" })
    }

    try {
      const updateMomentsService = new UpdateMomentsService()
      const updateMoments = await updateMomentsService.execute({ id, imageUrl, story, title, user, visitedDate, visitedLocation })
    
      reply.status(200).send({ moment: updateMoments, message: "Update Successful" })
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }

}
export { UpdateMomentsController }
