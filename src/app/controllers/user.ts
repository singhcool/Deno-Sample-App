import { logger } from "../utils/logger.ts";
import { db } from "../config/db.ts";

export class UserController {
  public logger: any;
  public book: any;
  public user: any;

  constructor() {
    this.logger = logger();
    this.user = db.getDatabase().collection('users');
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

  public createUser = async(ctx: any, next: any) => {
    try{
      const body = await (ctx.request.body());
      if (!Object.keys(body).length) {
        ctx.throw(400, 'Request body can not be empty!');
      }
      const { first_name, last_name, email } = body.value;
      const insertedEmployee = await  this.user.insertOne({
        first_name,
        last_name,
        email,
      });
      ctx.response.status = 200;
      ctx.response.body = insertedEmployee;
    }catch(e){
      console.log(e);
      ctx.throw(500, 'Internal Server Error');
    }
  }
}
