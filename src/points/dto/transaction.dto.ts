import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({
    example: 'earn',
    description: 'Transaction type',
    enum: ['earn', 'spend'],
  })
  type: string;

  @ApiProperty({
    example: 100,
    description: 'Number of points',
  })
  amount: number;

  @ApiProperty({
    example: 'Completed onboarding tutorial',
    description: 'Transaction note',
    required: false,
  })
  note?: string;

  @ApiProperty({
    example: '2025-11-30T10:30:00.000Z',
    description: 'Transaction timestamp',
  })
  date: Date;
}
