import { FeatureCard } from "./FeatureCard";
import Image from "next/image";

export function FeaturesSection() {
  return (
    <section className="pt-0 pb-20 bg-gradient-to-b from-olive-50 via-olive-100 to-olive-200 relative">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg"
          alt="Campo de trigo"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-10">
        <h2 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
          <span className="relative z-10">Guardianes de la Biodiversidad</span>
          <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
        </h2>
        
        {/* Imagen destacada bajo el título */}
        <div className="max-w-2xl mx-auto mb-12 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://images.pexels.com/photos/6231722/pexels-photo-6231722.jpeg"
            alt="Semillero comunitario"
            width={800}
            height={400}
            className="w-full h-auto"
          />
        </div>
        
        <p className="text-xl text-olive-700 text-center max-w-3xl mx-auto mb-16">
          Únete a nuestra comunidad de guardianes de semillas que protegen la diversidad agrícola, preservan variedades ancestrales y construyen un sistema alimentario más resiliente y soberano.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon="🌱"
            title="Custodios del Patrimonio"
            description="Como guardián de semillas, proteges un legado vivo que conecta generaciones pasadas con las futuras, preservando la riqueza genética de nuestros cultivos."
            titleColor="text-olive-900"
            descriptionColor="text-olive-700"
            backgroundColor="bg-olive-100/80"
            iconColor="text-olive-700"
            imageSrc="https://images.pexels.com/photos/7728079/pexels-photo-7728079.jpeg"
          />
          <FeatureCard
            icon="🔄"
            title="Red de Intercambio"
            description="Los guardianes comparten no solo semillas, sino también conocimientos y prácticas. Cada intercambio fortalece nuestra comunidad y amplía la diversidad cultivada."
            titleColor="text-olive-900"
            descriptionColor="text-olive-700"
            backgroundColor="bg-olive-100/80"
            iconColor="text-olive-700"
            imageSrc="https://images.pexels.com/photos/5529553/pexels-photo-5529553.jpeg"
          />
          <FeatureCard
            icon="🌍"
            title="Acción Local, Impacto Global"
            description="Como guardián, tu trabajo local tiene un impacto global. Cada semilla preservada contribuye a la resiliencia de nuestros sistemas alimentarios frente al cambio climático."
            titleColor="text-olive-900"
            descriptionColor="text-olive-700"
            backgroundColor="bg-olive-100/80"
            iconColor="text-olive-700"
            imageSrc="https://images.pexels.com/photos/4750254/pexels-photo-4750254.jpeg"
          />
          <FeatureCard
            icon="🧠"
            title="Sabiduría Ancestral"
            description="Los guardianes mantienen vivo el conocimiento tradicional sobre cultivos, adaptación y selección de semillas, combinándolo con prácticas innovadoras y sostenibles."
            titleColor="text-olive-900"
            descriptionColor="text-olive-700"
            backgroundColor="bg-olive-100/80"
            iconColor="text-olive-700"
            imageSrc="https://images.pexels.com/photos/5528994/pexels-photo-5528994.jpeg"
          />
        </div>
      </div>
    </section>
  );
}
