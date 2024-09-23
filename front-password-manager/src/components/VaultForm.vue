<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/api';
import { useUserStore } from '../store/userStore';
import { isAxiosError } from 'axios';
import { isApplicationError } from '@/composables/useApplicationError';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Vault} from "lucide-vue-next";

const vaultName = ref('');
const vaultDescription = ref('');
const isPublic = ref('false');
const feedback = ref('');
const error = ref<ApplicationError | null>(null);
const loading = ref(false);

const userStore = useUserStore();

async function createVault() {
  if (!vaultName.value || !vaultDescription.value) {
    feedback.value = 'All fields are required.';
    return;
  }

  loading.value = true;
  feedback.value = '';
  error.value = null;

  const payload = {
    data: {
      name: vaultName.value,
      description: vaultDescription.value,
      isPublic: isPublic.value === 'true',
    },
  };

  try {
    const { data } = await api.post('/vaults', payload, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    });

    console.log(data.data);
    feedback.value = 'Vault created successfully.';
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data;
      feedback.value = error.value.error.message;
    } else {
      feedback.value = 'An unexpected error occurred.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Card class="w-4/5 mx-auto mt-10 mb-12">
    <CardHeader>
      <CardTitle class="flex items-center"><Vault class="mr-1.5" /> Create a new Vault</CardTitle>
      <CardDescription class="mt-2 mb-4">Organize your passwords in a secure vault!</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="createVault" class="flex items-start gap-x-4">
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="vault-name">Vault Name</Label>
          <Input v-model="vaultName" id="vault-name" placeholder="Enter vault name" required />
        </div>
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="vault-description">Vault Description</Label>
          <Input v-model="vaultDescription" id="vault-description" placeholder="Enter vault description" required />
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
