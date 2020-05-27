import { isHttpError, Status } from "../config/deps.ts";
import { logger } from "../utils/logger.ts";


export const ErrorMiddleware = async (ctx : any, next :any) => {
  var loggerErr : any;
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          ctx.response.status = err.status;
          ctx.response.body = { 'message': err.message }
          break;
        default:
          ctx.response.status = err.status;
          ctx.response.body = { message: err.message ? err.message : 'Internal Server Error' }
      }
    } else {
      loggerErr = logger();
      loggerErr.info("Internal Server Error name {err} message {message}", err.name, err.message);
      ctx.response.status = 500;
      ctx.response.body = { message: 'Internal Server Error' }
    }
  }
};