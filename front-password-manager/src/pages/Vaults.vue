<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { api } from '@/api';
    import VaultItem from '../components/VaultItem.vue';

    import { Vault } from '@/types';

    const vaults = ref([] as Vault[]);
    // const loading = ref(true)

    onMounted(async () => {
        try {
            const { data } = await api.get('/vaults?populate=*');
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

<div class="grid grid-cols-4 gap-4">
    <VaultItem
        v-for="vault in vaults"
        :id="vault.id"
        :name="vault.name"
        :description="vault.description"
    />
</div>

</template>
