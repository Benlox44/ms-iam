import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard'; // Asegúrate de importar el AuthGuard
import * as bcrypt from 'bcrypt';

@Controller('user')  
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,  
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard) // Protegemos esta ruta con el AuthGuard
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard) // Protegemos esta ruta con el AuthGuard
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard) // Protegemos esta ruta con el AuthGuard
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard) // Protegemos esta ruta con el AuthGuard
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  async login(@Body() loginUserDto: { username: string; password: string }) {
    const user = await this.userService.findOneByUsername(loginUserDto.username);

    if (!user || !user.password || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
