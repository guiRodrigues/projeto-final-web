<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { api } from '@/api';
import PasswordItem from '../components/PasswordItem.vue';
import PasswordForm from "../components/PasswordForm.vue";
import { useUserStore } from '../store/userStore';
import { Password } from '@/types';

const passwords = ref<Password[]>([]);
const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);

async function loadPasswords() {
  try {
    const url = isAuthenticated.value 
      ? '/passwords?populate=*' 
      : '/passwords?filters[isPublic][$eq]=true&populate=*';
    const { data } = await api.get(url);
    passwords.value = data.data;
  } catch (error) {
    console.error('Error loading passwords:', error);
  }
}

onMounted(loadPasswords);
</script>

<template>
  <PasswordForm v-if="isAuthenticated" @passwordCreated="loadPasswords" />

  <div class="w-4/5 mx-auto mt-10 mb-12 grid grid-cols-4 gap-4">
    <PasswordItem
      v-for="password in passwords"
      :key="password.id"
      :id="password.id"
      :name="password.name"
      :value="password.value"
      :is-public="password.isPublic"
      :vault="password.vault"
      :document-id="password.documentId"
      @passwordDeleted="loadPasswords"
    />
  </div>
</template>
