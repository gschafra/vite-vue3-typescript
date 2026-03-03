<script setup lang="ts">
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <!-- Full-screen routes (e.g. Dashboard) render without the default shell -->
  <router-view v-if="route.meta.fullscreen" />

  <!-- Standard pages -->
  <template v-else>
    <img alt="Vue logo" src="./assets/logo.png" />
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
    <router-view />
  </template>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
