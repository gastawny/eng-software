import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

async function submit(e: FormData) {
  'use server'

  console.log(e.get('name'), e.get('username'), e.get('password'), e.get('confirmPassword'))
}

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="absolute left-1/2 -translate-x-1/2 top-8 text-5xl font-bold">
        Login Professor
      </h1>
      <Card className="w-[28rem] 2xl:w-[40rem] p-2 pb-0">
        <CardContent>
          <form action={submit} className="flex flex-col gap-3 2xl:gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input required id="name" name="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username">Usuário</Label>
              <Input required id="username" name="username" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input required id="password" name="password" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirme a sua senha</Label>
              <Input required id="confirmPassword" name="confirmPassword" />
            </div>
            <Button asChild variant="link" className="w-min h-min p-0">
              <Link href="/professor/login">Já possui uma conta?</Link>
            </Button>
            <Button>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
