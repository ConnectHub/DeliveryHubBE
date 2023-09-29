import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from '../roles/guard/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserViewModel } from './view-model/user-view-model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('create')
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.userService.createUser(userDto);
    return UserViewModel.toHttp(user);
  }
}
