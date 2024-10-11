import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../http/user/user.module';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),  // Usa forwardRef para evitar la dependencia circular
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '80m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],  // Exporta JwtModule para que otros módulos puedan usarlo
})
export class AuthModule {}
