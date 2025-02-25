"use client"

import Link from "next/link"
import Image from "next/image"
import { Home, ShoppingCart, History, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/carrinho", icon: ShoppingCart, label: "Carrinho", badge: "0" },
  { href: "/historia", icon: History, label: "História" },
  { href: "/loja", icon: Store, label: "Loja" }
]

export function MainNav() {
  return (
    <nav className="sticky top-14 z-40 border-b border-[#2a2b30] bg-[#1a1b1f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1b1f]/60">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="container flex h-14 items-center justify-between"
      >
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={35}
            className="h-8 w-auto floating"
            priority
          />
        </Link>

        <div className="flex items-center justify-center space-x-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <Button variant="ghost" className="nav-button text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 rounded-full bg-yellow-500 px-2 py-0.5 text-xs text-black">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}