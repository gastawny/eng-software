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

function getTeachers() {
  return [
    {
      id: 1,
      name: 'Teacher 1',
    },
    {
      id: 2,
      name: 'Teacher 2',
    },
    {
      id: 3,
      name: 'Teacher 3',
    },
    {
      id: 4,
      name: 'Teacher 4',
    },
    {
      id: 5,
      name: 'Teacher 5',
    },
    {
      id: 6,
      name: 'Teacher 6',
    },
    {
      id: 7,
      name: 'Teacher 7',
    },
    {
      id: 8,
      name: 'Teacher 8',
    },
    {
      id: 9,
      name: 'Teacher 9',
    },
    {
      id: 10,
      name: 'Teacher 10',
    },
    {
      id: 11,
      name: 'Teacher 11',
    },
    {
      id: 12,
      name: 'Teacher 12',
    },
    {
      id: 13,
      name: 'Teacher 13',
    },
    {
      id: 14,
      name: 'Teacher 14',
    },
    {
      id: 15,
      name: 'Teacher 15',
    },
  ]
}

function getStudents() {
  return [
    {
      id: 1,
      name: 'Student 1',
    },
    {
      id: 2,
      name: 'Student 2',
    },
    {
      id: 3,
      name: 'Student 3',
    },
    {
      id: 4,
      name: 'Student 4',
    },
    {
      id: 5,
      name: 'Student 5',
    },
    {
      id: 6,
      name: 'Student 6',
    },
    {
      id: 7,
      name: 'Student 7',
    },
    {
      id: 8,
      name: 'Student 8',
    },
    {
      id: 9,
      name: 'Student 9',
    },
    {
      id: 10,
      name: 'Student 10',
    },
    {
      id: 11,
      name: 'Student 11',
    },
    {
      id: 12,
      name: 'Student 12',
    },
    {
      id: 13,
      name: 'Student 13',
    },
    {
      id: 14,
      name: 'Student 14',
    },
    {
      id: 15,
      name: 'Student 15',
    },
  ]
}

async function submit(e: FormData) {
  'use server'

  console.log(e.get('teacher'), e.get('student'))
}

export default function LoginPage() {
  const teachers = getTeachers()
  const students = getStudents()

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="absolute left-1/2 -translate-x-1/2 top-8 text-5xl font-bold">Login Aluno</h1>
      <Card className="w-[28rem] 2xl:w-[40rem]">
        <CardContent>
          <form action={submit} className="flex flex-col gap-5 2xl:gap-8">
            <div className="flex flex-col gap-2">
              <Label>Professor</Label>
              <Select name="teacher">
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Selecione o professor" />
                </SelectTrigger>
                <SelectContent className="h-72">
                  <SelectGroup>
                    <SelectLabel>Professores</SelectLabel>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Aluno</Label>
              <Select name="student">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent className="h-72">
                  <SelectGroup>
                    <SelectLabel>Alunos</SelectLabel>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
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
