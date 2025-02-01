import { FastifyReply, FastifyRequest } from "fastify"
import { AddMomentsService } from "../../service/Moments/AddMomentsService"

interface RegisteredMoment {
  title: string
  story: string
  visitedLocation: string[]
  imageUrl: string
  visitedDate: string
}

class AddMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { title, story, visitedLocation, imageUrl, visitedDate } = request.body as RegisteredMoment
    const { user } = request
  
    if(!title || !story || !visitedLocation || !visitedDate) {
      return reply.status(400).send({ error: true, message: "All fields are required!" })
    }
  
    if(!user) {
      return reply.status(400).send({ error: true, message: "User does not exists!" })
    }
    
    try {
      const addMomentsService = new AddMomentsService()
      const addMoments = await addMomentsService.execute({ title, story, imageUrl, user, visitedDate, visitedLocation })

      reply.status(201).send({ moment: addMoments, message: "Added Sucefully"})
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }

}
export { AddMomentsController }
