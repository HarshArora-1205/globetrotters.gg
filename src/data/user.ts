import { prisma } from "@/lib/db";
import { User } from "@prisma/client";


export const getUserByEmail = async (email: string) : Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string | undefined): Promise<User | null> => {
  if(!id)   return null;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};