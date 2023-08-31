import { User } from "@/models";
import { CommonService } from "@/types";

type Service = CommonService<User>;

const create: Service["create"] = async (payload) => {
  return {} as User;
};

const delete_: Service["delete"] = async () => {
  return {} as User;
};

const update: Service["update"] = async () => {
  return {} as User;
};

const get: Service["get"] = async () => {
  return {} as User;
};

const getUserByField = async (
  field: keyof User,
  value: string | number | boolean
) => {
  return {} as User;
};

const UsersService = Object.freeze({
  create,
  delete: delete_,
  update,
  get,
  getUserByField,
} as const);
export default UsersService;
