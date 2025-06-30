import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new BadRequestException('Email already in use');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ name, email, password: hashed });
    const { password: _, ...result } = user.toObject();
    return result;
  }

  @Get()
  async findAll() {
    const users = await this.userModel.find().select('-password');
    return users;
  }
} 