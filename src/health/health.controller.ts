import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DataSource } from 'typeorm';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Controller('health')
export class HealthController {
  constructor(
    private dataSource: DataSource,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async check(@Res() res: Response) {
    const health: Record<string, any> = { status: 'healthy', timestamp: new Date().toISOString() };
    
    try {
      await this.dataSource.query('SELECT 1');
      health.database = 'connected';
    } catch {
      health.status = 'unhealthy';
      health.database = 'disconnected';
    }

    try {
      const client = this.redisService.getOrThrow();
      await client.ping();
      health.cache = 'connected';
    } catch {
      health.status = 'unhealthy';
      health.cache = 'disconnected';
    }

    const code = health.status === 'healthy' ? 200 : 503;
    return res.status(code).json(health);
  }
}