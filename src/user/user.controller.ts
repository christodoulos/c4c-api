import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from './user.schema';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':username')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async findOneUser(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }
}
