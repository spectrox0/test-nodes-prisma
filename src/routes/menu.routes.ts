//Routes express.js to menu controller
import MenuController from "@/controllers/menu.controller";
import { Router } from "express";
import { isAuthenticated } from "middlewares";

const baseRoute = "menus";
const router = Router();

//Routes express.js to menu controller
router.get(`${baseRoute}/:id`, isAuthenticated, MenuController.getMenu);
router.get(`${baseRoute}/`, isAuthenticated, MenuController.getAllMenus);
router.post(`${baseRoute}/`, isAuthenticated, MenuController.createMenu);
router.delete(`${baseRoute}/:id`, isAuthenticated, MenuController.deleteMenu);
router.put(`${baseRoute}/:id`, isAuthenticated, MenuController.updateMenu);

export default router;
