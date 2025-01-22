import prismaClient from '../../prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthUtils } from '../../utils/AuthUtils'

interface UserProps {
  email: string
  password: string
}

class LoginUserService {
  async execute({ email, password }: UserProps) {
   
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(!user) {
      throw new Error ("User not found")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) {
      throw new Error ("Invalid credentials")
    }

    const accessToken = AuthUtils.generateAccessToken(user.id)

    return {
      erro: false,
      message: "Successful login!",
      user: { fullName: user.fullName, email: user.email},
      accessToken
    }
  }
}
export {LoginUserService}