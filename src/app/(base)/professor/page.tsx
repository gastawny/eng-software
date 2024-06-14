// 'use client'

// import { Button, buttonVariants } from '@/components/ui/button'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { api } from '@/config/variables'
// import { useEffect, useState } from 'react'
// import { deleteCookie, getCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import Link from 'next/link'

// export default function TeacherPage() {
//   const router = useRouter()
//   const teacherId = getCookie('teacherId')
//   const [selectedGroup, setSelectedGroup] = useState({} as any)
//   const [groups, setGroups] = useState([])
//   const [students, setstudents] = useState([] as any[])
//   const [inputs, setInputs] = useState({ name: '', acronym: '', post: false })
//   const [error, setError] = useState('')

//   useEffect(() => {
//     if(!teacherId) router.push('/professor/login')

//     fetch(`${api}/group/${teacherId}`)
//       .then((response) => response.json())
//       .then((data) => setGroups(data))
    
//     // fetch(`${api}/report`)
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     setstudents(data)
//     //     console.log(data)
//     //   })
//   }, [])

//   function handleClick() {
//     deleteCookie('teacherFullName')
//     deleteCookie('teacherId')
//     deleteCookie('teacherUsername')

//     router.push('/')
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()

//     const res = await fetch(`${api}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username: inputs.username, password: inputs.password }),
//     })

//     if (!res.ok) {
//       setError('Erro ao logar')
//       return
//     }

//     const data = await res.json()
//   }

//   return (
//     <>
//       <Button onClick={handleClick} className='absolute top-2 left-64'>Sair</Button>
//       <div className="absolute flex gap-4 top-20 w-full">

//         <Select
//           onValueChange={(e) =>
//             setSelectedGroup(groups.filter((g) => g.idGroup == Number(e))[0])
//           }
//           required
//           name="group"
//         >
//           <SelectTrigger className="w-40 ">
//             <SelectValue placeholder="Selecione a turma" />
//           </SelectTrigger>
//           <SelectContent className="h-40">
//             <SelectGroup>
//               <SelectLabel>Turmas</SelectLabel>
//               {groups.map((group) => (
//                 <SelectItem key={group.idGroup} value={group.idGroup.toString()}>
//                   {group.name}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         <Dialog>
//           <DialogTrigger
//             className={buttonVariants()}
//           >
//             Criar Turma
//           </DialogTrigger>
//           <DialogContent className="gap-6 p-8 w-[48rem]">
//             <DialogHeader>
//               <DialogTitle>Criar nova turma</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="name">Nome</Label>
//                 <Input
//                   onChange={(e) => setInputs({ ...inputs, name: e.target.value, post: true})}
//                   required
//                   id="name"
//                   name="name"
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="acronym">Acrônimo</Label>
//                 <Input
//                   type='acronym'
//                   onChange={(e) => setInputs({ ...inputs, acronym: e.target.value, post: true})}
//                   required
//                   id="acronym"
//                   name="acronym"
//                 />
//               </div>
//               <div className="text-red-700 font-bold">{error}</div>
//               <Button>Criar</Button>
//             </form>
//             <DialogFooter>
//               <DialogClose
//                 className={buttonVariants({
//                   size: 'lg',
//                   variant: 'destructive',
//                   className: 'text-base font-medium',
//                 })}
//               >
//               Voltar
//               </DialogClose>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//         <Dialog>
//           <DialogTrigger
//             onClick={}
//             className={buttonVariants()}
//           >
//             Editar Turma
//           </DialogTrigger>
//           <DialogContent className="gap-6 p-8 w-[48rem]">
//             <DialogHeader>
//               <DialogTitle>Criar nova turma</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="name">Nome</Label>
//                 <Input
//                   onChange={(e) => setInputs({ ...inputs, name: e.target.value, post: true})}
//                   required
//                   id="name"
//                   name="name"
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="acronym">Acrônimo</Label>
//                 <Input
//                   type='acronym'
//                   onChange={(e) => setInputs({ ...inputs, acronym: e.target.value, post: true})}
//                   required
//                   id="acronym"
//                   name="acronym"
//                 />
//               </div>
//               <div className="text-red-700 font-bold">{error}</div>
//               <Button>Criar</Button>
//             </form>
//             <DialogFooter>
//               <DialogClose
//                 className={buttonVariants({
//                   size: 'lg',
//                   variant: 'destructive',
//                   className: 'text-base font-medium',
//                 })}
//               >
//               Voltar
//               </DialogClose>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
        
