import prismaClient from "../prisma"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface UserProps {
  fullName: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ fullName, email, password }: UserProps) {
    const isUser = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(isUser) {
      throw new Error ("Usuário já existe")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prismaClient.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword
      }
    })
    
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "72h" }
    )

    return {
      error: false,
      user: {
        fullName: user.fullName, email: user.email
      },
      accessToken,
      message: "Registrado com sucesso!"
    }
  }
}
export {CreateUserService}