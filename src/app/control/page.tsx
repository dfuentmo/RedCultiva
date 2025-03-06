import Link from "next/link";

interface StatCardProps {
  title: string;
  color: string;
  href: string;
  subtitle: string;
}

function StatCard({ title, color, href, subtitle }: StatCardProps) {
  return (
    <Link href={href} passHref>
      <div className="bg-olive-50 bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-olive-200 relative overflow-hidden group cursor-pointer">
        {/* Fondo con gradiente */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        ></div>

        <h2 className="text-2xl font-semibold text-olive-800 mb-3">{title}</h2>

        {/* Subtítulo explicativo */}
        <p className="text-sm text-olive-600 mb-3">{subtitle}</p>

        {/* Línea decorativa */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-olive-300 to-transparent mt-6 opacity-30"></div>
      </div>
    </Link>
  );
}

export default function ControlDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50 to-olive-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
          <span className="relative z-10">Panel de Control</span>
          <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
        </h1>

        <p className="text-xl text-olive-700 text-center max-w-3xl mx-auto mb-12">
          Bienvenido al panel de administración de RedCultiva. Gestiona semillas y usuarios desde aquí.
        </p>

        {/* Tarjetas de gestión */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Gestionar Semillas"
            subtitle="Añade, edita o elimina semillas del banco."
            color="from-green-400 to-green-600"
            href="/control/semillas"
          />
          <StatCard
            title="Gestionar Usuarios"
            subtitle="Administra los usuarios registrados en la plataforma."
            color="from-green-400 to-green-600"
            href="/control/usuarios"
          />
          <StatCard
            title="Configuración General"
            subtitle="Ajusta las preferencias globales del sistema."
            color="from-green-400 to-green-600"
            href="/control/configuracion"
          />
        </div>
      </div>
    </div>
  );
}
