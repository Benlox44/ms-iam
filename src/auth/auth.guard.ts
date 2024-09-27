import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  
  @Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    console.log('AuthGuard received headers:', request.headers); 

    if (!authHeader) {
      console.log('No token provided');  
      throw new UnauthorizedException('No se proporcionó un token');
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extracted in AuthGuard:', token);  

    try {
      const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });
      console.log('Token decoded in AuthGuard:', decoded); 
      request.user = decoded;
      return true;
    } catch (error) {
      console.error('Error verifying token in AuthGuard:', error); 
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}