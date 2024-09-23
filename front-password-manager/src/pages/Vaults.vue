<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
    import { api } from '@/api';
    import VaultItem from '../components/VaultItem.vue';

    import { Vault } from '@/types';
    import PasswordItem from "@/components/PasswordItem.vue";
    import VaultForm from "@/components/VaultForm.vue";
    import {useUserStore} from "@/store/userStore.ts";

    const userStore = useUserStore();
    const isAuthenticated = computed(() => userStore.isAuthenticated);

    const vaults = ref([] as Vault[]);
    // const loading = ref(true)
    onMounted(async () => {
      try {
        const url = !isAuthenticated.value ? '/vaults?filters[isPublic][$eq]=true&populate=*' : '/vaults?populate=*';
        const { data } = await api.get(url);
        vaults.value = data.data;
      } catch (e) {
        // if (isAxiosError(e) && isApplicationError(e.response?.data)) {
        // exception.value = e.response?.data
        // }
      } finally {
        // loading.value = false
      }
    });

</script>

<template>
<h1>COFRES</h1>

<VaultForm v-if="isAuthenticated" />

<div class="w-4/5 mx-auto mt-10 mb-12 grid grid-cols-4 gap-4">
    <VaultItem
        v-for="vault in vaults"
        :id="vault.id"
        :name="vault.name"
        :is-public="vault.isPublic"
        :description="vault.description"
    />
</div>

</template>
