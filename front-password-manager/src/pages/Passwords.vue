<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
    import { api } from '@/api';
    import PasswordItem from '../components/PasswordItem.vue';
    import PasswordForm from "../components/PasswordForm.vue";
    import { useUserStore } from '../store/userStore';

    import { Password } from '@/types';


    const passwords = ref([] as Password[]);
    // const loading = ref(true)

    const userStore = useUserStore();
    const isAuthenticated = computed(() => userStore.isAuthenticated);

    async function loadPasswords() {
      try {
        const url = !isAuthenticated.value ? '/passwords?filters[isPublic][$eq]=true&populate=*' : '/passwords?populate=*';
        const { data } = await api.get(url);
        passwords.value = data.data;

        console.log('PASSWORDS', passwords)
      } catch (e) {
        // if (isAxiosError(e) && isApplicationError(e.response?.data)) {
        // exception.value = e.response?.data
        // }
      } finally {
        // loading.value = false
      }
    }

    onMounted(loadPasswords);
</script>

<template>
<h1>PASSWORDS</h1>
<PasswordForm v-if="isAuthenticated" @passwordCreated="loadPasswords" />

<div class="w-4/5 mx-auto mt-10 mb-12 grid grid-cols-4 gap-4">
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
