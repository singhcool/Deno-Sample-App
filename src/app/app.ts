import { Application, send, Router } from "./config/deps.ts";
import { ErrorMiddleware } from "./middlewares/error.ts";
import { router } from "./routes/routes.ts";
import { logger } from './utils/logger.ts';
import { notFound } from './utils/404.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import  { swaggerDoc } from 'https://raw.githubusercontent.com/singhcool/deno-swagger-doc/master/mod.ts';
import { createRequire } from "https://deno.land/std/node/module.ts";
const require = createRequire(import.meta.url);

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

    this.app.use(async (context, next) => {
      context.request.url.pathname.includes('/api-docs') ?  await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/src/app`,
        index: "index.html",
      }) : await next();

      if(context.request.url.pathname === '/swagger.json'){
        context.response.headers.set('Content-Type', 'application/json');
        context.response.status = 200;
        context.response.body = await swaggerDoc({
            swaggerDefinition: require('./api-docs/swagger.json'),
            apis: [`${Deno.cwd()}/src/app/routes/routes.ts`],
          });
      } 

    });
    
    this.app.use(async (ctx, next) => {
      await next();
      const rt = ctx.response.headers.get("X-Response-Time");
      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    });
  }

  // initialize error handling
  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
    this.app.use(oakCors());
  }

  // initialize routes
  private initializeRoutes() {
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
    this.app.use(notFound);
  }
  // server listen
  public async listen() {
    return await this.app.listen({ port: this.port });
  }
}
