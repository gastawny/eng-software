export interface Student {
  idStudent: number
  name: string
  group: {
    idGroup: number
    name: string
    acronym: string
    teacher: {
      idUser: number
      username: string
      email: string
      fullName: string
      roles: string[]
    }
  }
}
