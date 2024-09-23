<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Reactive state to track the current form
const isLoginForm = ref(true)

// Function to toggle the form
const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value
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
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full">
            Login
          </Button>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <a href="#" class="underline" @click.prevent="toggleForm">
              Sign up
            </a>
          </div>
        </template>
        <template v-else>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div class="grid gap-2">
              <Label for="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" />
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
        </template>
      </div>
    </CardContent>
  </Card>
</template>
