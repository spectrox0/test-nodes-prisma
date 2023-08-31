//Routes express.js to menu controller
import UsersController from "@/controllers/users.controller";
import { Router } from "express";

const baseRoute = "menus";
const router = Router();

//Routes express.js to menu controller
router.get(`${baseRoute}/:id`, UsersController.getUser);
router.get(`${baseRoute}/`, UsersController.getAllUsers);
router.post(`${baseRoute}/`, UsersController.createUser);
router.delete(`${baseRoute}/:id`, UsersController.deleteUser);
router.put(`${baseRoute}/:id`, UsersController.updateUser);

export default router;
