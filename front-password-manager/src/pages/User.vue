<script setup lang="ts">
import { useUserStore } from '../store/userStore';
const userStore = useUserStore();
</script>

<template>
  <h1 class="user-message text-center">Hello my friend <span class="username">{{ userStore.username }}</span>, this is your private space.</h1>
</template>

<style>
.user-message {
  font-family: "EB Garamond", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-size: 6em;
  margin-top: 10%;
}

.username {
  font-family: "EB Garamond", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  margin-top: 10%;
  font-style: italic;
}
</style>
