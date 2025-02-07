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

  if (session) {
    return (
      <button
        className="bg-olivine-100 text-dark_moss_green-600 hover:bg-olivine-200 font-bold py-2 px-4 rounded"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    );
  }
  return (
    <button
      className="bg-olivine-100 text-dark_moss_green-600 hover:bg-olivine-200 font-bold py-2 px-4 rounded"
      onClick={() => signIn("discord")}
    >
      Iniciar sesión en Discord
    </button>
  );
}
