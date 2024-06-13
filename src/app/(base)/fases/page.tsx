'use client'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { setSound } from '@/utils/setSound'
import Link from 'next/link'
import { useEffect } from 'react'

export default function PhasesPage() {
  useEffect(() => {
    const audio = new Audio('/assets/sounds/selecao-de-fases.ogg')
    setSound(audio, 11500)

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
          <Link
            href="fases/fase-1"
            className={buttonVariants({
              variant: 'ghost',
              className: 'text-3xl py-4 h-min w-full',
            })}
          >
            Fase I: Crescendo
            <img className="ml-4 h-5" src="/assets/svgs/play.svg" />
          </Link>
          <Link
            href="fases/fase-2"
            className={buttonVariants({
              variant: 'ghost',
              className: 'text-3xl py-4 h-min w-full',
            })}
          >
            Fase II: Sobre mim
            <img className="ml-4 h-5" src="/assets/svgs/play.svg" />
          </Link>
        </CardContent>
      </Card>
    </>
  )
}
