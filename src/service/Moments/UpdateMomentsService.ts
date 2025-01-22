import prismaClient from '../../prisma'

interface RegistredMomentProps {
  title: string
  story: string
  visitedLocation: string[]
  user: { userId: string }
  imageUrl: string
  visitedDate: string
}

type UpdateMomentProps = RegistredMomentProps & { id: string }

class UpdateMomentsService {
  async execute({ 
    id,
    title,
    story,
    visitedLocation,
    user,
    imageUrl,
    visitedDate }: UpdateMomentProps) {
    
      const parsedVisitedDate = new Date(parseInt(visitedDate))
  
      const registeredMoment = await prismaClient.registeredMoment.findFirst({
        where: {
          id: id,
          userId: user.userId
        }
      })
    
      if(!registeredMoment) {
        throw new Error("Register moment not found!" )
      }
    
      const placeholderImageUrl = `http://localhost:8000/uploads/paisagem-ai.jpeg`
    
      const updatedRegisteredMoment = await prismaClient.registeredMoment.update({
        where: {
          id: id
        },
        data: {
          title: title,
          story: story,
          visitedLocation: visitedLocation,
          imageUrl: imageUrl || placeholderImageUrl,
          visitedDate: parsedVisitedDate
        }
      })
    
    return updatedRegisteredMoment
  }
}
export { UpdateMomentsService }