import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { EarnDto } from './dto/earn.dto';
import { EarnResponseDto } from './dto/earn-response.dto';
import { BalanceResponseDto } from './dto/balance-response.dto';
import { HistoryResponseDto } from './dto/history-response.dto';
import { ErrorResponseDto } from '../auth/dto/error-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PointsService } from './points.service';

@ApiTags('Points')
@ApiBearerAuth()
@Controller('api')
@UseGuards(JwtAuthGuard)
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post('earn')
  @ApiOperation({
    summary: 'Earn points',
    description: "Add points to the authenticated user's balance",
  })
  @ApiBody({ type: EarnDto })
  @ApiResponse({
    status: 201,
    description: 'Points added successfully.',
    type: EarnResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Missing or invalid token.',
    type: ErrorResponseDto,
  })
  earn(@Body() earnDto: EarnDto): EarnResponseDto {
    return this.pointsService.earnPoints(earnDto);
  }

  @Get('balance')
  @ApiOperation({
    summary: 'Get current balance',
    description:
      'Retrieve the current point balance for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns current user balance.',
    type: BalanceResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorResponseDto,
  })
  balance(): BalanceResponseDto {
    return this.pointsService.getBalance();
  }

  @Get('history')
  @ApiOperation({
    summary: 'Get transaction history',
    description:
      'Retrieve all earning and spending transactions for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns earning/spending history.',
    type: HistoryResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorResponseDto,
  })
  history(): HistoryResponseDto {
    return this.pointsService.getHistory();
  }
}
