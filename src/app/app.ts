import { Application } from "./config/deps.ts";
import { ErrorMiddleware } from "./middlewares/error.ts";
import { router } from "./routes/routes.ts";
import { logger } from './utils/logger.ts';

export class App {
  public app: Application;
  public port: number;
  public logger: any;

  constructor(port: any) {
    this.app = new Application();
    this.port = port;
    this.logger = logger();

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
    return await this.app.listen({ port: this.port });
  }
}
