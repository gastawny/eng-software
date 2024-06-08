'use client'

import { Group } from '@/types/group'
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

export function LoginScreen({ groups, students }: { groups: Group[]; students: Student[] }) {
  const [selectedGroup, setSelectedGroup] = useState<Group>({} as Group)
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])

  useEffect(() => {
    setFilteredStudents(
      students.filter((student) => student.group.idGroup === selectedGroup.idGroup)
    )
  }, [selectedGroup])

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="absolute left-1/2 -translate-x-1/2 top-8 text-5xl font-bold">Login Aluno</h1>
      <Card className="w-[28rem] 2xl:w-[40rem]">
        <CardContent>
          <form action={submit} className="flex flex-col gap-5 2xl:gap-8">
            <div className="flex flex-col gap-2">
              <Label>Professor</Label>
              <Select
                onValueChange={(e) =>
                  setSelectedGroup(groups.filter((g) => g.idGroup == Number(e))[0])
                }
                required
                name="group"
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Selecione o professor" />
                </SelectTrigger>
                <SelectContent className="h-72">
                  <SelectGroup>
                    <SelectLabel>Professores</SelectLabel>
                    {groups.map((group) => (
                      <SelectItem key={group.idGroup} value={group.idGroup.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Aluno</Label>
              <Select required name="student">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent className="h-72">
                  <SelectGroup>
                    <SelectLabel>Alunos</SelectLabel>
                    {filteredStudents.map((student) => (
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
