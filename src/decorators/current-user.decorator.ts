import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((param: string, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();

  return param ? user?.[param] : user;
});
