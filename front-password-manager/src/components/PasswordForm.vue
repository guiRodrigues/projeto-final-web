<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import { useUserStore } from '../store/userStore'
import { isAxiosError } from 'axios'
import { isApplicationError } from '@/composables/useApplicationError'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const vaults = ref([])
const passName = ref('')
const passValue = ref('')
const isPublic = ref('false')
const selectedVault = ref('')
const loading = ref(false)
const feedback = ref('')
const error = ref<ApplicationError | null>(null)

const userStore = useUserStore()

async function createPassword() {
  if (!passName.value || !passValue.value || !selectedVault.value) {
    feedback.value = 'All fields are required.'
    return
  }

  loading.value = true
  feedback.value = ''
  error.value = null

  const vault = vaults.value.find(vault => vault.id === selectedVault.value) || null;

  const payload = {
    data: {
      name: passName.value,
      value: passValue.value,
      isPublic: isPublic.value === 'true',
      vault: {
        connect: [vault.documentId]
      }
    },
  }

  try {
    const { data } = await api.post('/passwords', payload, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    })

    console.log(data.data)
    feedback.value = 'Password created successfully.'
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    } else {
      feedback.value = 'An unexpected error occurred.'
    }
  } finally {
    loading.value = false
  }
}

async function fetchVaults() {
  try {
    const { data } = await api.get('/vaults', {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    })
    vaults.value = data.data
  } catch (e) {
    console.error('Failed to fetch vaults', e)
  }
}

onMounted(() => {
  fetchVaults()
})
</script>

<template>
  <Card class="w-4/5 mx-auto mt-10 mb-12">
    <CardHeader>
      <CardTitle>Create a new Password</CardTitle>
      <CardDescription>Save it here so you can easily find it later!</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="createPassword" class="flex items-start gap-x-4">
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="name">Name</Label>
          <Input v-model="passName" id="name" placeholder="A nice identifier" required />
        </div>
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="password">Password value</Label>
          <Input v-model="passValue" id="password" placeholder="Your awesome password" required />
        </div>
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="is-public">Is public?</Label>
          <Select v-model="isPublic">
            <SelectTrigger id="is-public">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="false">False</SelectItem>
              <SelectItem value="true">True</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="vault">Vault</Label>
          <Select v-model="selectedVault" required>
            <SelectTrigger id="vault">
              <SelectValue placeholder="Select a vault" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem v-for="vault in vaults" :key="vault.id" :value="vault.id">
                {{ vault.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="self-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div
          v-if="feedback"
          class="col-12 alert alert-dismissible fade show"
          :class="{ 'alert-danger': error, 'alert-success': !error }"
          role="alert"
      >
        {{ feedback }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </CardContent>
  </Card>
</template>

