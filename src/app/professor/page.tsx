'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { api } from '@/config/variables'
import { useEffect, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function TeacherPage() {
  const router = useRouter()
  const teacherId = getCookie('teacherId')
  const [selectedGroup, setSelectedGroup] = useState({} as any)
  const [groups, setGroups] = useState([])
  const [students, setstudents] = useState([] as any[])
  const [allStudents, setAllStudents] = useState([] as any[])
  const [inputs, setInputs] = useState({ name: '', acronym: '', post: false })
  const [studentInputs, setStudentInputs] = useState({ name: '', post: false, oldName: '' } as any)
  const [message, setMessage] = useState({ err: false, message: '' })

  useEffect(() => {
    if (!teacherId) router.push('/professor/login')

    fetch(`${api}/group/${teacherId}`)
      .then((response) => response.json())
      .then((data) => setGroups(data))

    fetch(`${api}/student`)
      .then((response) => response.json())
      .then((data) => setAllStudents(data))
  }, [])

  useEffect(() => {
    if (!selectedGroup.idGroup) return

    fetch(`${api}/report/group/${selectedGroup.idGroup}`)
      .then((response) => response.json())
      .then((data) => {
        setstudents(data)
      })
  }, [selectedGroup])

  function handleClick() {
    deleteCookie('teacherFullName')
    deleteCookie('teacherId')
    deleteCookie('teacherUsername')

    router.push('/')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let res: Response

    if (inputs.post) {
      res = await fetch(`${api}/group`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputs.name, acronym: inputs.acronym, teacher: teacherId }),
      })
    } else {
      res = await fetch(`${api}/group`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inputs.name,
          acronym: inputs.acronym,
          id: selectedGroup.idGroup,
          teacher: teacherId,
        }),
      })
    }

    if (!res.ok) {
      setMessage({ err: true, message: 'Erro' })
      return
    }

    setMessage({ err: false, message: 'Sucesso' })

    setTimeout(() => window.location.reload(), 1000)
  }

  async function handleSubmitStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let res: Response

    if (studentInputs.post) {
      res = await fetch(`${api}/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: studentInputs.name, group: selectedGroup.idGroup }),
      })
    } else {
      res = await fetch(`${api}/student`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: studentInputs.name,
          group: selectedGroup.idGroup,
          id: allStudents.find((s) => s.name == studentInputs.oldName).idStudent,
        }),
      })
    }

    if (!res.ok) {
      setMessage({ err: true, message: 'Erro' })
      return
    }

    setMessage({ err: false, message: 'Sucesso' })

    // setTimeout(() => window.location.reload(), 1000)
  }

  return (
    <>
      <Button size="lg" onClick={handleClick} className="absolute top-2 left-4">
        Sair
      </Button>
      <div className="absolute flex gap-4 top-20 w-2/3 2xl:w-1/2 flex-col left-1/2 -translate-x-1/2">
        <div className="flex gap-4">
          <Select
            onValueChange={(e) => setSelectedGroup(groups.filter((g) => g.idGroup == Number(e))[0])}
            required
            name="group"
          >
            <SelectTrigger className="w-48 ">
              <SelectValue placeholder="Selecione a turma" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectGroup>
                <SelectLabel>Turmas</SelectLabel>
                {groups.map((group) => (
                  <SelectItem key={group.idGroup} value={group.idGroup.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Dialog>
            {selectedGroup?.idGroup && (
              <DialogTrigger
                onClick={() =>
                  setInputs({
                    acronym: selectedGroup.acronym,
                    name: selectedGroup.name,
                    post: false,
                  })
                }
                className={buttonVariants()}
              >
                Editar Turma
              </DialogTrigger>
            )}
            <DialogContent className="gap-6 p-8 w-[48rem]">
              <DialogHeader>
                <DialogTitle>Editar turma</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    value={inputs.name}
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value, post: false })}
                    required
                    id="name"
                    name="name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="acronym">Acrônimo</Label>
                  <Input
                    value={inputs.acronym}
                    type="acronym"
                    onChange={(e) => setInputs({ ...inputs, acronym: e.target.value, post: false })}
                    required
                    id="acronym"
                    name="acronym"
                  />
                </div>
                <div className={`${message.err ? 'text-red-700' : 'text-green-900'} font-bold`}>
                  {message.message}
                </div>
                <DialogFooter>
                  <Button size="lg">Salvar</Button>
                  <DialogClose
                    className={buttonVariants({
                      size: 'lg',
                      variant: 'destructive',
                      className: 'text-base font-medium',
                    })}
                  >
                    Voltar
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger
              onClick={() => setInputs({ acronym: '', name: '', post: true })}
              className={buttonVariants()}
            >
              Criar Turma
            </DialogTrigger>
            <DialogContent className="gap-6 p-8 w-[48rem]">
              <DialogHeader>
                <DialogTitle>Criar nova turma</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    value={inputs.name}
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value, post: true })}
                    required
                    id="name"
                    name="name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="acronym">Acrônimo</Label>
                  <Input
                    value={inputs.acronym}
                    type="acronym"
                    onChange={(e) => setInputs({ ...inputs, acronym: e.target.value, post: true })}
                    required
                    id="acronym"
                    name="acronym"
                  />
                </div>
                <div className={`${message.err ? 'text-red-700' : 'text-green-900'} font-bold`}>
                  {message.message}
                </div>
                <DialogFooter>
                  <Button size="lg">Criar</Button>
                  <DialogClose
                    className={buttonVariants({
                      size: 'lg',
                      variant: 'destructive',
                      className: 'text-base font-medium',
                    })}
                  >
                    Voltar
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog>
            {selectedGroup.idGroup && (
              <DialogTrigger
                onClick={() => setStudentInputs({ name: '', post: true })}
                className={buttonVariants()}
              >
                Criar Aluno
              </DialogTrigger>
            )}
            <DialogContent className="gap-6 p-8 w-[48rem]">
              <DialogHeader>
                <DialogTitle>Criar novo aluno</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitStudent} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    value={studentInputs.name}
                    onChange={(e) =>
                      setStudentInputs({ ...studentInputs, name: e.target.value, post: true })
                    }
                    required
                    id="name"
                    name="name"
                  />
                </div>
                <div className={`${message.err ? 'text-red-700' : 'text-green-900'} font-bold`}>
                  {message.message}
                </div>
                <DialogFooter>
                  <Button size="lg">Criar</Button>
                  <DialogClose
                    className={buttonVariants({
                      size: 'lg',
                      variant: 'destructive',
                      className: 'text-base font-medium',
                    })}
                  >
                    Voltar
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[20rem] 2xl:h-[28rem]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Nome</TableHead>
                <TableHead>Fase I</TableHead>
                <TableHead>Fase II</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.map((s) => (
                <TableRow key={s.studentName}>
                  <TableCell className="font-medium">{s.studentName}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>
                        <Button size="sm">Ver resultados</Button>
                      </DialogTrigger>
                      <DialogContent className="w-[800px]">
                        <DialogHeader>
                          <DialogTitle>Fase I - {s.studentName}</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[400px]">Elemento</TableHead>
                                <TableHead className="w-[250px]">Tentativas</TableHead>
                                <TableHead>Tempo</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {s?.phaseOne?.elements?.map((e: any) => (
                                <TableRow key={e.element}>
                                  <TableCell className="font-medium">{e.element}</TableCell>
                                  <TableCell>{e.tries}</TableCell>
                                  <TableCell>{e.time}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                        <DialogClose className="ml-auto">
                          <Button>Voltar</Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>
                        <Button size="sm">Ver resultados</Button>
                      </DialogTrigger>
                      <DialogContent className="w-[800px]">
                        <DialogHeader>
                          <DialogTitle>Fase I - {s.studentName}</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[400px]">Parte</TableHead>
                                <TableHead className="w-[250px]">Tentativas</TableHead>
                                <TableHead>Tempo</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {s.phaseTwo.parts?.map((e: any) => (
                                <TableRow key={e.part}>
                                  <TableCell className="font-medium">{e.part}</TableCell>
                                  <TableCell>{e.tries}</TableCell>
                                  <TableCell>{e.time}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                        <DialogClose className="ml-auto">
                          <Button>Voltar</Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          onClick={() =>
                            setStudentInputs({
                              name: s.studentName,
                              post: false,
                              oldName: s.studentName,
                            })
                          }
                          size="sm"
                        >
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="gap-6 p-8 w-[48rem]">
                        <DialogHeader>
                          <DialogTitle>Editar aluno | {s.studentName}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmitStudent} className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                              value={studentInputs.name}
                              onChange={(e) =>
                                setStudentInputs({
                                  ...studentInputs,
                                  name: e.target.value,
                                  post: false,
                                })
                              }
                              required
                              id="name"
                              name="name"
                            />
                          </div>
                          <div
                            className={`${message.err ? 'text-red-700' : 'text-green-900'} font-bold`}
                          >
                            {message.message}
                          </div>
                          <DialogFooter>
                            <Button size="lg">Salvar</Button>
                            <DialogClose
                              className={buttonVariants({
                                size: 'lg',
                                variant: 'destructive',
                                className: 'text-base font-medium',
                              })}
                            >
                              Voltar
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </>
  )
}
