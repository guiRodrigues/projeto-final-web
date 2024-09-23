<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api' 
import { useUserStore } from '../store/userStore'
import { isAxiosError } from 'axios'
import { isApplicationError } from '../composables/useApplicationError'
import type { ApplicationError } from '../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const isLoginForm = ref(true)
const identifier = ref('')
const password = ref('')
const username = ref('')
const signUpEmail = ref('')
const signUpPassword = ref('')
const loading = ref(false)
const exception = ref<ApplicationError>()
const router = useRouter()
const userStore = useUserStore()

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value
}

const handleError = (e: unknown) => {
  if (isAxiosError(e) && isApplicationError(e.response?.data)) {
    exception.value = e.response?.data
  }
}

const authenticateUser = async (jwt: string) => {
  const res = await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    params: {
      populate: 'role'
    }
  })

  const role = res.data.role.type
  userStore.authenticaded(res.data, jwt)

  if (role === 'Adminstrator' || role === 'Authenticated') {
    router.push('/account')
  } else {
    router.push('/')
  }
}

const authenticate = async () => {
  try {
    loading.value = true
    exception.value = undefined
    const { data } = await api.post('/auth/local', {
      identifier: identifier.value,
      password: password.value
    })
    await authenticateUser(data.jwt)
  } catch (e) {
    handleError(e)
  } finally {
    loading.value = false
  }
}

const createAccount = async () => {
  try {
    loading.value = true
    exception.value = undefined
    await api.post('/auth/local/register', {
      email: signUpEmail.value,
      password: signUpPassword.value,
      username: username.value
    })

    identifier.value = signUpEmail.value
    password.value = signUpPassword.value

    await authenticate()
  } catch (e) {
    handleError(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card class="mx-auto max-w-sm mt-8">
    <CardHeader>
      <CardTitle class="text-2xl">
        {{ isLoginForm ? 'Login' : 'Sign Up' }}
      </CardTitle>
      <CardDescription>
        {{ isLoginForm ? 'Enter your email below to login to your account' : 'Enter your information to create an account' }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <template v-if="isLoginForm">
          <div v-if="exception" class="alert alert-danger" role="alert">
            {{ exception.error.message }}
          </div>
          <div v-if="loading" class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <form v-else @submit.prevent="authenticate">
            <div class="grid gap-2 mb-4">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                v-model="identifier"
                required
              />
            </div>
            <div class="grid gap-2 mb-4">
              <div class="flex items-center">
                <Label for="password">Password</Label>
              </div>
              <Input id="password" type="password" v-model="password" required />
            </div>
            <Button type="submit" class="w-full mb-4">
              Login
            </Button>
            <div class="mt-4 text-center text-sm">
              Don't have an account?
              <a href="#" class="underline" @click.prevent="toggleForm">
                Sign up
              </a>
            </div>
          </form>
        </template>
        <template v-else>
          <div v-if="exception" class="alert alert-danger" role="alert">
            {{ exception.error.message }}
          </div>
          <div v-if="loading" class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <form v-else @submit.prevent="createAccount">
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input id="username" placeholder="Max" v-model="username" required />
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                v-model="signUpEmail"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" v-model="signUpPassword" required />
            </div>
            <Button type="submit" class="w-full">
              Create an account
            </Button>
            <div class="mt-4 text-center text-sm">
              Already have an account?
              <a href="#" class="underline" @click.prevent="toggleForm">
                Sign in
              </a>
            </div>
          </form>
        </template>
      </div>
    </CardContent>
  </Card>
</template>
