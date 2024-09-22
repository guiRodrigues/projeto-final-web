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

defineProps<Password>()
</script>

<template>
  <Card class='m-3 password-card'>
    <CardHeader>
      <CardTitle>{{ name }}</CardTitle>
      <CardDescription>From the vault <span class="font-bold italic">{{ vault.name }}</span> </CardDescription>
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
        <Check class="mr-2 h-4 w-4" /> Update password
      </Button>
    </CardFooter>
  </Card>
</template>

<style>
.password-card {
    background-color: #EBF8E5;
}
</style>