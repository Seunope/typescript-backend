import { IsString, IsNumber } from 'class-validator';
import 'core-js/proposals/reflect-metadata';
import { Type } from 'class-transformer';
export class CreateReplyDto {
  @IsString()
  public reply: string;

  @IsNumber()
  @Type(() => Number)
  public upVote: number;

  @IsNumber()
  @Type(() => Number)
  public downVote: number;

  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @IsNumber()
  @Type(() => Number)
  public questionId: number;
}

export class CreateDataReplyDto {
  @IsString()
  public reply: string;

  @IsNumber()
  @Type(() => Number)
  public questionId: number;
}
