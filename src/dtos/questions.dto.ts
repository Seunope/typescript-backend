import { IsString, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  public question: string;

  @IsNumber()
  public upVote: number;

  @IsNumber()
  public downVote: number;

  @IsNumber()
  public userId: number;
}
