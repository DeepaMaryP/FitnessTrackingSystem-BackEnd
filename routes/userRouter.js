import { Router } from "express";
import { handleValidateUserSignIn, validateUser, validateUserForAdmin } from "../middleware/userMiddleware.js";
import { createUser, deleteUser, getUserById, getUsers, getUsersCount, getUserStatistics, loginUser, updateUser } from "../controller/userController.js";
import { handleAuth } from "../middleware/auth.js";
const router = Router()

router.route('/login').post(handleValidateUserSignIn, loginUser)
router.route("/register").post(validateUser, createUser);

//admin
router.route("/").post(validateUserForAdmin, handleAuth, createUser);
router.route("/").get(handleAuth, getUsers)
router.route("/:userId").get(handleAuth, getUserById)
router.route("/:userId").patch(handleAuth, updateUser)
router.route("/:userId").delete(handleAuth, deleteUser)
router.route("/dash/usercount").get(handleAuth, getUsersCount)
router.route("/dash/regusers").get(handleAuth, getUserStatistics)


export default router;