import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../db/schema';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DRIZZLE_DB',
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined');
        }
        
        const client = postgres(connectionString);
        return drizzle(client, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DRIZZLE_DB'],
})
export class DatabaseModule {}
