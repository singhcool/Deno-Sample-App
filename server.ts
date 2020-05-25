import { Application, Router } from "./config/deps.ts";
import "https://deno.land/x/dotenv/load.ts";
import { db } from './config/db.ts'; 
import { router } from "./routes/routes.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});


app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });