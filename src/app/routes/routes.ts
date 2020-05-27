import { Router } from "../config/deps.ts";
import { UserController } from "../controllers/user.ts";
const router = new Router();
const user = new UserController();

router.get("/book/:id", user.getBookByID);
router.post("/createuser", user.createUser);
router.get("/getuser/:id", user.getUserById);
router.put("/updateuser/:id", user.updateUserById);
router.delete("/deleteuser/:id", user.deleteUserById);

export { router };
