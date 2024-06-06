import { api } from '@/config/variables'
import { LoginScreen } from './screen'

export default async function LoginPage() {
  const [groups, students] = await Promise.all([
    fetch(`${api}/group`).then((res) => res.json()),
    fetch(`${api}/student`).then((res) => res.json()),
  ])

  return <LoginScreen groups={groups} students={students} />
}
