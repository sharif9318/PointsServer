import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EarnDto } from './dto/earn.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PointsService } from './points.service';

@ApiTags('Points')
@ApiBearerAuth()
@Controller('api')
@UseGuards(JwtAuthGuard)
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post('earn')
  @ApiBody({ type: EarnDto })
  @ApiResponse({ status: 201, description: 'Points added successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Missing or invalid token.',
  })
  earn(@Body() earnDto: EarnDto) {
    return this.pointsService.earnPoints(earnDto);
  }

  @Get('balance')
  @ApiResponse({ status: 200, description: 'Returns current user balance.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  balance() {
    return this.pointsService.getBalance();
  }

  @Get('history')
  @ApiResponse({
    status: 200,
    description: 'Returns earning/spending history.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  history() {
    return this.pointsService.getHistory();
  }
}
