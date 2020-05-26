import { Router, config } from "../config/deps.ts";
import { api, getBookByID } from "../controllers/user.ts";
const router = new Router();

router.get("/", api);
router.get("/book/:id", getBookByID);

  export {
      router,
  }