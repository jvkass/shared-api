import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface IUserInterceptor {
  userId: string;
  typeUser: number;
  subscriptionType: number;
  profileTest: number;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
