import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EarnDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  note?: string;
}
