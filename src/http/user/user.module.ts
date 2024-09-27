import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '../../schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';  // Importa el JwtModule
import { jwtConstants } from 'src/auth/constants';  // Importa la clave secreta

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,  // Usa la clave secreta definida en auth/constants.ts
      signOptions: { expiresIn: '60m' },  // Opciones de firma para el token JWT
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],  // Exporta UserService si lo necesitas en otros módulos
})
export class UserModule {}
