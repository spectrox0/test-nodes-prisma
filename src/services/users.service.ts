import { CommonService } from "@/types";
import { prisma } from "config";
import { Menu, User } from "models";
// Get the type of the service from the CommonService interface and the User model
type Service = CommonService<User>;

const create: Service["create"] = async ({
  email,
  lastname,
  name,
  password,
  username,
}) => {
  // Create User in DB with ORM Prisma
  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      lastname,
      name,
      password,
      username: username.toLowerCase().trim(),
      status: 1,
    },
  });

  return user as User;
};

const delete_: Service["delete"] = async id => {
  // Making an logic delete of a user in DB with ORM Prisma
  const user = await prisma.user.update({
    where: { id, status: 1 },
    data: { status: 0 },
  });
  return user as User;
};

const update: Service["update"] = async (id, payload) => {
  const user = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return user as User;
};

const get: Service["get"] = async (id, status = 1) => {
  //Get the user by id in DB with ORM Prisma
  const user = await prisma.user.findUnique({
    where: { id, status },
    select: {
      id: true,
      name: true,
      lastname: true,
      username: true,
      email: true,
    },
  });
  return user as User;
};

const getUserByField = async <T extends keyof User>(
  field: T,
  value: User[T]
) => {
  //Get the user by field and his value in DB with ORM Prisma
  const user = await prisma.user.findUnique({
    // @ts-ignore
    where: { [field]: value },
  });
  return user;
};

const getUserByEmailOrUsername = async ({
  email,
  username,
}: {
  email?: string;
  username?: string;
}) => {
  // Get the user by email or username in DB with ORM Prisma
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        email ? { email: email.toLowerCase?.() } : {},
        username ? { username: username.toLowerCase?.() } : {},
      ],
    },
  });
  return user as User;
};

// Not pagination yet and not filtering
const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: { status: 1 },
    select: {
      id: true,
      name: true,
      lastname: true,
      username: true,
      email: true,
    },
  });
  return users as User[];
};

const getAllUsersWithFilter = async (filter: string) => {
  //Get all users with filter in DB with ORM Prisma , filter by name, lastname, username and email and sorted by username
  const users = await prisma.user.findMany({
    where: {
      status: 1,
      OR: [
        { name: { contains: filter } },
        { lastname: { contains: filter } },
        { username: { contains: filter } },
        { email: { contains: filter } },
      ],
    },
    select: {
      id: true,
      name: true,
      lastname: true,
      username: true,
      email: true,
    },
    //Sort by username
    orderBy: { username: "asc" },
  });
  return users as User[];
};

const getAllMenusByUserId = async (id: number) => {
  //Get all menus by user id in DB with ORM Prisma
  const menus = await prisma.user
    .findUnique({ where: { id }, select: { menusToUser: true } })
    .menusToUser();
  if (!menus) throw new Error("Menus not found");
  //Get all menus with the ids of the menusToUser
  const menusToUser = await prisma.menu.findMany({
    where: { id: { in: menus.map(menu => menu.menuId) } },
  });
  return menusToUser as Menu[];
};

const associateMenusToUser = async (id: number, menus: number[]) => {
  // Associate menus to user in DB with ORM Prisma
  const menusToUser = await prisma.user
    .update({
      where: { id },
      data: {
        menusToUser: {
          create: menus.map(menu => ({ menuId: menu })),
        },
      },
    })
    .menusToUser();
  return menusToUser;
};

//Singleton pattern to export the service object
const UsersService = Object.freeze({
  create,
  delete: delete_,
  update,
  get,
  getUserByField,
  getUserByEmailOrUsername,
  getAllUsers,
  getAllMenusByUserId,
  associateMenusToUser,
  getAllUsersWithFilter,
} as const);
export default UsersService;
