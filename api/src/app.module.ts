import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';

// Load .env from api/ first, then from monorepo root (so one root .env works)
const envPaths = [
  join(process.cwd(), '.env'),
  join(process.cwd(), '..', '.env'),
].filter(Boolean);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPaths,
    }),
    ChatModule,
  ],
})
export class AppModule {}
