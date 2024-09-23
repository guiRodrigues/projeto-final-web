<script setup lang="ts">
import type { Vault } from '../types';

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {LockKeyhole, LockKeyholeOpen} from "lucide-vue-next";

defineProps<Vault>()
</script>

<template>
  <Card class='m-3 vault-card'>
    <CardHeader>
      <CardTitle class="text-lg flex items-center">
        <LockKeyholeOpen v-if="isPublic" class="m-2" />
        <LockKeyhole v-else class="m-2" />
        <span class="font-semibold">{{ name }}</span>
      </CardTitle>
      <CardDescription>Created by {{ user?.username || "USER" }}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button class="w-full">
        Delete vault
      </Button>
    </CardFooter>
  </Card>
</template>

<style>
.vault-card {
    background-color: #E4E1F7;
}
</style>