"use client"
import Link from "next/link"
import LoginButton from "@/components/LoginButton"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"
import { Sprout } from "lucide-react"

export function Menu() {
  return (
    <header className="bg-olive-100 bg-opacity-80 py-4 shadow-md backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-olive-800 text-xl font-bold hover:text-olive-600">
          <Sprout size={24} />
          <span>RedCultiva</span>
        </Link>
        <SessionProviderWrapper>
          <LoginButton />
        </SessionProviderWrapper>
      </div>
    </header>
  )
}
