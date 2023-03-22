import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserUpdateDTO } from './user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard)
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
