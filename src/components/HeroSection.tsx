import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center text-white py-32"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/12407449/pexels-photo-12407449.jpeg)',
      }}
    >
      <div className="container mx-auto text-center px-6 bg-black bg-opacity-50 p-6 rounded">
        <h1 className="text-5xl font-bold mb-6">
          RedCultiva: <span className="text-green-300">Comparte y Cultiva Biodiversidad</span>
        </h1>
        <p className="text-xl mb-10">
          Únete a nuestra comunidad de intercambio de semillas y contribuye a preservar la biodiversidad.
        </p>
      </div>
    </section>
  );
}
