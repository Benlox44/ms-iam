import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsOptional()
  phone?: number;

  @IsOptional()
  address?: string;

  @IsOptional()
  addressAdditional?: string;

  @IsOptional()
  @IsString() // Validación para asegurarse de que sea un string
  location?: string;
}
