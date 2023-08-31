import MenuController from "@/controllers/menu.controller";
import { Router } from "express";

const baseRoute = "menus";
const router = Router();

//Routes express.js to menu controller
router.get(`${baseRoute}/:id`, MenuController.getMenu);
router.get(`${baseRoute}/`, MenuController.getAllMenus);
router.post(`${baseRoute}/`, MenuController.createMenu);
router.delete(`${baseRoute}/:id`, MenuController.deleteMenu);
router.put(`${baseRoute}/:id`, MenuController.updateMenu);

export default router;
