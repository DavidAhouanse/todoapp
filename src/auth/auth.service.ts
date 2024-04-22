import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async signUp(user): Promise<any> {
    return await this.usersService.create(user);
  }

  async comparePassword(password, hashedPaswword) {}
}
