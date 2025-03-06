import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { notFound } from "next/navigation"; // Importar notFound()

export default async function ControlLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const adminIds = process.env.NEXT_PUBLIC_ADMIN_DISCORD_IDS?.split(",") || [];

  if (!session || !adminIds.includes(session.user.id)) {
    notFound(); // Mostrar la página 404 en lugar de redirigir
  }

  return (
    <div>
        {children}
    </div>
  );
}
