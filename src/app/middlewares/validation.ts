import validator from "https://dev.jspm.io/class-validator@0.8.5";
import transformer from "https://dev.jspm.io/class-transformer@0.2.3";
import {
  RouterContext,
  helpers,
  Middleware,
} from "https://deno.land/x/oak/mod.ts";
const { validate, ValidationError } = validator;
const { plainToClass } = transformer;

export function validationMiddleware(
  type: any,
  skipMissingProperties = false
): Middleware {
  return async (context, next) => {
    let body = await context.request.body();
    await next();
    validate(
      plainToClass(type, {
        ...body.value,
        ...helpers.getQuery(context, { mergeParams: true }),
      }),
      {
        skipMissingProperties,
      }
    ).then(async (errors: any) => {
      if (errors.length > 0) {
        const message = errors.map((error: any) =>
          Object.values(error.constraints)
        );
        context.response.status = 404;
        context.response.body = { status: 404, message: message[0] };
      }
    });
  };
}
