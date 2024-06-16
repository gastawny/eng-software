'use client'

import { Timer } from '@/components/Timer'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { api } from '@/config/variables'
import { setSound } from '@/utils/setSound'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Phase2Page() {
  const router = useRouter()
  const [deuCerto, setDeuCerto] = useState(false)
  const [questions, setQuestions] = useState([] as any[])
  const [seconds, setSeconds] = useState(0)
  const [click, setClick] = useState('')
  const [dialog, setDialog] = useState({ modal: false } as any)
  const [audio, setAudio] = useState<{ src: HTMLAudioElement | null; time: number }>({
    src: null,
    time: 0,
  })
  const [options] = useState([
    {
      label: 'Flor',
    },
    {
      label: 'Folha',
    },
    {
      label: 'Fruto',
    },
    {
      label: 'Raíz',
    },
    {
      label: 'Caule',
    },
    {
      label: 'Semente',
    },
  ])
  const [indexQuestion, setIndexQuestion] = useState(0)

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`${api}/phase-two/questions`)
      const data = await response.json()

      const constant = Math.random() > 0.5 ? 2 : 1

      const randomNumbers = [] as number[]

      while (randomNumbers.length < 3) {
        const random = Math.floor(Math.random() * 6) + 1
        if (!randomNumbers.includes(random)) {
          randomNumbers.push(random)
        }
      }

      randomNumbers.forEach((_, i) => (randomNumbers[i] = randomNumbers[i] * constant))

      const questions = data.filter((_, i) => randomNumbers.includes(i + 1))

      setQuestions(questions)
    }

    setAudio({ src: new Audio('/assets/sounds/tutorial-fase2.ogg'), time: 22500 })

    fetchQuestions()
  }, [])

  useEffect(() => {
    if (!audio.src) return

    setSound(audio.src, audio.time)

    return () => {
      audio.src?.pause()
    }
  }, [audio])

  useEffect(() => {
    if (deuCerto)
      setAudio({ src: new Audio('/assets/sounds/fase2/conclusao-fase2.ogg'), time: 4800 })
  }, [deuCerto])

  async function handleClick(option: string) {
    const studentId = getCookie('student')
    await fetch(`${api}/phase-two/answer/${studentId}/${questions[indexQuestion].id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: click,
        correctAnswer: questions[indexQuestion].answer,
        seconds: seconds,
      }),
    })

    setClick('')
    if (option != questions[indexQuestion].answer) {
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

    setAudio({ src: new Audio('/assets/sounds/fase2/acertou.ogg'), time: 2600 })

    if (indexQuestion == 2) {
      setDialog({
        modal: true,
        error: false,
        message: 'Parabéns! Você concluiu a fase II!',
      })
      setDeuCerto(true)
      setTimeout(() => {
        setCookie('phase-2', true)
        router.push('/fases')
      }, 5000)
    }

    setIndexQuestion(indexQuestion + 1)
  }

  useEffect(() => {
    if (dialog.modal && dialog.error) {
      setAudio({ src: new Audio('/assets/sounds/fase2/resposta-errada.ogg'), time: 3500 })
    }
  }, [dialog])

  function getTotalSeconds(totalSeconds: number) {
    setSeconds(totalSeconds)
  }

  function handlePhase() {
    if (indexQuestion == 3) router.push('/fases')
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
        Fase II: Sobre mim
      </h1>
      <Timer getTotalSeconds={getTotalSeconds} />
      <div className="absolute left-1/2 top-20 2xl:top-32 -translate-x-1/2">
        <div className="flex flex-col gap-4">
          {questions[indexQuestion]?.statement?.map((question, index) => (
            <div
              className="bg-card shadow-lg py-2 2xl:py-4 px-4 2xl:px-6 rounded-xl flex items-center justify-between gap-8 2xl:gap-16"
              key={index}
            >
              <p className="text-xl font-semibold">
                {question.statementDescription.charAt(0).toUpperCase() +
                  question.statementDescription.slice(1)}
              </p>
              <button
                onClick={() =>
                  setAudio({
                    src: new Audio(`/assets/sounds/fase2/opcoes/${question.id}.ogg`),
                    time: 5000,
                  })
                }
                className="hover:bg-primary/80 duration-150 bg-primary/50 p-4 rounded-xl"
              >
                <img className="h-8" src="/assets/svgs/audio.svg" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex absolute left-1/2 bottom-10 2xl:bottom-32 -translate-x-1/2 w-4/5 gap-6 justify-between">
        {options.map((option, index) => (
          <button
            onClick={() => handleClick(option.label)}
            key={index}
            className="flex flex-col shadow-md hover:bg-primary/20 duration-150 bg-card py-4 2xl:py-6 px-8 2xl:px-12 rounded-xl items-center justify-between gap-4 2xl:gap-6"
          >
            <p className="text-xl font-semibold">{option.label}</p>
            <div className="bg-primary/50 p-4 rounded-xl">
              <img
                className="w-10 2xl:w-16 h-10 2xl:h-16"
                src={`/assets/svgs/${option.label}.svg`}
              />
            </div>
          </button>
        ))}
      </div>
      <div className="absolute left-1/2 bottom-1 2xl:bottom-4 -translate-x-1/2 w-1/3 2xl:w-1/2 text-center">
        <Progress className="h-3 2xl:h-4" value={(indexQuestion / 3) * 100} />
        <p className="text-xl 2xl:mt-2">{((indexQuestion / 3) * 100).toFixed(0)}% completo</p>
      </div>
    </div>
  )
}
