"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, ChevronDown, Menu, Home, Shield, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const navItems = [
  { name: "Início", href: "/", icon: Home },
  { name: "Loja", href: "/loja" },
  { name: "Equipe", href: "/equipe" },
  { name: "Punições", href: "/punicoes" }
]

const staffCategories = [
  {
    title: "ADMINISTRADORES (8)",
    color: "bg-red-600",
    members: [
      { name: "Beatty", avatar: "https://mc-heads.net/avatar/Beatty" },
      { name: "gringo", avatar: "https://mc-heads.net/avatar/gringo" },
      { name: "mariopedro", avatar: "https://mc-heads.net/avatar/mariopedro" },
      { name: "b4d4", avatar: "https://mc-heads.net/avatar/b4d4" },
      { name: "Pyron", avatar: "https://mc-heads.net/avatar/Pyron" },
      { name: "Extreme", avatar: "https://mc-heads.net/avatar/Extreme" },
      { name: "Atheus", avatar: "https://mc-heads.net/avatar/Atheus" },
      { name: "GhTMine", avatar: "https://mc-heads.net/avatar/GhTMine" }
    ]
  },
  {
    title: "MODERADORES+ (4)",
    color: "bg-purple-600",
    members: [
      { name: "Beatty", avatar: "https://mc-heads.net/avatar/Beatty" },
      { name: "gringo", avatar: "https://mc-heads.net/avatar/gringo" },
      { name: "mariopedro", avatar: "https://mc-heads.net/avatar/mariopedro" },
      { name: "b4d4", avatar: "https://mc-heads.net/avatar/b4d4" }
    ]
  },
  {
    title: "MODERADORES (14)",
    color: "bg-purple-600",
    members: [
      { name: "_Honey", avatar: "https://mc-heads.net/avatar/_Honey" },
      { name: "alexsandro", avatar: "https://mc-heads.net/avatar/alexsandro" },
      { name: "BlackMoon", avatar: "https://mc-heads.net/avatar/BlackMoon" },
      { name: "ImWolf", avatar: "https://mc-heads.net/avatar/ImWolf" },
      { name: "PyronBR", avatar: "https://mc-heads.net/avatar/PyronBR" },
      { name: "ExtremeRayzen", avatar: "https://mc-heads.net/avatar/ExtremeRayzen" },
      { name: "Atheus_", avatar: "https://mc-heads.net/avatar/Atheus_" },
      { name: "GhTMine", avatar: "https://mc-heads.net/avatar/GhTMine" },
      { name: "RyanFGSilva", avatar: "https://mc-heads.net/avatar/RyanFGSilva" },
      { name: "SetheBoy", avatar: "https://mc-heads.net/avatar/SetheBoy" },
      { name: "vRedeBoy", avatar: "https://mc-heads.net/avatar/vRedeBoy" },
      { name: "sonDrenan", avatar: "https://mc-heads.net/avatar/sonDrenan" },
      { name: "spaaawn", avatar: "https://mc-heads.net/avatar/spaaawn" },
      { name: "yPedroGalvao", avatar: "https://mc-heads.net/avatar/yPedroGalvao" }
    ]
  },
  {
    title: "MODERADORES EM TESTE (2)",
    color: "bg-purple-600",
    members: [
      { name: "XXLeo", avatar: "https://mc-heads.net/avatar/XXLeo" },
      { name: "Haxy", avatar: "https://mc-heads.net/avatar/Haxy" }
    ]
  }
]

export default function Team() {
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
                placeholder="Procurar staff..."
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
                      className="w-full justify-start text-white hover:bg-white/10"
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-white">Nossa Equipe</h1>
          <p className="text-xl text-gray-400">Conheça os membros que fazem o servidor acontecer!</p>
        </motion.div>

        <div className="space-y-8">
          {staffCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-6"
            >
              <div className={`inline-block px-4 py-2 rounded-lg ${category.color} text-white font-bold mb-6`}>
                {category.title}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {category.members.map((member, memberIndex) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (memberIndex * 0.05) }}
                    className="flex flex-col items-center group"
                  >
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-lg transform group-hover:scale-110 transition-transform duration-200"
                      />
                      <div className="absolute -bottom-2 -right-2">
                        {categoryIndex === 0 ? (
                          <Shield className="w-5 h-5 text-red-500" />
                        ) : (
                          <Star className="w-5 h-5 text-purple-500" />
                        )}
                      </div>
                    </div>
                    <span className="mt-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}