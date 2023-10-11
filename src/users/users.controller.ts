import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-password.dto';

@Controller('auth')
export class UsersController {
  constructor(private authService: UsersService) {}
  @Post('/signup')
  signup(@Body() body: SignUpUserDto) {
    return this.authService.registerUser(
      body.firstName,
      body.lastName,
      body.email,
      body.password,
    );
  }
  @Post('/login')
  login(@Body() body: LoginUserDto) {}
  @Get('/:id')
  findUser(@Param() id: string) {}
  @Get('')
  findUserByEmail(@Query('email') email: string) {}
  @Patch('/:id')
  updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    this.authService.update(Number(id), body);
  }
  @Patch('/update-password')
  updateUserPassword(@Body() body: UpdateUserPasswordDto) {}
  @Delete('/:id')
  deleteUser(@Param() id: string) {}
}
