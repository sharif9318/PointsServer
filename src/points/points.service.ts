import { Injectable } from '@nestjs/common';
import { EarnDto } from './dto/earn.dto';

@Injectable()
export class PointsService {
  private balance = 0;
  private history: any[] = [];

  earnPoints(dto: EarnDto) {
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

  getBalance() {
    return {
      balance: this.balance,
    };
  }

  getHistory() {
    return this.history;
  }
}
