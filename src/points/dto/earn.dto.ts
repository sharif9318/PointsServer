import { ApiProperty } from '@nestjs/swagger';

export class EarnDto {
  @ApiProperty({
    example: 100,
    description: 'Number of points to add to user balance',
  })
  amount: number;

  @ApiProperty({
    example: 'User completed onboarding tutorial',
    description: '(Optional) Description or context for earning points',
    required: false,
  })
  note?: string;
}
