import { Router } from "../config/deps.ts";
import { UserController } from "../controllers/user.ts";
const router = new Router();
const user = new UserController();

router.get("/", user.api);
router.get("/book/:id", user.getBookByID);

export { router };
