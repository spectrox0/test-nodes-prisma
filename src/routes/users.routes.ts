//Routes express.js to menu controller
import UsersController from "@/controllers/users.controller";
import { Router } from "express";

const baseRoute = "users";
export const router = Router();

//Routes express.js to menu controller
router.get("/:id", UsersController.getUser);
router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.createUser);

router.delete("/:id", UsersController.deleteUser);
router.put("/:id", UsersController.updateUser);
