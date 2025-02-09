import React from 'react';

const PoliticaPrivacidad: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark_moss_green-700 dark:bg-olive-800 text-olive-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad y Cookies</h1>

        <p className="mb-4">
          Bienvenido a <strong>RedCultiva</strong>. La protección de tus datos es importante para nosotros. Esta política explica qué información recopilamos y cómo la utilizamos.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Datos que recopilamos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Datos de usuario de Discord:</strong> cuando te conectas usando Discord, accedemos a tu nombre de usuario, avatar y número de identificación. No accedemos a tus mensajes privados ni a otros datos personales.
          </li>
          <li>
            <strong>Interacción en la web:</strong> información sobre las páginas que visitas y las acciones que realizas.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Uso de la información</h2>
        <p className="mb-4">
          Utilizamos los datos recopilados para personalizar tu experiencia, autenticar tu identidad, facilitar la gestión del banco de semillas y mejorar nuestros servicios.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies</h2>
        <p className="mb-4">
          RedCultiva utiliza cookies para mantener tu sesión iniciada y recopilar estadísticas sobre el uso del sitio. Puedes gestionar o eliminar las cookies desde la configuración de tu navegador.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Login con Discord</h2>
        <p className="mb-4">
          Cuando te conectas a través de Discord, utilizamos el servicio de autenticación OAuth2. No almacenamos tu contraseña ni tenemos acceso a mensajes privados.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Compartición de datos</h2>
        <p className="mb-4">
          No compartimos ni vendemos tu información a terceros, excepto cuando es requerido por ley o para proteger nuestros derechos.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Seguridad de la información</h2>
        <p className="mb-4">
          Adoptamos medidas razonables para proteger tus datos personales contra acceso no autorizado, pérdida o modificación.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Derechos del usuario</h2>
        <p className="mb-4">
          Tienes derecho a acceder, rectificar o eliminar tus datos personales. Puedes ejercer estos derechos enviándonos un correo electrónico.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contacto</h2>
        <p className="mb-4">
          Si tienes preguntas sobre esta política, puedes contactarnos en <a href="mailto:info@ecohuertosalduie.com" className="text-green-300 hover:underline">info@ecohuertosalduie.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
