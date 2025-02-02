'use client'

import { Student } from '@/types/student'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { submit } from './action'
import { api } from '@/config/variables'

export default function LoginPage() {
  const [students, setStudents] = useState([] as Student[])

  useEffect(() => {
    async function fetchData() {
      setStudents(await fetch(`${api}/student`).then((res) => res.json()))
    }

    fetchData()
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="absolute left-1/2 -translate-x-1/2 top-8 text-5xl font-bold">Login Aluno</h1>
      <Card className="w-[28rem] 2xl:w-[40rem] py-6">
        <CardContent>
          <form action={submit} className="flex flex-col gap-5 2xl:gap-8">
            <div className="flex flex-col gap-2">
              <Label>Aluno</Label>
              <Select required name="student">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent className="h-72">
                  <SelectGroup>
                    <SelectLabel>Alunos</SelectLabel>
                    {students.map((student) => (
                      <SelectItem key={student.idStudent} value={student.idStudent.toString()}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
