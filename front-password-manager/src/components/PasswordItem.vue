<script setup lang="ts">
import type { Password } from '../types';

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LockKeyhole, LockKeyholeOpen } from "lucide-vue-next";

defineProps<Password>()
</script>

<template>
  <Card class='password-card'>
    <CardHeader>
      <CardTitle class="flex items-center">
        <LockKeyholeOpen v-if="isPublic" class="m-2" />
        <LockKeyhole v-else class="m-2" />
        <span>{{ name }}</span>
      </CardTitle>
      <CardDescription>From the vault <span class="font-bold italic">{{ vault.name }}</span> </CardDescription>
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
      <Button class="w-full">
        Update password
      </Button>
    </CardFooter>
  </Card>
</template>

<style>
.password-card {
    background-color: #EBF8E5;
}

.password {
    font-family: "Space Mono", monospace;
    font-weight: 400;
    font-style: normal;
}
</style>