import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'

export default function BaseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Dialog>
        <DialogTrigger
          className={buttonVariants({ variant: 'ghost', className: 'absolute top-1.5 left-1.5' })}
        >
          <div className="flex gap-4 items-center">
            <span className="text-xl">Menu Principal</span>
            <img className="h-4" src="/assets/svgs/menu.svg" />
          </div>
        </DialogTrigger>
        <DialogContent className="gap-6 p-8 w-[48rem]">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja fazer isto?</DialogTitle>
          </DialogHeader>
          <p className="text-4xl font-bold">Deseja retornar ao menu principal?</p>
          <DialogFooter>
            <Link
              href="/"
              className={buttonVariants({
                variant: 'destructive',
                size: 'lg',
                className: 'text-base',
              })}
            >
              Sim, retornar
            </Link>
            <DialogClose
              className={buttonVariants({
                size: 'lg',
                className: 'text-base font-medium',
              })}
            >
              Não, continuar
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {children}
    </>
  )
}
