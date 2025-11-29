import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'Registered user email address',
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User account password',
  })
  password: string;
}
