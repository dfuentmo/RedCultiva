"use client";
import { Sprout, Leaf, Users, Shield, BookOpen, Scale } from "lucide-react";

export default function ComoFunciona() {
  return (
    <div className="min-h-screen bg-olive-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
          <span className="relative z-10">¿Cómo Funciona RedCultiva?</span>
          <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
        </h1>

        {/* Introducción */}
        <div className="max-w-3xl mx-auto mb-16 text-olive-900">
          <p className="text-xl mb-6">
            RedCultiva es un banco de semillas colaborativo que funciona gracias a la participación de guardianes de semillas de todo el mundo. Nuestro objetivo es preservar la biodiversidad agrícola y promover la soberanía alimentaria.
          </p>
          <p className="text-lg">
            A continuación te explicamos cómo funciona nuestro sistema, las reglas que lo rigen y cómo puedes participar de manera efectiva.
          </p>
        </div>

        {/* Secciones principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
          {/* Cómo funciona */}
          <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-olive-200/30">
            <div className="flex items-center mb-6">
              <div className="bg-olive-200 p-3 rounded-full mr-4">
                <BookOpen className="h-6 w-6 text-olive-800" />
              </div>
              <h2 className="text-2xl font-bold text-olive-900">Funcionamiento</h2>
            </div>
            <ul className="space-y-4 text-olive-800">
              <li className="flex items-start">
                <span className="bg-olive-200 text-olive-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                <p><strong>Registro de semillas:</strong> Los guardianes registran sus semillas en la plataforma, incluyendo información sobre variedad, origen y año de recolección.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-olive-200 text-olive-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                <p><strong>Catálogo público:</strong> Todas las semillas registradas aparecen en nuestro catálogo, visible para todos los usuarios.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-olive-200 text-olive-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                <p><strong>Solicitud de intercambio:</strong> Los usuarios pueden solicitar semillas a través de la plataforma, contactando directamente con el guardián.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-olive-200 text-olive-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
                <p><strong>Intercambio:</strong> El intercambio se realiza según los términos acordados entre las partes, siguiendo nuestras recomendaciones.</p>
              </li>
            </ul>
          </div>

          {/* Reglas y límites */}
          <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-olive-200/30">
            <div className="flex items-center mb-6">
              <div className="bg-olive-200 p-3 rounded-full mr-4">
                <Scale className="h-6 w-6 text-olive-800" />
              </div>
              <h2 className="text-2xl font-bold text-olive-900">Reglas y Límites</h2>
            </div>
            <ul className="space-y-4 text-olive-800">
              <li className="flex items-start">
                <span className="bg-olive-200 text-olive-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">•</span>
                <p><strong>Sin fines comerciales:</strong> RedCultiva es una plataforma para el intercambio sin ánimo de lucro. No está permitida la venta de semillas.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-olive-200 text-olive-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">•</span>
                <p><strong>Plantas prohibidas:</strong> No se pueden intercambiar semillas de plantas prohibidas en el país del emisor o el receptor. Es responsabilidad de los usuarios verificar las regulaciones locales.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-olive-200 text-olive-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">•</span>
                <p><strong>Reciprocidad:</strong> Se recomienda que los usuarios que soliciten semillas también aporten al banco cuando sea posible.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-olive-200 text-olive-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">•</span>
                <p><strong>Información veraz:</strong> La información proporcionada sobre las semillas debe ser precisa y honesta.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Principios */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-olive-900 mb-10 relative">
            <span className="relative z-10">Nuestros Principios</span>
            <span className="absolute w-16 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-3"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-olive-200/30 text-center">
              <div className="bg-olive-200 p-3 rounded-full inline-flex mb-4">
                <Sprout className="h-6 w-6 text-olive-800" />
              </div>
              <h3 className="text-xl font-semibold text-olive-900 mb-3">Biodiversidad</h3>
              <p className="text-olive-800">Preservamos la diversidad genética de cultivos tradicionales y locales para las futuras generaciones.</p>
            </div>
            <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-olive-200/30 text-center">
              <div className="bg-olive-200 p-3 rounded-full inline-flex mb-4">
                <Users className="h-6 w-6 text-olive-800" />
              </div>
              <h3 className="text-xl font-semibold text-olive-900 mb-3">Comunidad</h3>
              <p className="text-olive-800">Construimos una red global de guardianes comprometidos con la preservación de semillas tradicionales.</p>
            </div>
            <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-olive-200/30 text-center">
              <div className="bg-olive-200 p-3 rounded-full inline-flex mb-4">
                <Shield className="h-6 w-6 text-olive-800" />
              </div>
              <h3 className="text-xl font-semibold text-olive-900 mb-3">Soberanía</h3>
              <p className="text-olive-800">Promovemos la independencia alimentaria y el derecho a cultivar, guardar e intercambiar semillas libremente.</p>
            </div>
          </div>
        </div>

        {/* Preguntas frecuentes */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-olive-900 mb-10 relative">
            <span className="relative z-10">Preguntas Frecuentes</span>
            <span className="absolute w-16 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-3"></span>
          </h2>
          <div className="space-y-6">
            <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-olive-200/30">
              <h3 className="text-xl font-semibold text-olive-900 mb-2">¿Cómo puedo convertirme en guardián de semillas?</h3>
              <p className="text-olive-800">Para convertirte en guardián, simplemente regístrate en la plataforma y comienza a añadir tus semillas al catálogo. No hay requisitos mínimos, pero valoramos la calidad y precisión de la información.</p>
            </div>
            <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-olive-200/30">
              <h3 className="text-xl font-semibold text-olive-900 mb-2">¿Qué información debo proporcionar sobre mis semillas?</h3>
              <p className="text-olive-800">Es importante incluir el nombre de la variedad, año de recolección, lugar de origen, y cualquier observación relevante sobre su cultivo o características especiales.</p>
            </div>
            <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-olive-200/30">
              <h3 className="text-xl font-semibold text-olive-900 mb-2">¿Cómo se gestionan los gastos de envío?</h3>
              <p className="text-olive-800">Los gastos de envío son acordados entre las partes. Recomendamos utilizar sobres acolchados pequeños para minimizar costes y proteger las semillas durante el transporte.</p>
            </div>
            <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-olive-200/30">
              <h3 className="text-xl font-semibold text-olive-900 mb-2">¿Qué ocurre si tengo un problema con un intercambio?</h3>
              <p className="text-olive-800">Si tienes algún problema, puedes contactar con nuestro equipo a través del formulario de contacto. Intentaremos mediar para encontrar una solución satisfactoria para ambas partes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 