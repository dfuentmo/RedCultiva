import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      id: string;  // Agregar ID de usuario
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    accessToken?: string;
    id: string;  // Agregar ID de usuario en el token
  }
}
