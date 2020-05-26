import { Application } from "./config/deps.ts";
import "https://deno.land/x/dotenv/load.ts";
import { ErrorMiddleware } from "./middlewares/error.ts";
import { router } from "./routes/routes.ts";

export class App {
  public app: Application;
  public port: number;
  constructor(port: any) {
    this.app = new Application();
    this.port = port;
    this.initializeErrorHandling();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  // initialize middlewares
  private initializeMiddlewares() {
    this.app.use(async (ctx, next) => {
      await next();
      const rt = ctx.response.headers.get("X-Response-Time");
      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    });
  }

  // initialize error handling
  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  // initialize routes
  private initializeRoutes() {
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }
  // server listen
  public async listen() {
    await this.app.listen({ port: 8000 });
  }
}
