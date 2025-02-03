'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/config/variables'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PhasesPage() {
  const router = useRouter()
  const [phase1, setPhase1] = useState(undefined as any)
  const [phase2, setPhase2] = useState(undefined as any)
  const [themes, setThemes] = useState([] as any)
  const [selectedTheme, setSelectedTheme] = useState(undefined as any)

  useEffect(() => {
    setPhase1(getCookie('phase-1'))
    setPhase2(getCookie('phase-2'))

    async function fetchData() {
      setThemes(await fetch(`${api}/theme/${getCookie('student')}`).then((res) => res.json()))
    }

    fetchData()
  }, [])

  function redirectToPhase(phase: number) {
    if (!selectedTheme) {
      alert('Selecione um tema')
      return
    }

    setCookie('theme', selectedTheme)

    router.push(`fases/fase-${phase}`)
  }

  return (
    <div className="h-screen">
      <h1 className="text-5xl font-bold absolute left-1/2 top-16 -translate-x-1/2">
        Seleção de fases
      </h1>
      <Card className="w-[48rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardContent className="flex flex-col items-center gap-8">
          <Button
            onClick={() => redirectToPhase(1)}
            variant="ghost"
            className="text-3xl py-4 h-min w-full"
          >
            Fase I
            {phase1 ? (
              <img className="ml-4 h-8" src="/assets/svgs/trophy.svg" />
            ) : (
              <img className="ml-4 h-8" src="/assets/svgs/play.svg" />
            )}
          </Button>
          <Button
            disabled={!phase1}
            onClick={() => redirectToPhase(2)}
            variant="ghost"
            className="text-3xl py-4 h-min w-full"
          >
            Fase II
            {phase2 ? (
              <img className="ml-4 h-8" src="/assets/svgs/trophy.svg" />
            ) : (
              <img className="ml-4 h-8" src="/assets/svgs/play.svg" />
            )}
          </Button>
        </CardContent>
      </Card>
      <div className="absolute left-1/2 bottom-16 -translate-x-1/2 flex justify-center items-center gap-2">
        <p className="text-3xl">Tema:</p>
        <Select onValueChange={setSelectedTheme} required name="student">
          <SelectTrigger className="w-full text-3xl h-12">
            <SelectValue placeholder="Selecione o tema" />
          </SelectTrigger>
          <SelectContent className="h-72">
            <SelectGroup>
              <SelectLabel>Temas</SelectLabel>
              {themes.map((theme) => (
                <SelectItem key={theme.id} value={theme.id.toString()}>
                  {theme.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