//         {/*  <Tabs defaultValue="students" className="w-[600px]">
//           <TabsList className="grid w-full grid-cols-2 g-4">
//             <TabsTrigger value="students">Estudantes</TabsTrigger>
//             <TabsTrigger value="groups">Turmas</TabsTrigger>
//           </TabsList>
//           <TabsContent value="students">
//             <ScrollArea className="h-[20rem] 2xl:h-[28rem]">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[400px]">Nome</TableHead>
//                     <TableHead>Fase I</TableHead>
//                     <TableHead>Fase II</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {students?.map((s) => (
//                     <TableRow key={s.studentName}>
//                       <TableCell className="font-medium">{s.studentName}</TableCell>
//                       <TableCell className="text-right">
//                         <Dialog>
//                           <DialogTrigger>
//                             <Button size="sm">Ver resultados</Button>
//                           </DialogTrigger>
//                           <DialogContent className="w-[800px]">
//                             <DialogHeader>
//                               <DialogTitle>Fase I - {s.studentName}</DialogTitle>
//                             </DialogHeader>
//                             <ScrollArea className="h-[500px] w-full rounded-md border p-4">
//                               <Table>
//                                 <TableHeader>
//                                   <TableRow>
//                                     <TableHead className="w-[400px]">Elemento</TableHead>
//                                     <TableHead className="w-[250px]">Tentativas</TableHead>
//                                     <TableHead>Tempo</TableHead>
//                                   </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                   {s?.phaseOne?.elements?.map((e: any) => (
//                                     <TableRow key={e.element}>
//                                       <TableCell className="font-medium">{e.element}</TableCell>
//                                       <TableCell>{e.tries}</TableCell>
//                                       <TableCell>{e.time}</TableCell>
//                                     </TableRow>
//                                   ))}
//                                 </TableBody>
//                               </Table>
//                             </ScrollArea>
//                             <DialogClose className="ml-auto">
//                               <Button>Voltar</Button>
//                             </DialogClose>
//                           </DialogContent>
//                         </Dialog>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <Dialog>
//                           <DialogTrigger>
//                             <Button size="sm">Ver resultados</Button>
//                           </DialogTrigger>
//                           <DialogContent className="w-[800px]">
//                             <DialogHeader>
//                               <DialogTitle>Fase I - {s.studentName}</DialogTitle>
//                             </DialogHeader>
//                             <ScrollArea className="h-[500px] w-full rounded-md border p-4">
//                               <Table>
//                                 <TableHeader>
//                                   <TableRow>
//                                     <TableHead className="w-[400px]">Parte</TableHead>
//                                     <TableHead className="w-[250px]">Tentativas</TableHead>
//                                     <TableHead>Tempo</TableHead>
//                                   </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                   {s.phaseTwo.parts?.map((e: any) => (
//                                     <TableRow key={e.part}>
//                                       <TableCell className="font-medium">{e.part}</TableCell>
//                                       <TableCell>{e.tries}</TableCell>
//                                       <TableCell>{e.time}</TableCell>
//                                     </TableRow>
//                                   ))}
//                                 </TableBody>
//                               </Table>
//                             </ScrollArea>
//                             <DialogClose className="ml-auto">
//                               <Button>Voltar</Button>
//                             </DialogClose>
//                           </DialogContent>
//                         </Dialog>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </ScrollArea>
//           </TabsContent>
//         </Tabs>*/}
//       </div> 
//     </>
//   )
// }

export default function A() {
  return <div>oi</div>
}