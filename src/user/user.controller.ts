import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from './user.schema';
import { UserDTO } from './user.dto';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':username')
  async findOneUser(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @Post('register')
  async registerUser(@Body() user: Partial<UserDTO>): Promise<User> {
    return this.usersService.register(user);
  }
}
