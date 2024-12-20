import { prisma } from "@/lib/db";
import { Account } from "@prisma/client";

export const getAccountByUserId = async (userId: string): Promise<Account | null> => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};
