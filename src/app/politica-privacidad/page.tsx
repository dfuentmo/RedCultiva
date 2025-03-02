"use client";
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
            <h2 className="text-2xl font-semibold mb-4 text-olive-800 relative">
              <span className="relative z-10">1. Datos que recopilamos</span>
              <span className="absolute w-12 h-0.5 bg-olive-400 bottom-0 left-0 -mb-1"></span>
            </h2>
            <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30">
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
            <h2 className="text-2xl font-semibold mb-4 text-olive-800 relative">
              <span className="relative z-10">2. Uso de la información</span>
              <span className="absolute w-12 h-0.5 bg-olive-400 bottom-0 left-0 -mb-1"></span>
            </h2>
            <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30">
              <p>
                Utilizamos los datos recopilados para personalizar tu experiencia, autenticar tu identidad, facilitar la gestión del banco de semillas y mejorar nuestros servicios.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800 relative">
              <span className="relative z-10">3. Cookies</span>
              <span className="absolute w-12 h-0.5 bg-olive-400 bottom-0 left-0 -mb-1"></span>
            </h2>
            <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30">
              <p className="mb-3">
                RedCultiva utiliza cookies para mantener tu sesión iniciada y recopilar estadísticas sobre el uso del sitio. Puedes gestionar o eliminar las cookies desde la configuración de tu navegador.
              </p>
              <p>
                Las cookies que utilizamos son:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-olive-700">Cookies de sesión:</strong> Para mantener tu sesión activa mientras navegas por el sitio.</li>
                <li><strong className="text-olive-700">Cookies de análisis:</strong> Para entender cómo utilizas nuestro sitio y mejorar tu experiencia.</li>
                <li><strong className="text-olive-700">Cookies de autenticación:</strong> Para recordar tu inicio de sesión con Discord.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800 relative">
              <span className="relative z-10">4. Login con Discord</span>
              <span className="absolute w-12 h-0.5 bg-olive-400 bottom-0 left-0 -mb-1"></span>
            </h2>
            <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30">
              <p>
                Cuando te conectas a través de Discord, utilizamos el servicio de autenticación OAuth2. No almacenamos tu contraseña ni tenemos acceso a mensajes privados.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800 relative">
              <span className="relative z-10">5. Compartición de datos</span>
              <span className="absolute w-12 h-0.5 bg-olive-400 bottom-0 left-0 -mb-1"></span>
            </h2>
            <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30">
              <p>
                No compartimos ni vendemos tu información a terceros, excepto cuando es requerido por ley o para proteger nuestros derechos.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800 relative">
              <span className="relative z-10">6. Seguridad de la información</span>
              <span className="absolute w-12 h-0.5 bg-olive-400 bottom-0 left-0 -mb-1"></span>
            </h2>
            <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30">
              <p>
                Adoptamos medidas razonables para proteger tus datos personales contra acceso no autorizado, pérdida o modificación.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800 relative">
              <span className="relative z-10">7. Derechos del usuario</span>
              <span className="absolute w-12 h-0.5 bg-olive-400 bottom-0 left-0 -mb-1"></span>
            </h2>
            <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30">
              <p>
                Tienes derecho a acceder, rectificar o eliminar tus datos personales. Puedes ejercer estos derechos enviándonos un correo electrónico.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-olive-800 relative">
              <span className="relative z-10">8. Contacto</span>
              <span className="absolute w-12 h-0.5 bg-olive-400 bottom-0 left-0 -mb-1"></span>
            </h2>
            <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30">
              <p>
                Si tienes preguntas sobre esta política, puedes contactarnos en <a href="mailto:info@ecohuertosalduie.com" className="text-olive-600 hover:text-olive-800 transition-colors hover:underline">info@ecohuertosalduie.com</a>.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-olive-200">
          <p className="text-center text-olive-600 text-sm">
            Última actualización: Marzo 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
