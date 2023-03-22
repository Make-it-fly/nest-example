import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDTO, UserUpdateDTO } from './user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() data: UserRequestDTO) {
    console.log(data);
    return this.userService.create(data);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UserUpdateDTO) {
    const intId = parseInt(id);
    return this.userService.update(intId, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const intId = parseInt(id);
    return this.userService.delete(intId);
  }
}
