"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, ChevronDown, Menu, Star, Diamond, Crown, Sword, Home, Lock, Users, Tag, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const navItems = [
  { name: "Início", href: "/", icon: Home },
  { name: "Loja", href: "/loja" },
  { name: "Equipe", href: "/equipe" },
  { name: "Punições", href: "/punicoes" }
]

const vipPackages = [
  {
    title: "ULTRA+",
    duration: "1 MÊS",
    price: "R$ 24.90",
    color: "from-pink-500 to-purple-500"
  },
  {
    title: "ULTRA+",
    duration: "3 MESES",
    price: "R$ 59.90",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "ULTRA+",
    duration: "6 MESES",
    price: "R$ 99.90",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "ULTRA+",
    duration: "12 MESES",
    price: "R$ 179.90",
    color: "from-orange-500 to-yellow-500"
  }
]

const benefits = [
  {
    title: "SEJA MAIS",
    description: "A conta mais exclusiva que garante uma base sólida de 2 plots extras!",
    icon: Star
  },
  {
    title: "NICK CUSTOMIZADO",
    description: "Use até 3 nomes diferentes na sua por dia e troque quando quiser!",
    icon: Tag
  },
  {
    title: "SALAS CUSTOMIZADAS",
    description: "Crie salas privadas e customize-as para jogar!",
    icon: MessageSquare
  },
  {
    title: "COR DE CLAN",
    description: "Escolha uma cor para o seu clã especial!",
    icon: Diamond
  },
  {
    title: "TÍTULOS NO LOBBY",
    description: "Exiba seu prestígio com títulos no lobby!",
    icon: Crown
  },
  {
    title: "MÚLTIPLAS TAGS",
    description: "Escolha e troque entre várias tags exclusivas!",
    icon: Tag
  },
  {
    title: "ABRIR PARTY",
    description: "Defina a sua party privada e personalize!",
    icon: Lock
  },
  {
    title: "ANIMAÇÃO ESPECIAL NO LOBBY",
    description: "Apareça no lobby com estilo e mostre sua presença!",
    icon: Star
  },
  {
    title: "FORMATOS DE TAG",
    description: "Altere o formato da tag como desejar!",
    icon: Tag
  },
  {
    title: "MAIS AMIGOS",
    description: "Aumente o seu limite para até 100 amigos!",
    icon: Users
  }
]

export default function Store() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1b1f]">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-gradient-to-b from-orange-500 to-orange-600 shadow-lg">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container flex h-16 items-center justify-between lg:justify-center relative"
        >
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <Link href={item.href}>
                  <Button 
                    variant="ghost" 
                    className="relative text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 h-10"
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-white/50 group-hover:text-white/70 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Procurar produto..."
                className="hidden md:block pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 
                         focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/20
                         transition-all duration-200 w-48 group-hover:w-56"
              />
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 bg-orange-600 lg:hidden"
            >
              <div className="container py-2">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full text-white justify-start"
                    >
                      {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">VOCÊ PRECISA DO RANK ULTRA+</h1>
          
          {/* VIP Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {vipPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`rounded-2xl p-6 bg-gradient-to-br ${pkg.color} transform transition-transform group-hover:scale-105`}>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                    <p className="text-lg mb-4">{pkg.duration}</p>
                    <p className="text-2xl font-bold">{pkg.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <h2 className="text-3xl font-bold text-white mb-8">VANTAGENS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-xl p-6 transform transition-transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <benefit.icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}