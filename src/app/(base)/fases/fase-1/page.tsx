'use client'

import { Timer } from '@/components/Timer'
import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'
import { api } from '@/config/variables'

function Ring({ hex, id, item }: { hex: string; id: string; item: any }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={
            'w-36 2xl:w-40 h-36 2xl:h-40 rounded-full border-8 flex items-center justify-center'
          }
          style={{ borderColor: hex }}
        >
          {item.id && (
            <Draggable draggableId={item.id} index={10}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  className="text-3xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.word}
                </div>
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
  const [difficultyNumber, setDifficultyNumber] = useState(1)
  const [totalDifficulties, setTotalDifficulties] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [finish, setFinish] = useState(false)
  const [rings, setRings] = useState([] as any)
  const [items, setItems] = useState([] as any)
  const [colors, setColors] = useState([] as any)

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

    await sendResult(sourceItem, currentRing.hex)

    if (currentRing?.id != sourceItem.correctRing) {
      setWrongAnswer(true)

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
  }

  function handlePhase() {
    if ((rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100 == 100) {
      if (totalDifficulties > difficultyNumber) {
        setDifficultyNumber(difficultyNumber + 1)
      } else {
        setFinish(true)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [difficultyNumber])

  function getTotalSeconds(totalSeconds: number) {
    setSeconds(totalSeconds)
  }

  async function sendResult(item, color) {
    const student = getCookie('student')

    if (!student) return

    await fetch(`${api}/phase-one/answer/${student}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phaseOneId: item.phaseOneId,
        idColor: colors.find((c) => c.hex === color).id,
        seconds,
      }),
    })
  }

  async function handleClick() {
    setCookie('phase-1', true)
    router.push('/fases')
  }

  async function fetchData() {
    const res = await fetch(
      `${api}/phases/render?phaseNumber=1&idTheme=${getCookie('theme')}&difficultyNumber=${difficultyNumber}`
    )
    const data = await res.json()

    setRings(
      data.colors.map((c, i) => ({ id: `${i + 1}`, color: `border-[${[c]}]`, item: {}, hex: c }))
    )

    setTotalDifficulties(data.totalDifficulties)

    setItems(
      data.phaseOneWordsDTOS.map((obj, i) => ({
        id: `${i + 1}`,
        text: obj.description,
        correctRing: `${i + 1}`,
        color: obj.color,
        word: obj.word,
        phaseOneId: obj.phaseOneId,
      }))
    )
  }

  useEffect(() => {
    fetchData()
    ;(async () => {
      setColors(await fetch(`${api}/phases/colors`).then((res) => res.json()))
    })()
  }, [])

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
                  handlePhase()
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
      <Dialog open={finish}>
        <DialogContent className="gap-6 p-8 w-[60rem] ">
          <div className="flex justify-center items-center flex-col gap-6 text-4xl text-center">
            <p className="">Parabéns!</p>
            <p>Você concluiu a Fase I</p>
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
      <div className="max-h-screen w-screen flex gap-52 2xl:gap-80">
        <h1 className="text-3xl font-bold absolute left-1/2 top-4 2xl:top-8 -translate-x-1/2">
          Fase I
        </h1>
        <Droppable droppableId={'0'}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={
                'bg-green-800 w-96 flex justify-center gap-8 items-center flex-wrap h-screen'
              }
            >
              {items.map((item, index) => (
                <div key={item.id} style={{ color: item.color, zIndex: '0' }}>
                  <Draggable draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="text-3xl font-bold"
                      >
                        {item.word}
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="flex gap-4 items-center">
          <div className="flex h-full 2xl:h-3/4 flex-wrap flex-col gap-5 2xl:gap-8 justify-center">
            {rings.map((r, i) => (
              <Ring key={r.id} id={r.id} hex={r.hex} item={rings[i].item} />
            ))}
          </div>
        </div>
        <div className="absolute left-1/2 bottom-1 2xl:bottom-4 -translate-x-1/2 w-1/3 2xl:w-1/2 text-center">
          <Progress
            className="h-3 2xl:h-4"
            value={(rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100}
          />
          <p className="text-xl 2xl:mt-2">
            {(
              (rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) *
              100
            ).toFixed(0)}
            % completo
          </p>
        </div>
      </div>
    </DragDropContext>
  )
}
