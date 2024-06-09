'use client'

import { Button } from '@/components/ui/button'
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { api } from '@/config/variables'
import { useEffect, useState } from 'react'

export default function TeacherPage() {
  const [students, setstudents] = useState([] as any[])

  useEffect(() => {
    fetch(`${api}/report`)
      .then((response) => response.json())
      .then((data) => {
        setstudents(data)
        console.log(data)
      })
  }, [])

  return (
    <div className="absolute flex justify-center items-center top-12 h-[calc(100vh-3rem)] w-full bg-green-300">
      <Tabs defaultValue="students" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="students">Estudantes</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
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
                {students.map((s) => (
                  <TableRow key={s.studentName}>
                    <TableCell className="font-medium">{s.studentName}</TableCell>
                    <TableCell className="text-right">
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
                                {s.phaseOne.elements.map((e: any) => (
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
                    <TableCell className="text-right">
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
