<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Password } from '../types';
import { useUserStore } from '../store/userStore';
import { api } from '@/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LockKeyhole, LockKeyholeOpen } from 'lucide-vue-next';

const userStore = useUserStore();
const emit = defineEmits(['passwordDeleted']);

async function removePassword(id: string) {
  try {
    await api.delete(`/passwords/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    });
    emit('passwordDeleted');
  } catch (e) {
    console.error('Error deleting password:', e);
  }
}

defineProps<Password>();
</script>

<template>
  <Card class="password-card">
    <CardHeader>
      <CardTitle class="text-lg flex items-center">
        <LockKeyholeOpen v-if="isPublic" class="m-2" />
        <LockKeyhole v-else class="m-2" />
        <span class="font-semibold">{{ name }}</span>
      </CardTitle>
      <CardDescription>
        From the vault <span class="font-bold italic">{{ vault.name }}</span>
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div>
        <div class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-4 last:mb-0 last:pb-0">
          <div>
            <p class="password">{{ value }}</p>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full" @click="removePassword(documentId)">
        Delete password
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped>
.password-card {
  background-color: #ebf8e5;
}

.password {
  font-family: 'Space Mono', monospace;
  font-weight: 400;
  font-style: normal;
}
</style>
