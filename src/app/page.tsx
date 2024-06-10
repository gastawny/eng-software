import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { api } from '@/config/variables'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative h-screen w-screen flex justify-center items-center">
      <h1 className="absolute top-8 text-center text-4xl font-bold">
        Plantas em Ação:
        <br />
        Descobrindo e Crescendo
        {api}
      </h1>
      <Card>
        <CardContent className="flex flex-col gap-4 items-center w-[28rem] 2xl:w-[40rem]">
          <Button variant="ghost" asChild className="w-full text-2xl py-6">
            <div className="flex gap-4">
              <Link href="/login">Iniciar</Link>
              <img className="h-5" src="/assets/svgs/play.svg" />
            </div>
          </Button>
          <Button variant="ghost" asChild className="w-full text-2xl py-6">
            <div className="flex gap-3">
              <Link href="/comojogar">Como Jogar</Link>
              <img className="h-5" src="/assets/svgs/doubt.svg" />
            </div>
          </Button>
          <Button variant="ghost" asChild className="w-full text-2xl py-6">
            <div className="flex gap-3">
              <Link href="/creditos">Créditos</Link>
              <img className="h-5" src="/assets/svgs/info.svg" />
            </div>
          </Button>
          <Button variant="ghost" asChild className="w-full text-2xl py-6">
            <div className="flex gap-3">
              <Link href="/professor/login">Professor</Link>
              <img className="h-5" src="/assets/svgs/teacher.svg" />
            </div>
          </Button>
        </CardContent>
      </Card>
      <img className="absolute top-0 left-0" src="/assets/svgs/thunderstorm.svg" />
      <img className="absolute bottom-0 left-0" src="/assets/svgs/sun.svg" />
      <img className="absolute top-0 right-0 " src="/assets/svgs/flower.svg" />
      <img className="absolute bottom-0 right-0" src="/assets/svgs/thermometer.svg" />
    </div>
  )
}
