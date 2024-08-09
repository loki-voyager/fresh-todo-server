import mongoose from "mongoose";
import { start, stop } from "../src/app";
import { takeToken } from "./function/takeToken";
import { userPicTest } from "./authorizedUserRoute/userPicTest";
import { userEditTest } from "./authorizedUserRoute/userEditTest";
import { userDataComparisonTest } from "./authorizedUserRoute/userDataComparisonTest";
import { toDoPostTest } from "./authorizedUserRoute/toDoPostTest";
import { toDoGetTest } from "./authorizedUserRoute/toDoGetTest";
import { toDoEditTest } from "./authorizedUserRoute/toDoEditTest";
import { toDoDeleteTest } from "./authorizedUserRoute/toDoDeleteTest";
import { toDoCompleteTest } from "./authorizedUserRoute/toDoCompleteTest";
import { toDoDeletedGetTest } from "./authorizedUserRoute/toDoDeletedGetTest";
import { toDoCompletedGetTest } from "./authorizedUserRoute/toDoCompletedGetTest";
import { toDoCompletedReturnTest } from "./authorizedUserRoute/toDoCompletedReturnTest";
import { toDoDeletedReturnTest } from "./authorizedUserRoute/toDoDeletedReturnTest";
import { toDoDeleteFullTest } from "./authorizedUserRoute/toDoDeleteFullTest";
import { adminGetUsersTest } from "./adminRoute/adminGetUsersTest";
import {
  ToDoTypes,
  ToDoCompletedTypes,
  ToDoDeletedTypes,
} from "./types/todoTypes";
import { UserType } from "./types/usersTypes";
import { adminGetOneUserTest } from "./adminRoute/adminGetOneUserTest";
import { userToDoGetTest } from "./adminRoute/userToDoGetTest";
import { adminDeleteUserTodoTest } from "./adminRoute/adminDeleteUserTodoTest";
import { adminGetUserToDoCompletedTest } from "./adminRoute/adminGetUserToDoCompletedTest";
import { adminDeleteUserToDoCompletedTest } from "./adminRoute/adminDeleteUserToDoCompletedTest";
import { adminGetUserToDoDeletedTest } from "./adminRoute/adminGetUserToDoDeletedTest";
import { adminDeleteUserToDoDeletedTest } from "./adminRoute/adminDeleteUserToDoDeletedTest";
import { toDoDeleteCompletedTest } from "./authorizedUserRoute/toDoDeleteCompletedTest";
import { ownerGiveAdminRoleTest } from "./ownerRoute/ownerGiveAdminRoleTest";
import { ownerTakeAdminRoleTest } from "./ownerRoute/ownerTakeAdminRoleTest";
import { signInTest } from "./freeRoute/signInTest";
import { userChechExistTestTrue } from "./freeRoute/userChechExistTestTrue";
import { userCreateVerificationTest } from "./freeRoute/userCreateVerificationTest";
import { userCreatePasswordRecoveryTest } from "./freeRoute/userCreatePasswordRecoveryTest";
import { userChechExistTestFalse } from "./freeRoute/userChechExistTestFalse";

let userToken: string = "";
let adminToken: string = "";
let ownerToken: string = "";
let todos: ToDoTypes[];
let completedTodos: ToDoCompletedTypes[];
let deletedTodos: ToDoDeletedTypes[];
let users: UserType[];
let user: UserType;
let userToDos: ToDoTypes[];
let completedUserTodos: ToDoCompletedTypes[];
let deletedUserTodos: ToDoDeletedTypes[];

beforeAll(async () => {
  await start();
});

afterAll(async () => {
  await mongoose.connection.close();
  await stop();
});

test("Take user token", async () => {
  userToken = await takeToken({ username: "test" });
  console.log({ userToken });
  expect(userToken).not.toBe("");
});

test("post /UserPic to take pic of user", async () => {
  await userPicTest({ token: userToken });
});

test("post /UserEdit to take edit user from test to string and from string to test", async () => {
  await userEditTest({ token: userToken });
});

test("post /UserDataComparison to compare user data", async () => {
  await userDataComparisonTest({ token: userToken });
});

test("post /ToDoPost to post new todo", async () => {
  await toDoPostTest({ token: userToken });
});

test("post /ToDoGet to get 10 todos 1 page", async () => {
  todos = await toDoGetTest({ token: userToken });
});

test("post /ToDoEdit to edit 1 todo of test user", async () => {
  const randomIndex = Math.floor(Math.random() * todos.length);
  const id = todos[randomIndex]._id;
  await toDoEditTest({ token: userToken, id });
});

test("post /ToDoDelete to delete 1 todos of test user", async () => {
  let randomIndex = Math.floor(Math.random() * todos.length);
  await toDoDeleteTest({ token: userToken, id: todos[randomIndex]._id });
  todos.splice(randomIndex, 1);

  randomIndex = Math.floor(Math.random() * todos.length);
  await toDoDeleteTest({ token: userToken, id: todos[randomIndex]._id });
  todos.splice(randomIndex, 1);
});

test("post /ToDoComplete to complete 1 todo of test user", async () => {
  let randomIndex = Math.floor(Math.random() * todos.length);
  await toDoCompleteTest({ token: userToken, id: todos[randomIndex]._id });
  todos.splice(randomIndex, 1);

  randomIndex = Math.floor(Math.random() * todos.length);
  await toDoCompleteTest({ token: userToken, id: todos[randomIndex]._id });
  todos.splice(randomIndex, 1);

  randomIndex = Math.floor(Math.random() * todos.length);
  await toDoCompleteTest({ token: userToken, id: todos[randomIndex]._id });
  todos.splice(randomIndex, 1);
});

