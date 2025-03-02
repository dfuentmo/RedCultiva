// components/LoginButton.tsx
'use client'

import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react';

export default function LoginButton() {
  return (
    <SessionProvider>
      <LoginButtonContent />
    </SessionProvider>
  );
}

function LoginButtonContent() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        className="bg-olive-800 text-olive-100 hover:bg-olive-900 transition-colors font-medium py-2 px-4 rounded-lg shadow-md"
        onClick={() => signIn("discord")}
      >
        Iniciar sesión en Discord
      </button>
    );
  }
}
