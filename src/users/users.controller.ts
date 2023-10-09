import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private authService: UsersService) {}
  @Post()
  signup(@Body() body: SignUpUserDto) {}
  @Post()
  login(@Body() body: LoginUserDto) {}
}
