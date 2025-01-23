import prismaClient from '../../prisma'
import path from 'path'
import fs from 'fs'

interface UserProps {
  user: {
    userId: string
  }
}

type DeleteRegisterProps = UserProps & { id: string }

class DeleteMomentsService {
  async execute({ user, id }: DeleteRegisterProps) {
    const registerMoment = await prismaClient.registeredMoment.findFirst({
      where: {
        id: id,
        userId: user.userId
      }
    })
  
    if(!registerMoment) {
      throw new Error("register Moment not found!")
    }
  
    await prismaClient.registeredMoment.delete({
      where: {
        id: id,
        userId: user.userId
      }
    })
  
    const imageUrl = registerMoment.imageUrl
    const fileName = path.basename(imageUrl)
  
    const filePath = path.join(__dirname, '..', '..', '..', 'uploads', fileName)
  
    fs.unlink(filePath, (err) => {
      if(err) {
        console.log("Falid to delete image file:", err)
      }
    })
  
    return { message: "Register moments deleted susseccfuly" }
  }
}
export { DeleteMomentsService }