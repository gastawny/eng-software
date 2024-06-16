'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { setSound } from '@/utils/setSound'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PhasesPage() {
  const router = useRouter()
  const [phase1, setPhase1] = useState(undefined as any)
  const [phase2, setPhase2] = useState(undefined as any)

  useEffect(() => {
    const audio = new Audio('/assets/sounds/selecao-de-fases.ogg')
    setSound(audio, 11500)

    setPhase1(getCookie('phase-1'))
    setPhase2(getCookie('phase-2'))

    return () => {
      audio.pause()
    }
  }, [])

  return (
    <>
      <h1 className="text-5xl font-bold absolute left-1/2 top-16 -translate-x-1/2">
        Seleção de fases
      </h1>
      <Card className="w-[48rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardContent className="flex flex-col items-center gap-8">
          <Button
            onClick={() => router.push('fases/fase-1')}
            variant="ghost"
            className="text-3xl py-4 h-min w-full"
          >
            Fase I: Crescendo
            {phase1 ? (
              <img className="ml-4 h-8" src="/assets/svgs/trophy.svg" />
            ) : (
              <img className="ml-4 h-8" src="/assets/svgs/play.svg" />
            )}
          </Button>
          <Button
            disabled={!phase1}
            onClick={() => router.push('fases/fase-2')}
            variant="ghost"
            className="text-3xl py-4 h-min w-full"
          >
            Fase II: Sobre mim
            {phase2 ? (
              <img className="ml-4 h-8" src="/assets/svgs/trophy.svg" />
            ) : (
              <img className="ml-4 h-8" src="/assets/svgs/play.svg" />
            )}
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
