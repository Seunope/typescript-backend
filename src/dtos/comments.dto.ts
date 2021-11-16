import { IsString, IsNumber } from 'class-validator';
import 'core-js/proposals/reflect-metadata';
import { Type } from 'class-transformer';
export class CreateCommentDto {
  @IsNumber()
  @Type(() => Number)
  public answerId: number;

  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @IsString()
  public message: string;
}

export class CreateDataCommentDto {
  @IsNumber()
  @Type(() => Number)
  public answerId: number;

  @IsString()
  public message: String;
}

export class UpdateCommentDto {
  @IsString()
  public message: string;
}
