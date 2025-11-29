import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    example: 401,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Invalid or expired token',
    description: 'Detailed error description',
    required: false,
  })
  error?: string;
}
