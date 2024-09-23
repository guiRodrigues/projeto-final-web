<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="album bg-body-tertiary">
    <div class="container">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
</style>
