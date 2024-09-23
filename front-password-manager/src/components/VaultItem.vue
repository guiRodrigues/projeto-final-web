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
import {LockKeyhole, LockKeyholeOpen} from "lucide-vue-next";

defineProps<Password>()
</script>

<template>
  <Card class='m-3 vault-card'>
    <CardHeader>
      <CardTitle class="flex items-center">
        <LockKeyholeOpen v-if="isPublic" class="m-2" />
        <LockKeyhole v-else class="m-2" />
        <span>{{ name }}</span>
      </CardTitle>
      <CardDescription>Created by Guilherme</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div>
        <div class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-4 last:mb-0 last:pb-0">
          <div>
            <p>{{ value }}</p>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        <Check class="mr-2 h-4 w-4" /> Update vault
      </Button>
    </CardFooter>
  </Card>
</template>

<style>
.vault-card {
    background-color: #E4E1F7;
}
</style>