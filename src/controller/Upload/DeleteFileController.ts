import { FastifyReply, FastifyRequest } from "fastify"
import { DeleteFileService } from "../../service/Upload/DeleteFileService"

class DeleteFileController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { imageUrl } = request.query as { imageUrl: string }

    if(!imageUrl) {
      return reply.status(400).send({ error: true, message: "ImageUrl parameter is required!" })
    }

    try {
      const deleteFileService = new DeleteFileService()
      const deleted = await deleteFileService.execute({ imageUrl })

      return reply.status(200).send(deleted)
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }
}
export { DeleteFileController }
