'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/config/variables'
import { setCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [inputs, setInputs] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const res = await fetch(`${api}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: inputs.username, password: inputs.password }),
    })

    if (!res.ok) {
      setError('Erro ao logar')
      return
    }

    const data = await res.json()

    setCookie('teacherId', data.userId)
    setCookie('teacherFullName', data.fullName)
    setCookie('teacherUsername', data.username)

    router.push('/professor')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="absolute left-1/2 -translate-x-1/2 top-8 text-5xl font-bold">
        Login Professor
      </h1>
      <Card className="w-[28rem] 2xl:w-[40rem] p-8 pb-6">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                required
                id="username"
                name="username"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                type='password'
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                required
                id="password"
                name="password"
              />
            </div>
            <Button asChild variant="link" className="w-min h-min p-0">
              <Link href="/professor/cadastro">Não possui uma conta?</Link>
            </Button>
            <div className="text-red-700 font-bold">{error}</div>
            <Button>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
