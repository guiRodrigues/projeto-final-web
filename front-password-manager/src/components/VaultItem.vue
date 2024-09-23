<script setup lang="ts">
import type { Vault } from '../types';
import { useUserStore } from '../store/userStore';
import { defineProps, defineEmits } from 'vue';
import { api } from '@/api';

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleAlert } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {LockKeyhole, LockKeyholeOpen} from "lucide-vue-next";

const userStore = useUserStore();
const emit = defineEmits(['vaultDeleted']);

async function removeVault(id: string) {
  try {
    await api.delete(`/vaults/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    });
    emit('vaultDeleted');
  } catch (e) {
    console.error('Error deleting vault:', e);
  }
}

defineProps<Vault>()
</script>

<template>
  <Card class="m-3 vault-card flex flex-col h-full">
    <CardHeader>
      <CardTitle class="text-lg flex items-center">
        <LockKeyholeOpen v-if="isPublic" class="m-2" />
        <LockKeyhole v-else class="m-2" />
        <span class="font-semibold">{{ name }}</span>
      </CardTitle>
      <CardDescription>Created by {{ user?.username || "USER" }}</CardDescription>
    </CardHeader>
    <CardContent class="flex-grow">
      <!-- Add any content here if needed -->
    </CardContent>
    <CardFooter class="mt-auto">
      <Button v-if="passwords.length === 0" class="w-full" @click="removeVault(documentId)">
        Delete vault
      </Button>
      <Alert v-else>
        <AlertDescription>
          You can only delete empty Vaults...
        </AlertDescription>
      </Alert>
    </CardFooter>
  </Card>
</template>

<style>
.vault-card {
    background-color: #E4E1F7;
}
</style>