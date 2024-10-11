import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';  // Usa forwardRef para evitar la dependencia circular

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),  // Usa forwardRef aquí también
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],  // Exporta UserService si es necesario
})
export class UserModule {}
