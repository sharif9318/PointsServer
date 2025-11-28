import { Injectable } from '@nestjs/common';

type HistoryItem = {
  id: string;
  amount: number; // positive earn, negative spend
  note?: string;
  ts: string;
};

@Injectable()
export class PointsService {
  // structure: userId -> { balance, history[] }
  private store = new Map<
    string,
    { balance: number; history: HistoryItem[] }
  >();

  private ensureUser(userId: string) {
    if (!this.store.has(userId)) {
      this.store.set(userId, { balance: 0, history: [] });
    }
  }

  earn(userId: string, amount: number, note?: string) {
    this.ensureUser(userId);
    const entry = this.store.get(userId)!;
    entry.balance += amount;
    const item: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      amount,
      note,
      ts: new Date().toISOString(),
    };
    entry.history.unshift(item);
    return { balance: entry.balance, item };
  }

  getBalance(userId: string) {
    this.ensureUser(userId);
    return this.store.get(userId)!.balance;
  }

  getHistory(userId: string, limit = 50) {
    this.ensureUser(userId);
    return this.store.get(userId)!.history.slice(0, limit);
  }
}
