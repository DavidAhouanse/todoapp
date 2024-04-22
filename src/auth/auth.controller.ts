import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './decorator/public.decorator';
import { Roles } from './decorator/role.decorator';
import { RolesGuard } from './guards/role.guard';
import { Role } from 'src/enums';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Get('profile')
  getprofile(@Request() req) {
    return `User: ${req.user}`;
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('change-password')
  changePassword(@Request() req) {
    return `User: ${req.user.roles}`;
  }
}
