import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';  // Usa AuthModule para todo lo relacionado con JWT

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,  // Usa AuthModule que ya tiene JwtModule configurado
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
