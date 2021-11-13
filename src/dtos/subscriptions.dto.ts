import { Min, IsString, IsNumber, IsBoolean } from 'class-validator';
import 'core-js/proposals/reflect-metadata';
import { Type } from 'class-transformer';
export class CreateSubscriptionDto {
  @IsNumber()
  @Type(() => Number)
  public questionId: number;

  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @IsBoolean()
  public isSubscribed: boolean;
}

export class CreateDataSubscriptionDto {
  @IsNumber()
  @Type(() => Number)
  public questionId: number;

  @IsBoolean()
  public isSubscribed: boolean;
}

export class UpdateSubscriptionDto {
  @IsBoolean()
  public isSubscribed: boolean;
}

