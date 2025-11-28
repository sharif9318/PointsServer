import { Module } from '@nestjs/common';
import { PointsModule } from './points/points.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, PointsModule],
})
export class AppModule {}
