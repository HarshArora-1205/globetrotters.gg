import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";

import { prisma } from "@/lib/db";

import { getUserById } from "@/data/user";
import { getAccountByUserId } from "@/data/account";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;
      
      // TODO: extend user
      const existingUser = await getUserById(user.id);
      
      if(!existingUser?.emailVerified)  return false;

      // TODO: add 2FA check
      return true;
    },
    async jwt({token}) {
      if(!token.sub){
        return token;
      }

      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.availableCredits = existingUser.availableCredits;
      token.handle = existingUser.handle;
      // TODO: 2FA
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
    async session({ token, session }) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(token.role && session.user) {
        session.user.role = token.role;
      }

      if(session.user) {
        session.user.isOAuth = token.isOAuth;
        session.user.handle = token.handle;
        session.user.availableCredits = token.availableCredits
      }

      // TODO: 2FA
      // if(session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      // }

      return session;
    },
  }
});
