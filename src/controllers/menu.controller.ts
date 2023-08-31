import MenuService from "@/services/menu.service";
import type { RequestHandler } from "express";

const getMenu: RequestHandler = async (req, res) => {
  const { id: id_ } = req.params;
  const id = Number(id_);
  if (isNaN(id)) return res.status(400).send({ message: "Id is not valid" });

  //get menu from database
  try {
    const menu = await MenuService.get(id);
    if (!menu)
      return res.status(404).send({
        message: "Menu not found",
      });
    return res.status(200).send(menu);
  } catch (error) {
    return res.status(500).send({
      message: "Error while getting menu",
    });
  }
};

const getAllMenus: RequestHandler = async (req, res) => {
  try {
    const menus = await MenuService.getAll();
    res.status(200).send(menus);
  } catch (error) {
    return res.status(500).send({
      message: "Error while getting menus",
    });
  }
};

const createMenu: RequestHandler = async (req, res) => {};

const deleteMenu: RequestHandler = async (req, res) => {};

const updateMenu: RequestHandler = async (req, res) => {};

const MenuController = Object.freeze({
  getMenu,
  getAllMenus,
  createMenu,
  deleteMenu,
  updateMenu,
} as const satisfies Record<string, RequestHandler>);

export default MenuController;
