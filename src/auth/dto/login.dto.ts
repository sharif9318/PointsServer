import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'Registered user email address',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User account password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
