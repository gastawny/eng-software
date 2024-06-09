'use client'

import { useState, useEffect } from 'react'

export function Timer({ getTotalSeconds }: { getTotalSeconds: (totalSeconds: number) => void }) {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer = setInterval(() => {}, 0)

    if (isRunning) {
      timer = setInterval(() => {
        setTotalSeconds(totalSeconds + 1)
      }, 1000)
    } else {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isRunning, totalSeconds])

  const startTimer = () => {
    setIsRunning(true)
  }

  useEffect(() => {
    startTimer()
  }, [])

  useEffect(() => {
    getTotalSeconds(totalSeconds)
  }, [totalSeconds])

  const stopTimer = () => {
    setIsRunning(false)
  }

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return (
    <div className="rounded-md p-4 flex items-center justify-center w-40 text-xl gap-2 absolute top-0 right-0">
      <div className="text-center text-4xl">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <button
        onClick={isRunning ? stopTimer : startTimer}
        className="flex justify-center items-center duration-300 hover:text-primary"
      >
        {isRunning && <img className="h-8" src="/assets/svgs/pause.svg" />}
        {!isRunning && <img className="h-6 text-black" src="/assets/svgs/play.svg" />}
      </button>
    </div>
  )
}
