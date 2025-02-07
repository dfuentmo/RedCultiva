import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-olive-800 mb-12">¿Cómo funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            title="Conecta"
            description="Únete a nuestra comunidad de entusiastas de las semillas utilizando tu cuenta de Discord."
            titleColor="text-olive-800"
            descriptionColor="text-green-600"
            backgroundColor="bg-olive-200 bg-opacity-50"
            iconColor="text-green-600"
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 20.5c-2.5 0-2.5-16 0-16" />
                <path d="M7 12h18" />
                <path d="M7 5h10" />
                <path d="M7 28h10" />
              </svg>
            }
            title="Comparte"
            description="Añade tus semillas para intercambiar o encuentra semillas que quieras cultivar."
            titleColor="text-olive-800"
            descriptionColor="text-green-600"
            backgroundColor="bg-olive-200 bg-opacity-50"
            iconColor="text-green-600"
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.8 22 12 13.9 17.2 22" />
                <path d="m5 8.3 7-4.8 7 4.8" />
                <path d="M12 3v6" />
                <path d="m5 8.3-3 .3 2 5.3L12 22V13.9L5 8.3Z" />
                <path d="m19 8.3 3 .3-2 5.3L12 22V13.9l7-5.6Z" />
              </svg>
            }
            title="Cultiva"
            description="Cultiva tu jardín o huerto y contribuye a la biodiversidad."
            titleColor="text-olive-800"
            descriptionColor="text-green-600"
            backgroundColor="bg-olive-200 bg-opacity-50"
            iconColor="text-green-600"
          />
        </div>
      </div>
    </section>
  );
}
