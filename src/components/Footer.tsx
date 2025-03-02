import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-olive-100 text-olive-900 py-8 mt-auto">
      <div className="container mx-auto text-center px-4">
        <p className="font-medium">
          &copy; 2025 RedCultiva. Un proyecto de{' '}
          <a
            href="https://www.ecohuertosalduie.com"
            className="text-olive-600 hover:text-olive-800 transition-colors hover:underline"
          >
            Ecohuertosalduie
          </a>
        </p>
        <p className="mt-2">
          <a
            href="/politica-privacidad"
            className="text-olive-600 hover:text-olive-800 transition-colors hover:underline"
          >
            Política de Privacidad y Cookies
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
