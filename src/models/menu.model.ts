import { User } from "./user.model";

export type Menu = {
  id: number;
  name: string;
  parentId?: number | null;
  status: 0 | 1;
  parent?: Menu | null;
  children: Menu[];
};

export type MenusToUser = {
  menuId: number;
  userId: number;
  menu: Menu;
  user: User;
};
