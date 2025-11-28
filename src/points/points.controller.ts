import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PointsService } from './points.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EarnDto } from './dto/earn.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('points')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  // POST /api/earn
  @Post('earn')
  @ApiOperation({ summary: 'Earn points for the authenticated user' })
  earn(@Req() req: Request & { user?: any }, @Body() body: EarnDto) {
    const user = req.user;
    const userId = user.id || user.sub;
    return this.pointsService.earn(userId, body.amount, body.note);
  }

  // GET /api/balance
  @Get('balance')
  @ApiOperation({
    summary: 'Get current points balance for authenticated user',
  })
  balance(@Req() req: Request & { user?: any }) {
    const userId = req.user.id || req.user.sub;
    return { balance: this.pointsService.getBalance(userId) };
  }

  // GET /api/history
  @Get('history')
  @ApiOperation({ summary: 'Get earning/spend history' })
  history(@Req() req: Request & { user?: any }) {
    const userId = req.user.id || req.user.sub;
    return { history: this.pointsService.getHistory(userId) };
  }
}
