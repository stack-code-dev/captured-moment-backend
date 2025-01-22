import prismaClient from '../../prisma'

interface RegistredMomentProps {
  user: { userId: string }
}

class GetAllMomentsService {
  async execute({ user }: RegistredMomentProps) {
    const registeredMoments = await prismaClient.registeredMoment.findMany({
      where: {
        userId: user.userId
      },
      orderBy: { isFavorite: 'desc' }
    })
  
    return registeredMoments
  }
}
export { GetAllMomentsService }