import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/http/user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.validateUserCredentials(username, pass);
    const payload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),  // Expiración de 60 minutos
      refresh_token: this.jwtService.sign(payload, { 
        secret: jwtConstants.secret,  // Usa el mismo secret para ambos tokens
        expiresIn: '7d',  // El refresh token expira en 7 días
      }),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: jwtConstants.secret });
      const user = await this.userService.findOneByUsername(decoded.username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newAccessToken = this.jwtService.sign({ username: user.email });
      const newRefreshToken = this.jwtService.sign({ username: user.email }, { expiresIn: '7d' });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
