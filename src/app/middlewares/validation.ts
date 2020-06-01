import validator from "https://dev.jspm.io/class-validator@0.8.5";
import transformer from "https://dev.jspm.io/class-transformer@0.2.3";

import { RouterContext, helpers } from "https://deno.land/x/oak/mod.ts";
const { validate } = validator;
const { plainToClass } = transformer;

export function validationMiddleware(type: any, skipMissingProperties = false) {
  return async (ctx: RouterContext, next: any) => {
    let body = await ctx.request.body();
    let errors = await validate(
      plainToClass(type, {
        ...body.value,
        ...helpers.getQuery(ctx, { mergeParams: true }),
      }),
      {
        skipMissingProperties,
      }
    );
    if (errors.length > 0) {
      const message = errors.map((error: any) =>
        Object.values(error.constraints)
      );
      ctx.response.status = 404;
      ctx.response.body = { status: 404, message: message[0] };
    } else {
      await next();
    }
  };
}
