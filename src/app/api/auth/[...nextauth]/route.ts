import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { authOptions } from "../../../lib/auth"; 
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
