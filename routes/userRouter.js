import { Router } from "express";
import { handleValidateUserSignIn, validateUser, validateUserForAdmin, validateUserTrainerForAdmin } from "../middleware/userMiddleware.js";
import { createUser, createUserTrainer, deleteUser, getUserById, getUsers, getUsersCount, getUserStatistics, loginUser, updateUser, updateUserPassword, updateUserTrainer } from "../controller/userController.js";
import { handleAuth } from "../middleware/auth.js";
const router = Router()

router.route('/login').post(handleValidateUserSignIn, loginUser)
router.route("/register").post(validateUser, createUser);

//admin
router.route("/").post(validateUserForAdmin, handleAuth, createUser);
router.route("/trainer").post(validateUserTrainerForAdmin, handleAuth, createUserTrainer);
router.route("/").get(handleAuth, getUsers)
router.route("/:userId").get(handleAuth, getUserById)
router.route("/:userId").patch(handleAuth, validateUserForAdmin, updateUser)
router.route("/trainer/:userId").patch(handleAuth, validateUserTrainerForAdmin, updateUserTrainer)
router.route("/changepwd/:userId").patch(handleAuth, updateUserPassword)
router.route("/:userId").delete(handleAuth, deleteUser)
router.route("/dash/usercount").get(handleAuth, getUsersCount)
router.route("/dash/regusers").get(handleAuth, getUserStatistics)


export default router;