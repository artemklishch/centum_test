<script setup lang="ts">
import { useCurrenciesStore } from "@/stores/currencies";
import { onMounted } from "vue"
import PaginationButtons from "@/components/PaginationButtons.vue";
import CurrenciesList from "@/components/CurrenciesList.vue";
import { CURRENCIES_PER_PAGE } from "@/utils/constants";

const store = useCurrenciesStore();

onMounted(() => {
  store.getCurrencies()
});
</script>

<template>
  <div class="home">
    <h1>Currencies today</h1>
    <CurrenciesList path="" />
    <PaginationButtons v-if="store.currenciesPerPage.length > CURRENCIES_PER_PAGE" />
    <div class="home__currency">
      <RouterView />
    </div>
  </div>
</template>

<style lang="css" scoped>
.home {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.home__currency {
  margin-top: 20px;
}
</style>
