import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class EarnDto {
  @ApiProperty({
    example: 100,
    description: 'Number of points to add to user balance',
    minimum: 1,
  })
  @IsNumber()
  @Min(1, { message: 'Amount must be at least 1' })
  amount: number;

  @ApiProperty({
    example: 'User completed onboarding tutorial',
    description: '(Optional) Description or context for earning points',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string;
}
