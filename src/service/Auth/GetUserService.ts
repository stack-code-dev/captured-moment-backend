import prismaClient from "../../prisma"

interface UserProps {
  user: {
    userId: string
  }
}

class GetUserService {
  async execute({ user }: UserProps) {
    const isUser = await prismaClient.user.findFirst({
      where: {
        id: user.userId
      }
    })
  
    if(!isUser) {
      throw new Error("User not found!")
    }
  
    return {
      user: isUser,
      message: "User found!"
    }
  }
}
export { GetUserService }