import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Successful login. Returns JWT token.',
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
}
