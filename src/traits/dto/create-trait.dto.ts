import { IsNumber, IsString } from 'class-validator';

export class CreateTraitDto {
  @IsString()
  name: string;
}
