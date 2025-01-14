<script setup lang="ts">
import CurrenciesList from '@/components/CurrenciesList.vue';
import PaginationButtons from '@/components/PaginationButtons.vue';
import { useCurrenciesStore } from '@/stores/currencies';
import { CURRENCIES_PER_PAGE } from '@/utils/constants';

const store = useCurrenciesStore();
</script>

<template>
  <div class="changed-courses">
    <h1>Changed users's courses</h1>
    <CurrenciesList path="/changed-courses" :currencies="store.currenciesPerPage" />
    <PaginationButtons v-if="store.currenciesPerPage.length > CURRENCIES_PER_PAGE" />
    <button v-if="store.changedCurrencies.length" @click="store.deleteAllChangedCurrencies">Delete all</button>
    <div class="courses-by-date__currency">
      <RouterView />
    </div>
  </div>
</template>

<style>
.changed-courses {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px
}
</style>
