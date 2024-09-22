export type User = {
    id: number,
    username: string,
    role: Role,
    email: string
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
  vault: Vault
}

export type Vault = {
  id: number,
  name: string,
  description: string,
  // passwords: Password[]
}