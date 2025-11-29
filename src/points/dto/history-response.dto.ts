import { ApiProperty } from '@nestjs/swagger';
import { TransactionDto } from './transaction.dto';

export class HistoryResponseDto {
  @ApiProperty({
    type: [TransactionDto],
    description: 'List of all transactions',
  })
  transactions: TransactionDto[];
}
