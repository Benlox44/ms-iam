import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../http/user/user.module';  // Asegúrate de importar el UserModule
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller'; 

@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: '80m' },
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService],
})
export class AuthModule {}
