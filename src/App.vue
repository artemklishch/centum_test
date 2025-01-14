<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useCurrenciesStore } from './stores/currencies';
import { getDefaultCurrencies } from './utils/storage';

const store = useCurrenciesStore();

onMounted(() => {
  store.$patch({ changedCurrencies: getDefaultCurrencies() })
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/changed-courses">Changed Courses</RouterLink>
      <RouterLink to="/courses-by-date">Courses By Date</RouterLink>
    </nav>
  </header>
  <main class="mainWrapper">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  background-color: var(--vt-c-indigo);
  position: fixed;
  width: 100vw;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: right;
}

header a {
  color: var(--vt-c-white);
  display: inline-block;
  height: 45px;
  padding: 10px;
}

header a:hover,
header a.router-link-active {
  background-color: var(--vt-c-text-dark-2);
  color: var(--vt-c-black-soft);
}

.mainWrapper {
  display: flex;
  height: 100vh;
  padding-top: 40px;
}
</style>
