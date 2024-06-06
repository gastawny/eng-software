'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function submit(form: FormData) {
  console.log(form.get('group'), form.get('student'))
  const cookiesStore = cookies()

  cookiesStore.set('group', `${form.get('group')}`)
  cookiesStore.set('student', `${form.get('student')}`)

  redirect('/fases')
}
