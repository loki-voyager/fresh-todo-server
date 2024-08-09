import express from "express";
import { check } from "express-validator";
import { AdminDeleteUserToDo } from "./api/admin/AdminDeleteUserToDo";
import { AdminDeleteUserToDoCompleted } from "./api/admin/AdminDeleteUserToDoCompleted";
import { AdminDeleteUserToDoDeleted } from "./api/admin/AdminDeleteUserToDoDeleted";
import { AdminGetOneUser } from "./api/admin/AdminGetOneUser";
import { AdminGetUsers } from "./api/admin/AdminGetUsers";
import { AdminGetUserToDoCompleted } from "./api/admin/AdminGetUserToDoCompleted";
import { AdminGetUserToDoDeleted } from "./api/admin/AdminGetUserToDoDeleted";
import { AdminUserDelete } from "./api/admin/AdminUserDelete";
import { UserToDoGet } from "./api/admin/UserToDoGet";
import { OwnerGiveAdminRole } from "./api/owner/OwnerGiveAdminRole";
import { OwnerTakeTheAdminRole } from "./api/owner/OwnerTakeTheAdminRole";
import { SignIn } from "./api/sign/SignIn";
import { SignUp } from "./api/sign/SignUp";
import { ToDoComplete } from "./api/todo/ToDoComplete";
import { ToDoCompletedGet } from "./api/todo/ToDoCompletedGet";
import { ToDoCompletedReturn } from "./api/todo/ToDoCompletedReturn";
import { ToDoDelete } from "./api/todo/ToDoDelete";
import { ToDoDeletedGet } from "./api/todo/ToDoDeletedGet";
import { ToDoDeletedReturn } from "./api/todo/ToDoDeletedReturn";
import { ToDoDeleteFull } from "./api/todo/ToDoDeleteFull";
import { ToDoEdit } from "./api/todo/ToDoEdit";
import { ToDoGet } from "./api/todo/ToDoGet";
import { ToDoPost } from "./api/todo/ToDoPost";
import { UserChechExist } from "./api/user/UserChechExist";
import { UserCreatePasswordRecovery } from "./api/user/UserCreatePasswordRecovery";
import { UserCreateVerification } from "./api/user/UserCreateVerification";
import { UserDataComparison } from "./api/user/UserDataComparison";
import { UserDelete } from "./api/user/UserDelete";
import { UserEdit } from "./api/user/UserEdit";
import { UserPasswordRecovery } from "./api/user/UserPasswordRecovery";
import { UserPic } from "./api/user/UserPic";
import { UserVerification } from "./api/user/UserVerification";
import { AuthMW } from "./middleware/AuthMW";
import { RoleMW } from "./middleware/RoleMW";
import { ToDoDeleteCompleted } from "./api/todo/ToDoDeleteCompleted";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ "take cat": "ᓚ₍ ^. .^₎" });
});

//Authorized User
router.post(
  "/UserPic",
  [check("data", "Enter username or email to take user pic").notEmpty()],
  AuthMW,
  UserPic
);

router.delete(
  "/UserDelete",
  [check("data", "Enter username or email to take user pic").notEmpty()],
  AuthMW,
  UserDelete
);

router.post(
  "/UserEdit",
  [check("user", "Enter all user data to edit").notEmpty()],
  AuthMW,
  UserEdit
);

router.post("/UserDataComparison", AuthMW, UserDataComparison);

router.post(
  "/ToDoPost",
  [check("body", "Enter data to create todo").notEmpty()],
  AuthMW,
  ToDoPost
);

router.post(
  "/ToDoGet",
  [
    check("page", "Page must be greater than 0.").isLength({ min: 1 }),
    check("limit", "Limit must be greater than 0.")
      .isLength({ min: 1 })
      .notEmpty(),
  ],
  AuthMW,
  ToDoGet
);

router.post(
  "/ToDoEdit",
  [
    check("id", "Enter todo id to edit this todo").notEmpty(),
    check("body", "Enter data to edit this todo").notEmpty(),
  ],
  AuthMW,
  ToDoEdit
);

router.delete(
  "/ToDoDelete",
  [check("id", "Enter todo id to delete this todo").notEmpty()],
  AuthMW,
  ToDoDelete
);

router.delete(
  "/ToDoDeleteCompleted",
  [check("id", "Enter todo id to delete this todo").notEmpty()],
  AuthMW,
  ToDoDeleteCompleted
);

router.post(
  "/ToDoComplete",
  [check("id", "Enter todo id to complete this todo").notEmpty()],
  AuthMW,
  ToDoComplete
);

router.post(
  "/ToDoDeletedGet",
  [
    check("page", "Page must be greater than 0.").isLength({ min: 1 }),
    check("limit", "Limit must be greater than 0.")
      .isLength({ min: 1 })
      .notEmpty(),
  ],
  AuthMW,
  ToDoDeletedGet
);

router.post(
  "/ToDoCompletedGet",
  [
    check("page", "Page must be greater than 0.").isLength({ min: 1 }),
    check("limit", "Limit must be greater than 0.")
      .isLength({ min: 1 })
      .notEmpty(),
  ],
  AuthMW,
  ToDoCompletedGet
);

router.post(
  "/ToDoCompletedReturn",
  [check("id", "Enter todo id to return this todo from completed").notEmpty()],
  AuthMW,
  ToDoCompletedReturn
);

