import prismaClient from '../../prisma'

interface SearchMomentProps {
  query: string
  user: { userId: string } | undefined
}

class SearchMomentsService {
  async execute({ user, query }: SearchMomentProps) {
    const searchResult = await prismaClient.registeredMoment.findMany({
      where: {
        userId: user?.userId,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { story: { contains: query, mode: 'insensitive' } },
          { visitedLocation: { hasSome: [query] } }
        ]
      },
      orderBy: {
        isFavorite: 'desc'
      }
    })

    return searchResult
  }
}
export { SearchMomentsService }