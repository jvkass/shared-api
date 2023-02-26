import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthCheckController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.disk.checkStorage("storage", {
          path: "/",
          threshold: 250 * 1024 * 1024 * 1024,
        }),
      () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024),
    ]);
  }
}
