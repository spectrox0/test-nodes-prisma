import type { User } from "./user.model";
import type {
  Menu as MenuPrisma,
  MenusToUser as MenusToUserPrisma,
} from "@prisma/client";

export interface Menu extends MenuPrisma {
  status: 0 | 1;
}

export type MenustoUser = MenusToUserPrisma;
