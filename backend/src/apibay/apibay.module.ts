import { Module } from '@nestjs/common';
import { ApibayService } from './apibay.service';

@Module({
  providers: [ApibayService],
  exports: [ApibayService],
})
export class ApibayModule {}
