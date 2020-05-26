import { logger } from "../utils/logger.ts";

export class UserController {
  public logger: any;
  public book: any;

  constructor() {
    this.logger = logger();
    this.book = new Map<string, any>();
    this.book.set("1", {
      id: "1",
      title: "The Hound of the Baskervilles",
      author: "Conan Doyle, Author Test",
    });
  }

  public api = (ctx: any) => {
    ctx.response.body = Deno.env.get("GREETING");
  };

  public getBookByID = (ctx: any, next: any) => {
    if (ctx.params && ctx.params.id && this.book.has(ctx.params.id)) {
      ctx.response.body = this.book.get(ctx.params.id);
    } else {
      this.logger.info("No book found for the given book Id {Id}", ctx.params.id);
      ctx.throw(404, `No book found for the given book Id ${ctx.params.id} `);
    }
  };
}
