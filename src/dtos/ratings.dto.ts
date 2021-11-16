import { IsString, IsNumber } from 'class-validator';
import 'core-js/proposals/reflect-metadata';
import { Type } from 'class-transformer';
export class CreateRatingDto {
  @IsString()
  public vote: string;

  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @IsNumber()
  @Type(() => Number)
  public modelId: number;

  @IsString()
  public type: string;
}

export class CreateRating2Dto {
  @IsString()
  public vote: string;

  @IsNumber()
  @Type(() => Number)
  public modelId: number;

  @IsString()
  public type: string;
}

export class UpdateRatingDto {
  @IsString()
  public vote: string;
}

export class UpdateUserRatingDto {
  @IsString()
  public vote: string;


  @IsNumber()
  @Type(() => Number)
  public userId: number;
}