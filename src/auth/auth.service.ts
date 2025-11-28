import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type User = { id: string; username: string; name?: string };

@Injectable()
export class AuthService {
  private readonly demoUser: User = {
    id: 'user-1',
    username: 'demo',
    name: 'Demo User',
  };

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    if (username === this.demoUser.username) return this.demoUser;
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
