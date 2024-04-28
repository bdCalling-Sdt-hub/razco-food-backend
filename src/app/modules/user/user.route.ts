import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import fileHandler from "../../middlewares/fileHandler";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
const router = express.Router();

//user account create and verify
router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/verify-email",
  validateRequest(UserValidation.createVerifyEmailZodSchema),
  UserController.verifyEmail
);

//admin account create and delete here
router.post(
  "/create-admin",
  auth(USER_TYPE.SUPER_ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createAdmin
);

router.delete(
  "/delete-admin/:id",
  auth(USER_TYPE.SUPER_ADMIN),
  UserController.deleteAdmin
);

router.get(
  "/all-admin",
  auth(USER_TYPE.SUPER_ADMIN),
  UserController.getAllAdmin
);

//get all user and active, deActive user
router.get(
  "/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  UserController.getSingleUser
);

router.get(
  "/",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  UserController.getAllUsers
);

router.patch(
  "/active-deactive/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  UserController.activeDeactiveUser
);

//get profile,update and delete
router.get(
  "/profile",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  UserController.getProfile
);

router.patch(
  "/profile-update",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  UserController.updateProfile
);

router.delete(
  "/account-delete",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  validateRequest(UserValidation.deleteAccountZodSchema),
  UserController.deleteAccount
);

//my points
router.get(
  "/my-points",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  UserController.getMyPoints
);

export const UserRoutes = router;
