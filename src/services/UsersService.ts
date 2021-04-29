import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from '../repositories/UsersRepository'

class UsersService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository)

    const userExists = await usersRepository.findOne({ email })

    if (userExists) {
      return userExists
    }

    const user = usersRepository.create({
      email
    })

    await usersRepository.save(user)

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      email,
    })

    return user
  }
}

export { UsersService }