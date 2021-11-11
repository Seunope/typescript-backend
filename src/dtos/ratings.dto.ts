import { IsString, IsNumber, IsBoolean } from 'class-validator';
import 'core-js/proposals/reflect-metadata';
import { Type } from 'class-transformer';
export class CreateRatingDto {
  @IsBoolean()
  public upVote: boolean;

  @IsBoolean()
  public downVote: boolean;

  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @IsNumber()
  @Type(() => Number)
  public modelId: number;

  @IsString()
  public type: string;
}
