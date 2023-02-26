import { Module, CacheModule, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";
import { RedisCacheService } from "./redis-cache.service";

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.getOrThrow<string>("REDIS_HOST"),
        port: configService.getOrThrow<string>("REDIS_PORT"),
        auth_pass: configService.getOrThrow<string>("REDIS_PASSWORD"),
      }),
    }),
  ],
  providers: [
    {
      provide: "ICacheMemory",
      useClass: RedisCacheService,
    },
  ],
  exports: [
    {
      provide: "ICacheMemory",
      useClass: RedisCacheService,
    },
  ],
})
export class RedisCacheModule {}
