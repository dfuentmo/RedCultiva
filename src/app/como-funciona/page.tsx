"use client";
import { Sprout, Leaf, Users, Shield, BookOpen, Scale, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ComoFunciona() {
  // Estado para controlar qué preguntas están abiertas
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  // Función para manejar el clic en una pregunta
  const toggleQuestion = (index: number) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter(i => i !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  // Array de preguntas y respuestas
  const faqs = [
    {
      question: "¿Cómo puedo convertirme en guardián de semillas?",
      answer: "Para convertirte en guardián, simplemente inicia sesión con tu cuenta de Discord y comienza a añadir tus semillas al catálogo. No hay requisitos mínimos, pero valoramos la calidad y precisión de la información."
    },
    {
      question: "¿Qué información debo proporcionar sobre mis semillas?",
      answer: "Es importante incluir el nombre de la variedad, año de recolección, lugar de origen, y cualquier observación relevante sobre su cultivo o características especiales."
    },
    {
      question: "¿Cómo se gestionan los gastos de envío?",
      answer: "Los gastos de envío son acordados entre las partes. Recomendamos utilizar sobres acolchados pequeños para minimizar costes y proteger las semillas durante el transporte."
    },
    {
      question: "¿Qué ocurre si tengo un problema con un intercambio?",
      answer: "Si tienes algún problema, puedes contactar con nuestro equipo a través del formulario de contacto o mediante nuestro bot de Discord. Intentaremos mediar para encontrar una solución satisfactoria para ambas partes."
    },
    {
      question: "¿Necesito tener Discord para usar RedCultiva?",
      answer: "Sí, utilizamos Discord como sistema de autenticación y como plataforma complementaria. Necesitarás una cuenta de Discord para acceder a todas las funcionalidades de RedCultiva."
    }
  ];

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

        {/* Integración con Discord */}
        <div className="max-w-5xl mx-auto mb-16 bg-olive-100 bg-opacity-60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-olive-200/30">
          <h2 className="text-3xl font-bold text-center text-olive-900 mb-10 relative">
            <span className="relative z-10">Integración con Discord</span>
            <span className="absolute w-16 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-3"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-olive-200 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-olive-800" />
                </div>
                <h3 className="text-xl font-semibold text-olive-900">Login con Discord</h3>
              </div>
              <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30 mb-4">
                <p className="text-olive-800 mb-3">
                  RedCultiva utiliza Discord como sistema de autenticación, lo que te permite acceder a la plataforma de forma segura y sencilla:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-olive-800">
                  <li>No necesitas crear una cuenta adicional</li>
                  <li>Proceso de login rápido y seguro mediante OAuth2</li>
                  <li>Solo accedemos a información básica como tu nombre de usuario y avatar</li>
                  <li>No tenemos acceso a tus mensajes privados ni a otros datos personales</li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-olive-200 p-3 rounded-full mr-4">
                  <MessageSquare className="h-6 w-6 text-olive-800" />
                </div>
                <h3 className="text-xl font-semibold text-olive-900">Bot de Discord</h3>
              </div>
              <div className="bg-olive-50 bg-opacity-70 rounded-xl p-5 shadow-sm border border-olive-200/30 mb-4">
                <p className="text-olive-800 mb-3">
                  Complementamos nuestra plataforma web con un bot de Discord que te permite:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-olive-800">
                  <li>Consultar el catálogo de semillas directamente desde Discord</li>
                  <li>Recibir notificaciones sobre solicitudes de intercambio</li>
                  <li>Conectar con otros guardianes de semillas</li>
                  <li>Acceder a la misma información que está disponible en la web</li>
                  <li>Participar en una comunidad activa de intercambio de conocimientos</li>
                </ul>
                <p className="text-olive-800 mt-3">
                  El bot está diseñado para sincronizarse con la plataforma web, ofreciendo una experiencia integrada y coherente.
                </p>
              </div>
            </div>
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
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-olive-100 bg-opacity-60 backdrop-blur-sm rounded-xl shadow-md border border-olive-200/30 overflow-hidden"
              >
                <button 
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                >
                  <h3 className="text-xl font-semibold text-olive-900">{faq.question}</h3>
                  <span className="text-olive-700 flex-shrink-0 ml-4">
                    {openQuestions.includes(index) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </span>
                </button>
                <div 
                  className={`px-6 pb-6 text-olive-800 transition-all duration-300 ease-in-out ${
                    openQuestions.includes(index) 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 