import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ValidateJwtGuardModule } from "./adapters/auth/jwt-auth-guard/validate-jwt-guard.module";
import { RedisCacheModule } from "./adapters/cache/redis/redis-cache.module";
import { HealthCheckModule } from "./adapters/health-check/health-check.module";

const adapters = [
  ConfigModule,
  HealthCheckModule,
  ValidateJwtGuardModule,
  RedisCacheModule,
];

@Global()
@Module({
  imports: [...adapters],
  controllers: [],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
