'use client'

import { Timer } from '@/components/Timer'
import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { api } from '@/config/variables'
import { setSound } from '@/utils/setSound'

function Ring({ className, id, item }: { className: string; id: string; item: any }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`w-36 2xl:w-44 h-36 2xl:h-44 rounded-full border-8 flex items-center justify-center ${className}`}
        >
          {item.id && (
            <Draggable draggableId={item.id} index={10}>
              {(provided) => (
                <img
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  src={item.src}
                ></img>
              )}
            </Draggable>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default function Phase1Page() {
  const router = useRouter()
  const [audio, setAudio] = useState<{src: HTMLAudioElement|null; time: number}>({src: null, time: 0})
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [rings, setRings] = useState([
    { id: '1', color: 'border-gray-100', item: {}, element: 'Ar', time: 11500 },
    { id: '2', color: 'border-yellow-400', item: {}, element: 'Luz', time: 12000 },
    { id: '3', color: 'border-yellow-800', item: {}, element: 'Terra', time: 13600 },
    { id: '4', color: 'border-red-600', item: {}, element: 'Calor', time: 18000 },
    { id: '5', color: 'border-blue-500', item: {}, element: 'Água', time: 10000 },
  ])
  const [items, setItems] = useState([
    {
      id: '1',
      src: '/assets/svgs/sun.svg',
      text: 'A luz é necessária para as plantas realizarem fotossíntese. Além de influenciar o crescimento e floração (fotoperiodismo) .',
      correctRing: '2',
      time: 3600
    },
    {
      id: '2',
      src: '/assets/svgs/thermometer.svg',
      text: 'O calor regula o crescimento da planta, com o aumento da temperatura a planta transpira mais (perde água), realiza mais fotossíntese e respiração.',
      correctRing: '4',
      time: 4200
    },
    {
      id: '3',
      src: '/assets/svgs/dust.svg',
      text: 'A terra fornece nutrientes necessários para o bom desenvolvimento da planta, conforme as necessidades de cada espécie vegetal. Além disso, o solo sustenta toda a estrutura vegetal.',
      correctRing: '3',
      time: 3500
    },
    {
      id: '4',
      src: '/assets/svgs/water.svg',
      text: 'A água é fundamental para o crescimento da planta, sendo utilizada para transportar os nutrientes por toda a estrutura através da seiva.',
      correctRing: '5',
      time: 3500
    },
    {
      id: '5',
      src: '/assets/svgs/wind.svg',
      text: 'O ar é necessário na planta para fornecer elementos que serão utilizados na fotossíntese e respiração',
      correctRing: '1',
      time: 3700
    },
  ])

  useEffect(() => {
    setAudio({src: new Audio('/assets/sounds/tutorial-fase1.ogg'), time: 22500})
  }, [])

  useEffect(() => {
    if (!audio.src) return

    setSound(audio.src, audio.time)

    return () => {
      audio.src?.pause()
    }
  }, [audio])

  async function onDragEnd(e: DropResult) {
    if (!e.destination) return

    const source = e.source.droppableId
    const destination = e.destination.droppableId

    if (source === destination) return

    const sourceItem = items.find((_, i) => i === e.source.index)

    if (!sourceItem) return

    const currentRing = rings.find((r) => r.id === destination)
    const correctRing = rings.find((r) => r.id === sourceItem.correctRing)

    if (currentRing?.item?.id || !correctRing) return

    await sendResult(currentRing!.element, correctRing.element)

    if (currentRing?.id != sourceItem.correctRing) {
      setWrongAnswer(true)
      setAudio({src: new Audio('/assets/sounds/fase1/fase1-resposta-errada.ogg'), time: 3000})

      return
    }

    setRings((rings) =>
      rings.map((r) => {
        if (r.id === destination) {
          return { ...r, item: sourceItem }
        }
        return r
      })
    )

    setItems((items) => items.filter((_, i) => i !== e.source.index))

    setCorrectAnswer(sourceItem.text)
    setAudio({src: new Audio(`/assets/sounds/fase1/fase1-resposta-correta-${correctRing.id}.ogg`), time: correctRing.time})
  }

  useEffect(() => {
    if((rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100 == 100) {
      setAudio({ src: new Audio('/assets/sounds/fase1/fase1-conclusao.ogg'), time: 3500 })
    }
  }, [rings])

  function getTotalSeconds(totalSeconds: number) {
    setSeconds(totalSeconds)
  }

  async function sendResult(answer: string, correctAnswer: string) {
    const student = getCookie('student')

    if (!student) return

    await fetch(`${api}/phase-one/answer/${student}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer, correctAnswer, seconds }),
    })
  }

  async function handleClick() {
    router.push('/fases')
  }

  function handleStopAudio() {
    audio.src?.pause()
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Dialog open={wrongAnswer} onOpenChange={setWrongAnswer}>
        <DialogContent className="gap-6 p-8 w-[48rem] ">
          <div className="flex justify-center items-center flex-col gap-6">
            <p className="text-5xl font-bold text-center">
              Resposta errada. <br /> Tente novamente!
            </p>
            <img src="/assets/svgs/bad.svg" />
          </div>
          <DialogFooter>
            <DialogClose
              className={buttonVariants({
                size: 'lg',
                className: 'text-base font-medium',
              })}
            >
              Voltar
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {correctAnswer.length > 0 && (
        <Dialog open={correctAnswer.length > 0}>
          <DialogContent className="gap-6 p-8 w-[48rem] ">
            <div className="flex justify-center items-center flex-col gap-6">
              <p className="text-4xl text-center">{correctAnswer}</p>
            </div>
            <DialogFooter>
              <DialogClose
                onClick={() => {
                  setCorrectAnswer('')
                  handleStopAudio()
                }}
                className={buttonVariants({
                  size: 'lg',
                  className: 'text-base font-medium',
                })}
              >
                Entendi!
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Dialog
        open={
          (rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100 == 100
        }
      >
        <DialogContent className="gap-6 p-8 w-[60rem] ">
          <div className="flex justify-center items-center flex-col gap-6 text-4xl text-center">
            <p className="">Parabéns!</p>
            <p>Você concluiu a Fase I: Crescendo</p>
            <p>Volte para a tela de seleção de fases para continuar.</p>
          </div>
          <DialogFooter>
            <DialogClose
              onClick={handleClick}
              className={buttonVariants({
                size: 'lg',
                className: 'text-base font-medium',
              })}
            >
              Voltar
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Timer getTotalSeconds={getTotalSeconds} />
      <div className="max-h-screen w-screen flex gap-60 2xl:gap-96">
        <h1 className="text-3xl font-bold absolute left-1/2 top-4 2xl:top-8 -translate-x-1/2">
          Fase I: Crescendo
        </h1>
        <Droppable droppableId={'0'}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={'bg-green-800 w-96 flex justify-center gap-4 items-center flex-wrap'}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <img
                      onMouseEnter={() => setAudio({src: new Audio(`/assets/sounds/fase1/fase1-arrastar-${item.id}.ogg`), time: item.time})}
                      onMouseLeave={handleStopAudio}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      src={item.src}
                      className="h-40"
                    ></img>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="flex gap-4 items-center">
          <div className="flex h-full 2xl:h-3/4 flex-wrap flex-col gap-8 justify-center">
            {rings.map((r, i) => (
              <Ring key={r.id} id={r.id} className={r.color} item={rings[i].item} />
            ))}
          </div>
        </div>
        <img
          src={`/assets/svgs/${(rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100}.svg`}
          className="h-64 2xl:h-80 absolute top-1/2 -translate-y-1/2 right-4 2xl:right-8"
        />
        <div className="absolute left-1/2 bottom-1 2xl:bottom-4 -translate-x-1/2 w-1/3 2xl:w-1/2 text-center">
          <Progress
            className="h-3 2xl:h-4"
            value={(rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100}
          />
          <p className="text-xl 2xl:mt-2">
            {(rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100}%
            completo
          </p>
        </div>
      </div>
    </DragDropContext>
  )
}
