'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function submit(form: FormData) {
  console.log(form.get('group'), form.get('student'))
  const cookiesStore = cookies()

  cookiesStore.delete('phase-1')
  cookiesStore.delete('phase-2')

  cookiesStore.set('student', `${form.get('student')}`)

  redirect('/fases')
}
