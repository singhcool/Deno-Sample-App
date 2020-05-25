import { Router, config } from "../config/deps.ts";
import { api, getBookByID } from "../controllers/user.ts";
const router = new Router();

router.get("/", async(ctx) =>  await api(ctx) );
router.get("/book/:id", async(ctx) =>  await getBookByID(ctx) );

  export {
      router,
  }