<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { api } from '../api';
    import { useRoute } from 'vue-router';
    import { useUserStore } from '../store/userStore';

    import type { ApplicationError, User } from '../types';

    const route = useRoute();

    const users = ref([] as User[]);
    const loading = ref(true)
    const exception = ref<ApplicationError>()

    const userStore = useUserStore()

    // const mangaToDelete = ref<Manga | undefined>(undefined)

    onMounted(async () => {
        try {
            const { data } = await api.get('/users?populate=email&sort[0]=number');
            console.log(data);
            users.value = data.data;
            
        } catch (e) {
            // if (isAxiosError(e) && isApplicationError(e.response?.data)) {
            // exception.value = e.response?.data
            // }
        } finally {
            loading.value = false
        }
    });
</script>

<template>
  <h1>Users Management</h1>
</template>
