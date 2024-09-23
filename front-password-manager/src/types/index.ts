export type User = {
  id: number,
  username: string,
  role: Role,
  email: string,
  documentId: string
}

type Role = {
  name: string
}

export interface ApplicationError {
  error: {
    name: string,
    message: string,
  }
}

export type Password = {
  id: number,
  name: string,
  value: string,
  isPublic: boolean,
  vault: Vault
}

export type Vault = {
  id: number,
  name: string,
  isPublic: boolean,
  description: string,
  user: User
}