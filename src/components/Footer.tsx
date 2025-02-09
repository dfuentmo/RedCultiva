import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-olive-100 bg-opacity-80 py-8 shadow-md backdrop-blur-lg">
      <div className="container mx-auto text-center px-4 text-olive-800 font-bold">
        <p>
          &copy; 2025 RedCultiva. Un proyecto de{' '}
          <a
            href="https://www.ecohuertosalduie.com"
            className="text-olive-600 hover:underline"
          >
            Ecohuertosalduie
          </a>
        </p>
        <p className="mt-2">
          <a
            href="/politica-privacidad"
            className="text-olive-600 hover:underline"
          >
            Política de Privacidad y Cookies
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
