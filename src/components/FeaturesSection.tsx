import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-olive-50 to-olive-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
          <span className="relative z-10">El Viaje de las Semillas</span>
          <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
        </h2>
        <p className="text-xl text-olive-700 text-center max-w-3xl mx-auto mb-16">
          Descubre cómo RedCultiva está tejiendo una red global de guardianes de semillas, preservando la sabiduría ancestral y cultivando un futuro más resiliente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon="🌱"
            title="Preservación Consciente"
            description="Cada semilla que guardas es un tesoro genético que conecta nuestro pasado con las generaciones futuras. Sé parte de este legado vivo."
            titleColor="text-olive-900"
            descriptionColor="text-olive-700"
            backgroundColor="bg-olive-100/60"
            iconColor="text-olive-700"
          />
          <FeatureCard
            icon="🔄"
            title="Intercambio Regenerativo"
            description="Transforma la manera en que compartimos recursos. Cada intercambio fortalece nuestra comunidad y amplía la diversidad de nuestros cultivos."
            titleColor="text-olive-900"
            descriptionColor="text-olive-700"
            backgroundColor="bg-olive-100/60"
            iconColor="text-olive-700"
          />
          <FeatureCard
            icon="🌍"
            title="Impacto Global, Raíces Locales"
            description="Actúa localmente mientras participas en un movimiento global. Tu jardín es parte de una red que está cambiando el mundo, una semilla a la vez."
            titleColor="text-olive-900"
            descriptionColor="text-olive-700"
            backgroundColor="bg-olive-100/60"
            iconColor="text-olive-700"
          />
          <FeatureCard
            icon="🧠"
            title="Sabiduría Colectiva"
            description="Comparte conocimientos ancestrales y técnicas innovadoras. Juntos, estamos creando un repositorio vivo de sabiduría agrícola."
            titleColor="text-olive-900"
            descriptionColor="text-olive-700"
            backgroundColor="bg-olive-100/60"
            iconColor="text-olive-700"
          />
        </div>
      </div>
    </section>
  );
}
