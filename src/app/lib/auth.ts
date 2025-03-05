import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { JWT } from "next-auth/jwt"; // Importar tipo JWT para tipado

if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
  throw new Error("Las variables de entorno DISCORD_CLIENT_ID o DISCORD_CLIENT_SECRET no están definidas.");
}

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string; // Agregar el ID de Discord aquí
}

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;  // Guardar el ID de Discord en el token
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }
      if (!session.user) {
        session.user = { name: null, email: null, image: null, id: "" }; // Inicializar session.user si es undefined
      }
      if (token.id) {
        session.user.id = token.id;  // Pasamos el ID de Discord a la sesión
      } else {
        session.user.id = "";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
