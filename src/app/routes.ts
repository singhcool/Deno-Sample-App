import { Router } from "../config/deps.ts";
import { UserController } from "../controllers/user.ts";
import { UserModel } from "../models/users.ts";
import { validationMiddleware } from "../middlewares/validation.ts";
const router = new Router();
const user = new UserController();


/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       email:
 *         type: string
 */

 /**
 * @swagger
 * /createuser:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post("/createuser", validationMiddleware(UserModel), user.createUser);
router.get("/book/:id", user.getBookByID);
router.post("/createuser", validationMiddleware(UserModel), user.createUser);
router.get("/getuser/:id", user.getUserById);
router.put("/updateuser/:id", validationMiddleware(UserModel), user.updateUserById);
router.delete("/deleteuser/:id", user.deleteUserById);

export { router };
