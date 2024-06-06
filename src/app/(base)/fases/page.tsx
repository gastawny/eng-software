import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function PhasesPage() {
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
      <p>Selecione a fase que deseja acessar</p>
    </>
  )
}
