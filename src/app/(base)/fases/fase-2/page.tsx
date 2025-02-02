'use client'

import { Timer } from '@/components/Timer'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { api } from '@/config/variables'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Phase2Page() {
  const router = useRouter()
  const [questions, setQuestions] = useState([] as any[])
  const [seconds, setSeconds] = useState(0)
  const [click, setClick] = useState('')
  const [dialog, setDialog] = useState({ modal: false } as any)
  const [indexQuestion, setIndexQuestion] = useState(0)

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(
        `${api}/phases/render?phaseNumber=2&idTheme=${getCookie('theme')}&difficultyNumber=0`
      )
      setQuestions((await res.json()).phaseTwoExerciseDTOS)
    }

    fetchQuestions()
  }, [])

  async function handleClick(answerId: any) {
    const studentId = getCookie('student')

    const res = await fetch(`${api}/phase-two/answer/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answerId,
        seconds,
      }),
    })

    const data = await res.json()

    setClick('')

    if (!data) {
      setDialog({
        modal: true,
        error: true,
        message: 'Resposta errada. Tente novamente!',
      })
      return
    }

    setDialog({
      modal: true,
      error: false,
      message: 'Resposta correta!',
    })

    if (indexQuestion == questions.length - 1) {
      setDialog({
        modal: true,
        error: false,
        message: 'Parabéns! Você concluiu a fase II!',
      })
      setCookie('phase-2', true)
      setTimeout(() => {
        router.push('/fases')
      }, 5000)
    }

    setIndexQuestion(indexQuestion + 1)
  }

  function getTotalSeconds(totalSeconds: number) {
    setSeconds(totalSeconds)
  }

  function handlePhase() {
    if (indexQuestion == questions.length) router.push('/fases')
  }

  return (
    <div>
      <Dialog
        open={dialog.modal}
        onOpenChange={() => setDialog((curr) => ({ ...curr, modal: !curr.modal }))}
      >
        <DialogContent className="gap-6 p-8 w-[48rem] ">
          {click.length == 0 && (
            <div className="flex justify-center items-center flex-col gap-6">
              <p className="text-5xl font-bold text-center">{dialog.message}</p>
              <img className="h-24" src={`/assets/svgs/${dialog.error ? 'bad' : 'smile'}.svg`} />
            </div>
          )}
          {click.length > 0 && (
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-5xl text-center font-semibold">Sua resposta é:</p>
              <span className="text-6xl font-bold">{click}</span>
            </div>
          )}
          <DialogFooter>
            <DialogClose
              className={buttonVariants({
                size: 'lg',
                variant: click.length > 0 ? 'destructive' : 'default',
                className: 'text-base font-medium',
              })}
              onClick={click.length == 0 ? handlePhase : handleClick}
            >
              {click.length == 0 && 'Continuar'}
              {click.length > 0 && 'Voltar'}
            </DialogClose>
            {click.length > 0 && (
              <Button onClick={handleClick} size="lg">
                Confirmar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-3xl font-bold absolute left-1/2 top-4 2xl:top-8 -translate-x-1/2">
        Fase II
      </h1>
      <Timer getTotalSeconds={getTotalSeconds} />
      <div className="absolute left-1/2 top-20 2xl:top-32 -translate-x-1/2">
        <div className="flex flex-col gap-4">
          {questions[indexQuestion]?.statements?.map((question, index) => (
            <div
              className="bg-card min-w-[600px] shadow-lg py-2 2xl:py-4 px-4 2xl:px-6 rounded-xl flex items-center justify-between gap-8 2xl:gap-16"
              key={index}
            >
              <p className="text-xl font-semibold">{question}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex absolute left-1/2 bottom-10 2xl:bottom-24 -translate-x-1/2 w-4/5 gap-6 justify-between">
        {questions[indexQuestion]?.answers.map((option, index) => (
          <button
            onClick={() => handleClick(option.id)}
            key={index}
            className="flex items-center justify-center shadow-md hover:bg-primary/20 duration-150 bg-card min-w-28 px-4 h-28 rounded-xl"
          >
            <p className="text-2xl font-semibold">{option.description}</p>
          </button>
        ))}
      </div>
      <div className="absolute left-1/2 bottom-1 2xl:bottom-4 -translate-x-1/2 w-1/3 2xl:w-1/2 text-center">
        <Progress className="h-3 2xl:h-4" value={(indexQuestion / questions.length) * 100} />
        <p className="text-xl 2xl:mt-2">
          {((indexQuestion / questions.length) * 100).toFixed(0)}% completo
        </p>
      </div>
    </div>
  )
}
