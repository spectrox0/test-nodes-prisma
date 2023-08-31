import { Menu } from "@/models";
import { CommonService } from "@/types";
import { prisma } from "config";

type Service = CommonService<Menu>;
const create: Service["create"] = async payload => {
  //Create Menu in database with Prisma ORM
  const menu = await prisma.menu.create({
    data: Object.assign(payload, { status: 1 }),
  });
  if (!menu) throw new Error("Error while creating menu");
  return menu as Menu;
};

const delete_: Service["delete"] = async id => {
  const menu = await prisma.menu.update({
    where: { id },
    data: { status: 0 },
  });
  if (!menu) throw new Error("Error while deleting menu");
  return menu as Menu;
};

const update: Service["update"] = async (id, payload) => {
  const menu = await prisma.menu.update({
    where: { id },
    data: payload,
  });
  if (!menu) throw new Error("Error while updating menu");
  return menu as Menu;
};

const get: Service["get"] = async (id, status = 1) => {
  const menu = await prisma.menu.findUnique({ where: { id, status } });
  if (!menu) throw new Error("Menu not found");
  return menu as Menu;
};

const getAll: Service["getAll"] = async () => {
  const menus = await prisma.menu.findMany({ where: { status: 1 } });
  if (!menus) throw new Error("Error while getting menus");
  return menus as Menu[];
};

//Singleton pattern
const MenuService = Object.freeze({
  create,
  delete: delete_,
  update,
  get,
  getAll,
});

export default MenuService;
