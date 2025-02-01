import prismaClient from '../../prisma'

interface RegistredMomentProps {
  title: string
  story: string
  visitedLocation: string[]
  user: { userId: string }
  imageUrl: string
  visitedDate: string
}

class AddMomentsService {
  async execute({ 
    title,
    story,
    visitedLocation,
    user,
    imageUrl,
    visitedDate }: RegistredMomentProps) {
    const parsedVisitedDate = new Date(visitedDate)

    const placeholderImageUrl = `http://localhost:8000/uploads/image-default.png`

    const registedMoment = await prismaClient.registeredMoment.create({
      data: {
        title, 
        story, 
        visitedLocation,
        userId: user.userId,
        imageUrl: imageUrl || placeholderImageUrl,
        visitedDate: parsedVisitedDate
      }
    })
  
    return registedMoment
  }
}
export { AddMomentsService }