import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT token for authentication',
  })
  access_token: string;

  @ApiProperty({
    example: 'Bearer',
    description: 'Token type',
  })
  token_type?: string;

  @ApiProperty({
    example: 28800,
    description: 'Token expiration time in seconds (8 hours)',
  })
  expires_in?: number;
}