router.delete(
  "/ToDoDeleteFull",
  [check("id", "Enter todo id to delete this todo full").notEmpty()],
  AuthMW,
  ToDoDeleteFull
);

router.post(
  "/ToDoDeletedReturn",
  [check("id", "Enter todo id to return this todo from deleted").notEmpty()],
  AuthMW,
  ToDoDeletedReturn
);

//Admin & Owner route
router.post(
  "/AdminGetUsers",
  [
    check("page", "Page must be greater than 0.").isLength({ min: 1 }),
    check("limit", "Limit must be greater than 0.")
      .isLength({ min: 1 })
      .notEmpty(),
  ],
  RoleMW(["admin", "owner"]),
  AdminGetUsers
);

router.delete(
  "/AdminUserDelete",
  [check("id", "Enter id to delete user").notEmpty()],
  RoleMW(["admin", "owner"]),
  AdminUserDelete
);

router.post(
  "/AdminGetOneUser",
  [check("id", "Enter id to get one user").notEmpty()],
  RoleMW(["admin", "owner"]),
  AdminGetOneUser
);

router.post(
  "/UserToDoGet",
  [
    check("userId", "Enter user id to take todos").notEmpty(),
    check("page", "Page must be greater than 0.").isLength({ min: 1 }),
    check("limit", "Limit must be greater than 0.")
      .isLength({ min: 1 })
      .notEmpty(),
  ],
  RoleMW(["admin", "owner"]),
  UserToDoGet
);

router.delete(
  "/AdminDeleteUserToDo",
  [check("id", "Enter id to delete user todo").notEmpty()],
  RoleMW(["admin", "owner"]),
  AdminDeleteUserToDo
);

router.post(
  "/AdminGetUserToDoCompleted",
  [
    check("userId", "Enter user id to take completed todos").notEmpty(),
    check("page", "Page must be greater than 0.").isLength({ min: 1 }),
    check("limit", "Limit must be greater than 0.")
      .isLength({ min: 1 })
      .notEmpty(),
  ],
  RoleMW(["admin", "owner"]),
  AdminGetUserToDoCompleted
);

router.delete(
  "/AdminDeleteUserToDoCompleted",
  [check("id", "Enter id to delete user completed todo").notEmpty()],
  RoleMW(["admin", "owner"]),
  AdminDeleteUserToDoCompleted
);

router.post(
  "/AdminGetUserToDoDeleted",
  [
    check("userId", "Enter user id to take deleted todos").notEmpty(),
    check("page", "Page must be greater than 0.").isLength({ min: 1 }),
    check("limit", "Limit must be greater than 0.")
      .isLength({ min: 1 })
      .notEmpty(),
  ],
  RoleMW(["admin", "owner"]),
  AdminGetUserToDoDeleted
);

router.delete(
  "/AdminDeleteUserToDoDeleted",
  [check("id", "Enter id to delete user deleted todo").notEmpty()],
  RoleMW(["admin", "owner"]),
  AdminDeleteUserToDoDeleted
);

//Owner
router.post(
  "/OwnerGiveAdminRole",
  [check("username", "Enter username to give admin role").notEmpty()],
  RoleMW(["owner"]),
  OwnerGiveAdminRole
);

router.post(
  "/OwnerTakeTheAdminRole",
  [check("username", "Enter username to take admin role").notEmpty()],
  RoleMW(["owner"]),
  OwnerTakeTheAdminRole
);

//Candidate for registration routes
router.post(
  "/SignUp",
  [
    check("username", "Username cannot be empty ").notEmpty(),
    check("email", "Email cannot be empty ").notEmpty(),
    check("password", "Password must be > 6").isLength({ min: 6 }),
  ],
  RoleMW(["candidateForRegistration"]),
  SignUp
);

//Candidate for verification routes
router.post(
  "/UserVerification",
  [
    check("username", "Username cannot be empty ").notEmpty(),
    check("email", "Email cannot be empty ").notEmpty(),
    check("code", "Code cannot be empty ").notEmpty(),
  ],
  RoleMW(["candidateForVerification"]),
  UserVerification
);

//Candidate for password recovery routes
router.post(
  "/UserPasswordRecovery",
  [
    check("code", "Code cannot be empty ").notEmpty(),
    check("email", "Email cannot be empty ").notEmpty(),
    check("password", "Password must be > 6").isLength({ min: 6 }),
  ],
  RoleMW(["candidateForPasswordRecovery"]),
  UserPasswordRecovery
);

//Free route
router.post(
  "/SignIn",
  [
    check("data", "Username cannot be empty :<").notEmpty(),
    check("password", "Password must be > 6").isLength({ min: 6 }),
  ],
  SignIn
);

router.post(
  "/UserChechExist",
  [
    check("username", "Username cannot be empty ").notEmpty(),
    check("email", "Email cannot be empty ").notEmpty(),
  ],
  UserChechExist
);

router.post(
  "/UserCreateVerification",
  [
    check("username", "Username cannot be empty ").notEmpty(),
    check("email", "Email cannot be empty ").notEmpty(),
  ],
  UserCreateVerification
);

router.post(
  "/UserCreatePasswordRecovery",
  [check("email", "Email cannot be empty ").notEmpty()],
  UserCreatePasswordRecovery
);

export { router };
