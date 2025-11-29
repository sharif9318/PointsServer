import { ApiProperty } from '@nestjs/swagger';

export class BalanceResponseDto {
  @ApiProperty({
    example: 1250,
    description: 'Current point balance',
  })
  balance: number;
}
