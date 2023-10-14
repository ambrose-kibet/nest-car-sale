import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { SignUpUserDto } from './dtos/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const isEmail = await this.usersService.find(email);
    if (isEmail) {
      throw new BadRequestException(' email  must be unique');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.usersService.registerUser(
      firstName,
      lastName,
      email,
      hashedPassword,
    );
  }
  async signIn(email: string, password: string) {
    const user = await this.usersService.find(email);
    if (!user) {
      throw new UnauthorizedException('wrong  email or password');
    }
    const isCorrectpass = await bcrypt.compare(password, user.password);
    if (!isCorrectpass) {
      throw new UnauthorizedException('wrong  email or password');
    }
    return user;
  }
}
