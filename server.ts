import { Application } from "./config/deps.ts";
import "https://deno.land/x/dotenv/load.ts";
import { ErrorMiddleware } from "./middlewares/error.ts";
import db from './config/db.ts';
import { router } from "./routes/routes.ts";

const app = new Application();
app.use(ErrorMiddleware);

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});


app.use(router.routes());
app.use(router.allowedMethods());



await app.listen({ port: 8000 });