import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative">
      <section
        className="relative bg-cover bg-center text-white py-32"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/12407449/pexels-photo-12407449.jpeg)',
        }}
      >
        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-olive-900/90 to-olive-800/90 p-8 rounded-xl shadow-xl border border-olive-700/50 backdrop-blur-sm">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-olive-300">RedCultiva:</span> <span className="text-olive-200">Red Global de Semillas Tradicionales</span>
            </h1>
            <p className="text-xl mb-4 text-olive-100">
              Preservamos la biodiversidad agrícola conectando guardianes de semillas ancestrales y promoviendo la soberanía alimentaria sostenible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
