import { isHttpError, Status } from "../config/deps.ts";


export const ErrorMiddleware = async (ctx : any, next :any) => {
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
      // rethrow if you can't handle the error
      throw err;
    }
  }
};