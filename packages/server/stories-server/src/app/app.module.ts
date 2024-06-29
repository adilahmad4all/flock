import { Module } from '@nestjs/common';
import { StoriesModule } from "../modules/stories/stories.module";

import { AppController } from './app.controller';

@Module({
  imports: [StoriesModule],
  controllers: [AppController],
})
export class AppModule {}
