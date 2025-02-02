'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative h-screen w-screen flex justify-center items-center">
      <h1 className="absolute top-8 text-center text-4xl font-bold">SuperQuiz</h1>
      <Card>
        <CardContent className="flex flex-col gap-4 items-center w-[28rem] 2xl:w-[40rem]">
          <Button variant="ghost" asChild className="w-full text-2xl py-6">
            <Link href="/login">
              <div className="flex gap-4 items-center">
                <span>Iniciar</span>
                <img className="h-5" src="/assets/svgs/play.svg" />
              </div>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="w-full text-2xl py-6">
            <Link href="/professor/login">
              <div className="flex gap-3 items-center">
                <span>Professor</span>
                <img className="h-5" src="/assets/svgs/teacher.svg" />
              </div>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
