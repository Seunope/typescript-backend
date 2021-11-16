import { Min, IsString, IsNumber } from 'class-validator';
import 'core-js/proposals/reflect-metadata';
import { Type } from 'class-transformer';
export class CreateQuestionDto {
  @IsString()
  public question: string;

  @IsString()
  public tags: string;

  @IsString()
  public title: string;

  @IsNumber()
  // @Min(-90)
  // @Max(90)
  @Type(() => Number)
  public upVote: number;

  @IsNumber()
  @Type(() => Number)
  public downVote: number;

  @IsNumber()
  @Type(() => Number)
  public userId: number;
}

export class SetQuestionDto {
  @IsString()
  public question: string;

  @IsString()
  public tags: string;

  @IsString()
  public title: string;
}

export class UpdateQuestionDto {
  @IsString()
  public question: string;
}