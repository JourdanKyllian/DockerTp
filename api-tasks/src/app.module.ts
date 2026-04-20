import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/tasks.entity';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'todo_db',
      entities: [Task],
      synchronize: true, // Auto-création des tables (OK pour le TP)
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
      },
    }),
    TasksModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
