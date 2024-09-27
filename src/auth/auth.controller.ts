import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'; 
import { Request as ExpressRequest } from 'express';
import { jwtConstants } from './constants';

interface RequestWithUser extends ExpressRequest {
  user?: any;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('Login request received with:', signInDto);  
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    console.log('Profile request received, user:', req.user); 
    return req.user;
  }

  @Get('check')
  verifyToken(@Request() req: ExpressRequest) {
    console.log('Check token request headers:', req.headers); 
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extraído:', token);  

    try {
      const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });
      console.log('Token decoded:', decoded);  
      return { message: 'Token válido', isValid: true };
    } catch (error) {
      console.error('Error al verificar el token:', error);  
      throw new UnauthorizedException('Token inválido o inactivo');
    }
  }
}