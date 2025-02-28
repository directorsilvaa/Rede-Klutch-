"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

export function SeedDatabase() {
  const [isLoading, setIsLoading] = useState(false)

  const seedDatabase = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/seed')
      const data = await response.json()
      
      if (data.success) {
        toast({
          description: data.message
        })
      } else {
        toast({
          description: data.message || 'Erro ao popular o banco de dados',
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        description: 'Erro ao conectar com a API',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={seedDatabase} 
      disabled={isLoading}
      variant="outline"
      className="bg-gray-800 text-white hover:bg-gray-700"
    >
      {isLoading ? 'Populando...' : 'Popular Banco de Dados'}
    </Button>
  )
}