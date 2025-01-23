import prismaClient from '../../prisma'

interface DateFilterProps {
  startDate: string
  endDate: string
  user: { userId: string }
}

class DateFilterMomentsService {
  async execute({ startDate, endDate, user }: DateFilterProps) {
    const start = new Date(parseInt(startDate))
    const end = new Date(parseInt(endDate))
  
    return await prismaClient.registeredMoment.findMany({
      where: {
        userId: user.userId,
        visitedDate: {
          gte: start,
          lte: end
        }
      },
      orderBy: {
        isFavorite: 'desc'
      }
    })
  }
}
export { DateFilterMomentsService }