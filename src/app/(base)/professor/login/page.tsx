import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

async function submit(e: FormData) {
  'use server'

  console.log(e.get('username'), e.get('password'))
}

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="absolute left-1/2 -translate-x-1/2 top-8 text-5xl font-bold">
        Login Professor
      </h1>
      <Card className="w-[28rem] 2xl:w-[40rem] p-8 pb-6">
        <CardContent>
          <form action={submit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Usuário</Label>
              <Input required id="username" name="username" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input required id="password" name="password" />
            </div>
            <Button asChild variant="link" className="w-min h-min p-0">
              <Link href="/professor/cadastro">Não possui uma conta?</Link>
            </Button>
            <Button>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
