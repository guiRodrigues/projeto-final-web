<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { api } from '@/api';
    import PasswordItem from '../components/PasswordItem.vue';

    import { Password } from '@/types';

    const passwords = ref([] as Password[]);
    // const loading = ref(true)

    onMounted(async () => {
        try {
            const { data } = await api.get('/passwords?populate=*');
            passwords.value = data.data;

            console.log(passwords)
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
<h1>PASSWORDS</h1>

<div class="grid grid-cols-4 gap-4">
    <PasswordItem
        v-for="password in passwords"
        :id="password.id"
        :name="password.name"
        :value="password.value"
        :is-public="password.isPublic"
        :vault="password.vault"
    />
</div>

</template>
