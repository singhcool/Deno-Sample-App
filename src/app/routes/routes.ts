import { Router } from "../config/deps.ts";
import { UserController } from "../controllers/user.ts";
import { UserModel } from "../models/users.ts";
import { validationMiddleware } from "../middlewares/validation.ts";
const router = new Router();
const user = new UserController();

router.get("/book/:id", user.getBookByID);
router.post("/createuser", validationMiddleware(UserModel), user.createUser);
router.get("/getuser/:id", user.getUserById);
router.put("/updateuser/:id", validationMiddleware(UserModel), user.updateUserById);
router.delete("/deleteuser/:id", user.deleteUserById);

export { router };
