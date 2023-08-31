import { Menu } from "@/models";
import { CommonService } from "@/types";

type Service = CommonService<Menu>;
const create: Service["create"] = async () => {
  return {} as Menu;
};

const delete_: Service["delete"] = async () => {
  return {} as Menu;
};

const update: Service["update"] = async () => {
  return {} as Menu;
};

const get: Service["get"] = async () => {
  return {} as Menu;
};

const getAll: Service["getAll"] = async () => {
  return [] as Menu[];
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
