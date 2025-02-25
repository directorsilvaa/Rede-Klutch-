"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Search, ChevronDown, Menu, Home, Ban, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const navItems = [
  { name: "Início", href: "/", icon: Home },
  { name: "Loja", href: "/loja" },
  { name: "Equipe", href: "/equipe" },
  { name: "Punições", href: "/punicoes" }
]

const punishments = [
  {
    type: "BAN",
    date: "24/02/2025, 23:54:17",
    player: "yDiablo05",
    reason: "Construção Inapropriada",
    duration: "1d"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:53:25",
    player: "23332_",
    reason: "Uso de Trapaças",
    duration: "Permanente"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:52:04",
    player: "thebestdessejogo",
    reason: "Construção Inapropriada",
    duration: "19h"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:46:16",
    player: "Raviina",
    reason: "Uso de Trapaças",
    duration: "Permanente"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:44:36",
    player: "mediaevaleI",
    reason: "Apologia ao Nazismo",
    duration: "Permanente"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:43:55",
    player: "TokyIaisod",
    reason: "Uso de Trapaças",
    duration: "Permanente"
  },
  {
    type: "MUTE",
    date: "24/02/2025, 23:42:16",
    player: "xCaiowLITORANDO",
    reason: "Violação das Regras da comunidade",
    duration: "2h"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:37:42",
    player: "DGKRR",
    reason: "Uso de Trapaças",
    duration: "Permanente"
  }
]

const filters = [
  { label: "MENSAL", active: true },
  { label: "TUDO", active: false },
  { label: "VIP", active: false }
]

export default function Punishments() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(filters)

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
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
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
                placeholder="Procurar punição..."
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
                      {item.hasDropdown && <ChevronDown className="ml-2 h-4 w-4" />}
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
          <h1 className="text-5xl font-bold mb-4 text-white">PUNIÇÕES</h1>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {activeFilters.map((filter, index) => (
            <Button
              key={filter.label}
              variant={filter.active ? "default" : "outline"}
              className={`${
                filter.active 
                  ? "bg-gray-700 text-white" 
                  : "bg-transparent text-gray-400 border-gray-700 hover:bg-gray-700/50"
              }`}
              onClick={() => {
                const newFilters = activeFilters.map((f, i) => ({
                  ...f,
                  active: i === index
                }))
                setActiveFilters(newFilters)
              }}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="text-gray-400 mb-6">
          24.580 punições encontradas.
        </div>

        {/* Punishments Table */}
        <div className="bg-gray-800/50 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="px-6 py-4 text-gray-400 font-medium">TIPO</th>
                <th className="px-6 py-4 text-gray-400 font-medium">DATA</th>
                <th className="px-6 py-4 text-gray-400 font-medium">JOGADOR</th>
                <th className="px-6 py-4 text-gray-400 font-medium">MOTIVO</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-right">DURAÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {punishments.map((punishment, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-700/50 hover:bg-gray-700/25 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                      punishment.type === "BAN" 
                        ? "bg-red-500/20 text-red-500" 
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {punishment.type === "BAN" ? (
                        <Ban className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {punishment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{punishment.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={`https://mc-heads.net/avatar/${punishment.player}`}
                        alt={punishment.player}
                        className="w-6 h-6 rounded mr-2"
                      />
                      <span className="text-gray-300">{punishment.player}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{punishment.reason}</td>
                  <td className="px-6 py-4 text-right text-gray-400">{punishment.duration}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}