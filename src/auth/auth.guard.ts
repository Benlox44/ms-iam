
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(
  private jwtService: JwtService,
  private authService: AuthService,
) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest();
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    throw new UnauthorizedException('Token no proporcionado');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });
    request.user = decoded; 
    return true;
  } catch (err) {
    const refreshToken = request.headers['x-refresh-token']; 
    if (refreshToken) {
      const newTokens = await this.authService.refreshToken(refreshToken);
      request.headers['authorization'] = `Bearer ${newTokens.accessToken}`;
      return true;
    }
    throw new UnauthorizedException('Token inválido o inactivo');
  }
}
}
