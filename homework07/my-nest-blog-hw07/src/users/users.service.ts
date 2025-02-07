import { LoginUserDto } from './dto/login-user.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    //
  }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash,
    });

    return await this.usersRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (
      !user ||
      (await bcrypt.compare(loginUserDto.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.name };
    const access_token = await this.jwtService.signAsync(payload);
    console.log('access_token', access_token);

    return {
      access_token,
    };
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
