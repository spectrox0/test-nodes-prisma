import AuthenticationController from "@/controllers/authentication.controller";
import { Router } from "express";

export const router = Router();

//Routes express.js to menu controller
router.post("/login", AuthenticationController.login);
