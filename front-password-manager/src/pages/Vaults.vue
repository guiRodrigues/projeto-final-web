<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { api } from '@/api';
import VaultItem from '../components/VaultItem.vue';
import VaultForm from "@/components/VaultForm.vue";
import { useUserStore } from "@/store/userStore.ts";
import { Vault } from '@/types';

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);

const vaults = ref<Vault[]>([]);

async function loadVaults() {
  try {
    const url = isAuthenticated.value 
      ? '/vaults?populate=*' 
      : '/vaults?filters[isPublic][$eq]=true&populate=*';
    const { data } = await api.get(url);
    vaults.value = data.data;
  } catch (error) {
    console.error('Error loading vaults:', error);
  }
}

onMounted(loadVaults);

</script>

<template>
  <VaultForm v-if="isAuthenticated" @vaultCreated="loadVaults" />

  <div class="w-4/5 mx-auto mt-10 mb-12 grid grid-cols-4 gap-4">
    <VaultItem
      v-for="vault in vaults"
      :key="vault.id"
      :id="vault.id"
      :name="vault.name"
      :is-public="vault.isPublic"
      :description="vault.description"
      :user="vault.user"
      :document-id="vault.documentId"
      @vaultDeleted="loadVaults"
    />
  </div>
</template>
