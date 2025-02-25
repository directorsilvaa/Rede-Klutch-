"use client"

import Link from "next/link"
import { ShoppingCart, Home, History, Store } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/carrinho">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/historia">
            <Button variant="ghost" size="icon">
              <History className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/loja">
            <Button variant="ghost" size="icon" className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Store className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}