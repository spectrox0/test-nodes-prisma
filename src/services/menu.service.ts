import { Menu } from "@/models";
import { CommonService } from "@/types";
import { prisma } from "config";

type Service = CommonService<Menu>;
const create: Service["create"] = async payload => {
  //Create Menu in database with Prisma ORM
  const menu = await prisma.menu.create({
    data: Object.assign(payload, { status: 1 }),
  });
  return menu as Menu;
};

const delete_: Service["delete"] = async id => {
  const menu = await prisma.menu.update({
    where: { id },
    data: { status: 0 },
  });
  return menu as Menu;
};

const update: Service["update"] = async (id, payload) => {
  const menu = await prisma.menu.update({
    where: { id },
    data: payload,
  });
  return menu as Menu;
};

const get: Service["get"] = async (id, status = 1) => {
  const menu = await prisma.menu.findUnique({ where: { id, status } });
  return menu as Menu;
};

const getAll: Service["getAll"] = async (status = 1) => {
  const menus = await prisma.menu.findMany({ where: { status } });
  return menus as Menu[];
};

export const getMenuByName = async (name: string) => {
  const menu = await prisma.menu.findUnique({ where: { name } });
  return menu as Menu;
};

//Singleton pattern
const MenuService = Object.freeze({
  create,
  delete: delete_,
  update,
  get,
  getAll,
  getMenuByName,
});

export default MenuService;
