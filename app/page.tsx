"use client"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, ChevronDown, Menu, Copy, Check, Users, Server, Wifi } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useServerStatus } from "@/hooks/use-server-status"

const navItems = [
  { name: "Loja", href: "/loja" },
  { name: "Equipe", href: "/equipe" },
  { name: "Punições", href: "/punicoes" }
]

const faqItems = [
  {
    question: "O VIP e o Cash são entregues imediatamente?",
    answer: "Sim! Assim que o pagamento for confirmado, o sistema processa a entrega automaticamente."
  },
  {
    question: "É seguro comprar aqui?",
    answer: "Sim! Nossa plataforma utiliza as mais recentes tecnologias de segurança para proteger seus dados e garantir uma experiência de compra confiável."
  },
  {
    question: "Quais métodos de pagamento são aceitos?",
    answer: "Aceitamos Pix, Mercado Pago, PayPal e Stripe."
  }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { status, loading } = useServerStatus('redeklutch.sytes.net')

  const copyIP = () => {
    navigator.clipboard.writeText("redeklutch.sytes.net")
    toast({
      title: "IP copiado!",
      description: "O IP do servidor foi copiado para sua área de transferência."
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1b1f]">
      <main className="flex-1">
        <div className="relative h-[300px] md:h-[400px] bg-[url('https://images.unsplash.com/photo-1607988795691-3d0147b43231?q=80&w=2070')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80">
            <div className="container mx-auto h-full flex flex-col items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="floating w-48 md:w-64 lg:w-72 h-auto mx-auto mb-6"
                  priority
                />
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <div 
                    className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors" 
                    onClick={copyIP}
                  >
                    <span className="text-sm font-medium text-white">redeklutch.sytes.net</span>
                    <Copy className="h-4 w-4 text-white opacity-50" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Server Status */}
                    <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                      <Wifi className={`h-4 w-4 ${status?.online ? 'text-green-500' : 'text-red-500'}`} />
                      <span className="text-sm text-white">
                        {loading ? 'Carregando...' : status?.online ? 'Online' : 'Offline'}
                      </span>
                    </div>

                    {/* Player Count */}
                    <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                      <Users className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-white">
                        {loading ? 'Carregando...' : 
                         status?.online ? `${status.players.online}/${status.players.max}` : '0/0'}
                      </span>
                    </div>

                    {/* Version */}
                    <div className="hidden md:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                      <Server className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-white">
                        {loading ? 'Carregando...' : 
                         status?.version || 'Versão desconhecida'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* MOTD */}
                {status?.motd?.clean && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-white/80 text-sm"
                  >
                    {status.motd.clean.map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

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
                  placeholder="Procurar jogador..."
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

        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - FAQ Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-2">👋 Bem-vindo(a) à Loja Oficial do Servidor VONIX!</h2>
                <h3 className="text-lg font-medium text-yellow-500 mb-4">Confira abaixo as perguntas frequentes:</h3>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.question}</p>
                        <p className="text-gray-400 text-sm">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-white font-medium">📞 Ainda tem dúvidas?</p>
                  <p className="text-gray-400 text-sm">Entre em contato com nossa equipe, estamos prontos para te ajudar! 👉</p>
                </div>
              </div>

              {/* Game Modes Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer">
                  <Image
                    src="https://images.unsplash.com/photo-1642479755619-1e76716774e4?q=80&w=1000"
                    alt="Factions Pirates"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-white font-medium">Factions Pirates</h3>
                  <Button className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                    Ler mais
                  </Button>
                </div>
                <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer">
                  <Image
                    src="https://images.unsplash.com/photo-1642479755619-1e76716774e4?q=80&w=1000"
                    alt="Factions Phoenix"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-white font-medium">Factions Phoenix</h3>
                  <Button className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                    Ler mais
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Discord Widget */}
            <div className="bg-white/5 rounded-lg p-6">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black mb-4">
                Acesse nossa loja
              </Button>
              <iframe 
                src="https://discord.com/widget?id=1343461635678929007&theme=dark" 
                width="100%" 
                height="500" 
                allowTransparency={true} 
                frameBorder="0" 
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}