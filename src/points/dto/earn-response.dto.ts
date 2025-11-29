import { ApiProperty } from '@nestjs/swagger';

export class EarnResponseDto {
  @ApiProperty({
    example: 'Points earned successfully',
    description: 'Success message',
  })
  message: string;

  @ApiProperty({
    example: 1250,
    description: 'Updated balance after earning points',
  })
  newBalance: number;
}
