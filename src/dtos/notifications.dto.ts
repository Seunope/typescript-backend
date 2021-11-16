import { IsNumber, IsBoolean } from 'class-validator';
import 'core-js/proposals/reflect-metadata';
import { Type } from 'class-transformer';
export class CreateNotificationDto {
  @IsNumber()
  @Type(() => Number)
  public replyId: number;

  @IsNumber()
  @Type(() => Number)
  public subscriptionId: number;

  @IsBoolean()
  public isViewed: boolean;

  @IsNumber()
  @Type(() => Number)
  public userId: number;
}

export class CreateDataNotificationDto {
  @IsNumber()
  @Type(() => Number)
  public replyId: number;

  @IsNumber()
  @Type(() => Number)
  public subscriptionId: number;

  @IsBoolean()
  public isViewed: boolean;
}

export class UpdateNotificationDto {
  @IsBoolean()
  public isViewed: boolean;
}
