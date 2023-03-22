import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TraitsService } from './traits.service';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@IsPublic()
@Controller('users')
export class TraitsController {
  constructor(private readonly traitsService: TraitsService) {}

  @Post(':userId/traits')
  async create(@Param('userId') id: string, @Body() data: CreateTraitDto) {
    return this.traitsService.create(id, data);
  }

  @Get('traits')
  findAll() {
    return this.traitsService.findAll();
  }

  @Get('traits/:id')
  findOne(@Param('id') id: string) {
    return this.traitsService.findOne(+id);
  }

  @Patch('traits/:id')
  update(@Param('id') id: string, @Body() updateTraitDto: UpdateTraitDto) {
    return this.traitsService.update(+id, updateTraitDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('traits/:id')
  remove(@Param('id') id: string) {
    return this.traitsService.remove(+id);
  }
}
