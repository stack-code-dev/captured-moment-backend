import prismaClient from '../../prisma'

interface UpdateMomentProps {
  id: string
  user: { userId: string }
  isFavorite: boolean
}

class UpdateIsFavoriteMomentsService {
  async execute({id, user, isFavorite }: UpdateMomentProps) {
    
      const registeredMoment = await prismaClient.registeredMoment.findFirst({
        where: {
          id: id,
          userId: user.userId
        }
      })
    
      if(!registeredMoment) {
        throw new Error("Register moment not found")
      }
    
      const favoriteUpdate = await prismaClient.registeredMoment.update({
        where: {
          id: id,
        },
        data: {
          isFavorite: isFavorite
        }
      })
    
      return favoriteUpdate
  }
}
export { UpdateIsFavoriteMomentsService }