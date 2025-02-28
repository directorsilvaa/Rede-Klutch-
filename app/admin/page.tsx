"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SeedDatabase } from '@/components/seed-database'
import { db, Punishment } from '@/lib/db'
import { toast } from '@/components/ui/use-toast'

export default function AdminPage() {
  const [punishments, setPunishments] = useState<Punishment[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    type: 'BAN',
    player: '',
    reason: '',
    duration: ''
  })

  useEffect(() => {
    const fetchPunishments = async () => {
      try {
        const result = await db.getPunishments()
        setPunishments(result)
      } catch (error) {
        console.error("Failed to fetch punishments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPunishments()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.player || !formData.reason || !formData.duration) {
      toast({
        description: "Preencha todos os campos",
        variant: "destructive"
      })
      return
    }

    try {
      const newPunishment = {
        type: formData.type as 'BAN' | 'MUTE',
        player: formData.player,
        reason: formData.reason,
        duration: formData.duration,
        date: new Date().toLocaleString('pt-BR')
      }

      await db.addPunishment(newPunishment)
      
      // Refresh the list
      const updatedPunishments = await db.getPunishments()
      setPunishments(updatedPunishments)
      
      // Reset form
      setFormData({
        type: 'BAN',
        player: '',
        reason: '',
        duration: ''
      })
      
      toast({
        description: "Punição adicionada com sucesso"
      })
    } catch (error) {
      console.error("Failed to add punishment:", error)
      toast({
        description: "Erro ao adicionar punição",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await db.deletePunishment(id)
      
      // Refresh the list
      const updatedPunishments = await db.getPunishments()
      setPunishments(updatedPunishments)
      
      toast({
        description: "Punição removida com sucesso"
      })
    } catch (error) {
      console.error("Failed to delete punishment:", error)
      toast({
        description: "Erro ao remover punição",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1b1f]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-white">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Adicionar Punição</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BAN">BAN</SelectItem>
                    <SelectItem value="MUTE">MUTE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="player">Jogador</Label>
                <Input 
                  id="player" 
                  name="player" 
                  value={formData.player} 
                  onChange={handleInputChange} 
                  placeholder="Nome do jogador" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Motivo</Label>
                <Input 
                  id="reason" 
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleInputChange} 
                  placeholder="Motivo da punição" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duração</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleInputChange} 
                  placeholder="Ex: 1d, 2h, Permanente" 
                />
              </div>
              
              <Button type="submit" className="w-full">Adicionar</Button>
            </form>
            
            <div className="mt-8">
              <SeedDatabase />
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Punições Recentes</h2>
            
            {loading ? (
              <p className="text-gray-400">Carregando punições...</p>
            ) : punishments.length === 0 ? (
              <p className="text-gray-400">Nenhuma punição encontrada.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {punishments.map((punishment) => (
                  <div 
                    key={punishment.id} 
                    className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          punishment.type === 'BAN' 
                            ? 'bg-red-500/20 text-red-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {punishment.type}
                        </span>
                        <span className="text-white font-medium">{punishment.player}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{punishment.reason}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{punishment.date}</span>
                        <span>{punishment.duration}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      onClick={() => punishment.id && handleDelete(punishment.id)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}