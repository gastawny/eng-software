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

export default function RegisterPage() {
  const router = useRouter()
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (inputs.password !== inputs.confirmPassword) setError('As senhas não coincidem')

    const response = await fetch(`${api}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
    if (!response.ok) setError('Erro ao cadastrar')

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
      <h1 className="absolute left-1/2 -translate-x-1/2 top-2 2xl:top-8 text-4xl 2xl:text-5xl font-bold">
        Login Professor
      </h1>
      <Card className="w-[28rem] 2xl:w-[40rem] p-2 pb-0">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 2xl:gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                required
                id="name"
                name="name"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username">Usuário</Label>
              <Input
                required
                id="username"
                name="username"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                required
                id="emial"
                name="email"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                required
                id="password"
                name="password"
                value={inputs.password}
                type="password"
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirme a sua senha</Label>
              <Input
                required
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
            </div>
            <div className="flex justify-between">
              <Button asChild variant="link" className="w-min h-min p-0">
                <Link href="/professor/login">Já possui uma conta?</Link>
              </Button>
              <div className="text-red-700 font-bold">{error}</div>
            </div>
            <Button>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
