import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  location?: string; // Geolocalización como string
}
