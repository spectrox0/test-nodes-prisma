import type { User as UserPrisma } from "@prisma/client";
export interface User extends UserPrisma {
  status: 1 | 0;
}
