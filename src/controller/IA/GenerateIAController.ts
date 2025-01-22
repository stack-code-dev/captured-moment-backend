import { FastifyReply, FastifyRequest } from "fastify"
import axios from "axios"

class GenerateIAController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { text } = request.body as {text: string}

    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        "model": "llama3.2",
        "prompt":  `Ollama, tudo bem? Eu quero te pedir um favor: Eu desejo que vc melhore 
        a seguinte frase e acrescente mais detalhes de uma forma resumida: "${text}".
        Eu não quero que em sua resposta conhenha mais nenhuma outra palavra que seja além da frase que você melhorou.
        Nem uma apresentação do tipo: "aqui está a frase que você solicitou", ou algo do tipo...
        Consegue compreender? Eu quero uma resposta direta. Somente a resposta final. Nada a mais!`,
        "stream": false
      })
  
      reply.send(response.data.response)
    } catch (error){
      reply.status(500).send({ message: "Erro ao processar seu solicitação" })
    }
  }
}

export {GenerateIAController}