test("post /ToDoDeletedGet to get 10 deleted todos 1 page", async () => {
  deletedTodos = await toDoDeletedGetTest({ token: userToken });
});

test("post /ToDoCompletedGet to get 10 completed todos 1 page", async () => {
  completedTodos = await toDoCompletedGetTest({ token: userToken });
});

test("post /ToDoDeleteCompleted to delete 1 completed todos of test user", async () => {
  let randomIndex = Math.floor(Math.random() * completedTodos.length);

  await toDoDeleteCompletedTest({
    token: userToken,
    id: completedTodos[randomIndex]._id,
  });

  completedTodos.splice(randomIndex, 1);
});

test("post /ToDoCompletedReturn to return 1 todo other todos", async () => {
  const randomIndex = Math.floor(Math.random() * completedTodos.length);
  const id = completedTodos[randomIndex]._id;
  await toDoCompletedReturnTest({ token: userToken, id });
  completedTodos.splice(randomIndex, 1);
});

test("post /ToDoDeletedReturn to return 1 todo other todos", async () => {
  const randomIndex = Math.floor(Math.random() * deletedTodos.length);
  const id = deletedTodos[randomIndex]._id;
  await toDoDeletedReturnTest({ token: userToken, id });
  deletedTodos.splice(randomIndex, 1);
});

test("post /ToDoDeleteFull to delete 1 todo full from db", async () => {
  const randomIndex = Math.floor(Math.random() * deletedTodos.length);
  const id = deletedTodos[randomIndex]._id;
  await toDoDeleteFullTest({ token: userToken, id });
  deletedTodos.splice(randomIndex, 1);
});

test("Take admin token", async () => {
  adminToken = await takeToken({ username: "Manager" });
  console.log({ adminToken });
  expect(adminToken).not.toBe("");
});

test("post /AdminGetUsers to get 10 users 1 page", async () => {
  users = await adminGetUsersTest({ token: adminToken });
});

test("post /AdminGetOneUser to get 1 user", async () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  const id = users[randomIndex]._id;
  user = await adminGetOneUserTest({ token: adminToken, id });
});

test("post /UserToDoGet to get 1 user", async () => {
  const userToDoGet = users.find((user) => user.username === "test");
  if (userToDoGet) {
    const id = userToDoGet._id;
    userToDos = await userToDoGetTest({ token: adminToken, id });
  }
});

test("post /AdminDeleteUserToDo to delete user todo", async () => {
  const randomIndex = Math.floor(Math.random() * userToDos.length);
  const id = userToDos[randomIndex]._id;
  await adminDeleteUserTodoTest({ token: adminToken, id });
  userToDos.splice(randomIndex, 1);
});

test("post /AdminGetUserToDoCompleted to get completed user todos", async () => {
  const userToDoGet = users.find((user) => user.username === "test");
  if (userToDoGet) {
    completedUserTodos = await adminGetUserToDoCompletedTest({
      token: adminToken,
      id: userToDoGet._id,
    });
  }
});

test("post /AdminDeleteUserToDoCompleted to delete one completed user todo", async () => {
  const randomIndex = Math.floor(Math.random() * completedUserTodos.length);
  const id = completedUserTodos[randomIndex]._id;
  await adminDeleteUserToDoCompletedTest({ token: adminToken, id });
  completedUserTodos.splice(randomIndex, 1);
});

test("post /AdminGetUserToDoDeleted to get deleted user todos", async () => {
  const userToDoGet = users.find((user) => user.username === "test");
  if (userToDoGet) {
    const id = userToDoGet._id;
    deletedUserTodos = await adminGetUserToDoDeletedTest({
      token: adminToken,
      id,
    });
  }
});

test("post /AdminDeleteUserToDoDeleted to delete one deleted user todo", async () => {
  const randomIndex = Math.floor(Math.random() * deletedUserTodos.length);
  const id = deletedUserTodos[randomIndex]._id;
  await adminDeleteUserToDoDeletedTest({ token: adminToken, id });
  deletedUserTodos.splice(randomIndex, 1);
});

test("Take owner token", async () => {
  ownerToken = await takeToken({ username: "Owner" });
  console.log({ ownerToken });
  expect(ownerToken).not.toBe("");
});

test("post /OwnerGiveAdminRole to give admin role for 1 user", async () => {
  await ownerGiveAdminRoleTest({ token: ownerToken, username: "test" });
});

test("post /OwnerTakeTheAdminRole to give admin role for 1 user", async () => {
  await ownerTakeAdminRoleTest({ token: ownerToken, username: "test" });
});

test("post /SignIn to sign in app", async () => {
  await signInTest({ data: "test", password: "qweqwe" });
});

test("post /UserChechExist to true check user in db", async () => {
  await userChechExistTestTrue({ username: "test", email: "muvmaker@gmail.com" });
});

test("post /UserChechExist to false check user in db", async () => {
  await userChechExistTestFalse({ username: "freeUsername", email: "freeMail@mail.com" });
});

test("post /UserCreateVerification to create verification code for sign up i app", async () => {
  await userCreateVerificationTest({ username: "test", email: "muvmaker@gmail.com" });
});

test("post /UserCreatePasswordRecovery to create code for password recovery", async () => {
  await userCreatePasswordRecoveryTest({ email: "muvmaker@gmail.com" });
});