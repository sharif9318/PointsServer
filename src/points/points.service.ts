import { Injectable } from '@nestjs/common';
import { EarnDto } from './dto/earn.dto';
import { EarnResponseDto } from './dto/earn-response.dto';
import { BalanceResponseDto } from './dto/balance-response.dto';
import { HistoryResponseDto } from './dto/history-response.dto';

@Injectable()
export class PointsService {
  private balance = 0;
  private history: any[] = [];

  earnPoints(dto: EarnDto): EarnResponseDto {
    this.balance += dto.amount;

    this.history.push({
      type: 'earn',
      amount: dto.amount,
      note: dto.note ?? null,
      date: new Date(),
    });

    return {
      message: 'Points earned successfully',
      newBalance: this.balance,
    };
  }

  getBalance(): BalanceResponseDto {
    return {
      balance: this.balance,
    };
  }

  getHistory(): HistoryResponseDto {
    return {
      transactions: this.history,
    };
  }
}
