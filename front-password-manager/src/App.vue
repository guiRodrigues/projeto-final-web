<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="grid album bg-body-tertiary">
    <div class="container">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.grid {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  padding-top: 5%;
  background-image: linear-gradient(to right, #8080800A 1px, transparent 1px),
  linear-gradient(to bottom, #8080800A 1px, transparent 1px);
  background-size: 32px 32px;
}
</style>
