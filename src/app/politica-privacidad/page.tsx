import React from 'react';

const PoliticaPrivacidad: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50 to-olive-100 text-olive-900 py-16">
      <div className="max-w-4xl mx-auto px-6 bg-olive-100 bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg border border-olive-200/30 p-8">
        <h1 className="text-4xl font-bold mb-8 text-center relative">
          <span className="relative z-10">Política de Privacidad y Cookies</span>
          <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
        </h1>

        <p className="mb-6 text-lg">
          Bienvenido a <strong className="text-olive-800">RedCultiva</strong>. La protección de tus datos es importante para nosotros. Esta política explica qué información recopilamos y cómo la utilizamos.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800">1. Datos que recopilamos</h2>
            <div className="bg-white bg-opacity-50 rounded-xl p-5 shadow-sm">
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-olive-700">Datos de usuario de Discord:</strong> cuando te conectas usando Discord, accedemos a tu nombre de usuario, avatar y número de identificación. No accedemos a tus mensajes privados ni a otros datos personales.
                </li>
                <li>
                  <strong className="text-olive-700">Interacción en la web:</strong> información sobre las páginas que visitas y las acciones que realizas.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800">2. Uso de la información</h2>
            <div className="bg-white bg-opacity-50 rounded-xl p-5 shadow-sm">
              <p>
                Utilizamos los datos recopilados para personalizar tu experiencia, autenticar tu identidad, facilitar la gestión del banco de semillas y mejorar nuestros servicios.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800">3. Cookies</h2>
            <div className="bg-white bg-opacity-50 rounded-xl p-5 shadow-sm">
              <p>
                RedCultiva utiliza cookies para mantener tu sesión iniciada y recopilar estadísticas sobre el uso del sitio. Puedes gestionar o eliminar las cookies desde la configuración de tu navegador.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800">4. Login con Discord</h2>
            <div className="bg-white bg-opacity-50 rounded-xl p-5 shadow-sm">
              <p>
                Cuando te conectas a través de Discord, utilizamos el servicio de autenticación OAuth2. No almacenamos tu contraseña ni tenemos acceso a mensajes privados.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800">5. Compartición de datos</h2>
            <div className="bg-white bg-opacity-50 rounded-xl p-5 shadow-sm">
              <p>
                No compartimos ni vendemos tu información a terceros, excepto cuando es requerido por ley o para proteger nuestros derechos.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800">6. Seguridad de la información</h2>
            <div className="bg-white bg-opacity-50 rounded-xl p-5 shadow-sm">
              <p>
                Adoptamos medidas razonables para proteger tus datos personales contra acceso no autorizado, pérdida o modificación.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800">7. Derechos del usuario</h2>
            <div className="bg-white bg-opacity-50 rounded-xl p-5 shadow-sm">
              <p>
                Tienes derecho a acceder, rectificar o eliminar tus datos personales. Puedes ejercer estos derechos enviándonos un correo electrónico.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800">8. Contacto</h2>
            <div className="bg-white bg-opacity-50 rounded-xl p-5 shadow-sm">
              <p>
                Si tienes preguntas sobre esta política, puedes contactarnos en <a href="mailto:info@ecohuertosalduie.com" className="text-olive-600 hover:text-olive-800 transition-colors hover:underline">info@ecohuertosalduie.com</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
