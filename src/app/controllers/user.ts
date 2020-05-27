import { logger } from "../utils/logger.ts";
import { db } from "../config/db.ts";
import { User } from "../models/users.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export class UserController {
  public logger: any;
  public book: any;
  public user: any;

  constructor() {
    this.logger = logger();
    this.user = db.getDatabase().collection("users");
    this.book = new Map<string, any>();
    this.book.set("1", {
      id: "1",
      title: "The Hound of the Baskervilles",
      author: "Conan Doyle, Author Test",
    });
  }

  public getBookByID = (ctx: RouterContext, next: () => Promise<void>) => {
    if (ctx.params && ctx.params.id && this.book.has(ctx.params.id)) {
      ctx.response.body = this.book.get(ctx.params.id);
    } else {
      this.logger.info(
        "No book found for the given book Id {Id}",
        ctx.params.id
      );
      ctx.throw(404, `No book found for the given book Id ${ctx.params.id} `);
    }
  };

  /**
   * Create a User
   *
   * @name User Create
   * @route {POST} /createuser
   * @bodyparam {String} first_name
   * @bodyparam {String} last_name
   * @bodyparam {String} email
   *
   */
  public createUser = async (ctx: RouterContext, next: () => Promise<void>) => {
      const body = await ctx.request.body();
      if (!ctx.request.hasBody) {
        ctx.throw(400, "Request body can not be empty!");
      }
      const { first_name, last_name, email } = body.value;
      const insertedEmployee = await this.user.insertOne({
        first_name,
        last_name,
        email,
      });
      ctx.response.status = 200;
      ctx.response.body = insertedEmployee;
  };

  /**
   * Get user by Id
   *
   * @name User get by Id
   * @route {GET} /getuser/:id
   * @queryparam {String} id
   *
   */

  public getUserById = async (ctx: RouterContext, next: () => Promise<void>) => {
      if (ctx.params && ctx.params.id) {
        const user = await this.user.findOne({
          _id: {
            $oid: ctx.params.id,
          },
        });
        if (user) {
          ctx.response.status = 200;
          ctx.response.body = user;
        } else {
          this.logger.info(
            "No User found for the given Id {Id}",
            ctx.params.id
          );
          return ctx.throw(
            404,
            `No User found for the given Id ${ctx.params.id} `
          );
        }
      }
  };

  /**
   * Update User by Id
   *
   * @name User Update
   * @route {PUT} /updateuser/:id
   * @bodyparam {String} first_name
   * @bodyparam {String} last_name
   * @bodyparam {String} email
   * @queryparam {String} id
   *
   */
  public updateUserById = async (ctx: RouterContext, next: () => Promise<void>) => {
      const body = await ctx.request.body();
      if (!ctx.request.hasBody) {
        ctx.throw(400, "Request body can not be empty!");
      }
      if (ctx.params && ctx.params.id) {
        const user = await this.user.findOne({
          _id: {
            $oid: ctx.params.id,
          },
        });
        if (user) {
          const updatedPost = await this.user.updateOne(
            {
              _id: {
                $oid: ctx.params.id,
              },
            },
            body.value
          );
          ctx.response.status = 200;
          ctx.response.body = updatedPost;
        } else {
          this.logger.info(
            "No User found for the given Id {Id}",
            ctx.params.id
          );
          ctx.throw(404, `No User found for the given Id ${ctx.params.id} `);
        }
      }
  };

  /**
   * Delete User by Id
   *
   * @name User Delete
   * @route {DELETE} /deleteuser/:id
   * @queryparam {String} id
   *
   */
  public deleteUserById = async (ctx: RouterContext, next: () => Promise<void>) => {
      if (ctx.params && ctx.params.id) {
        const user = await this.user.findOne({
          _id: {
            $oid: ctx.params.id,
          },
        });
        if (user) {
          await this.user.deleteOne({
            _id: {
              $oid: ctx.params.id,
            },
          });
          ctx.response.status = 200;
          ctx.response.body = { message: "Deleted Successfully" };
        } else {
          this.logger.info(
            "No User found for the given Id {Id}",
            ctx.params.id
          );
          ctx.throw(404, `No User found for the given Id ${ctx.params.id} `);
        }
      }
  };
}
