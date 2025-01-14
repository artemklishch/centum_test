<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies';
import { ref, watch } from 'vue';
import CurrenciesList from '@/components/CurrenciesList.vue';
import PaginationButtons from '@/components/PaginationButtons.vue';
import { CURRENCIES_PER_PAGE } from '@/utils/constants';

const store = useCurrenciesStore();
const dateInput = ref("")
const maxValue = ref(new Date().toISOString().split('T')[0])

watch(dateInput, (value) => {
  store.getCurrencies(`${value.split("-").join("")}`)
})
</script>

<template>
  <div class="courses-by-date">
    <h1>Courses by certain date</h1>
    <h5>Pick the date below</h5>
    <input v-model="dateInput" type="date" :max="maxValue" />
    <CurrenciesList v-if="dateInput" path="/courses-by-date" :currencies="store.currenciesPerPage" />
    <PaginationButtons v-if="dateInput && store.currenciesPerPage.length > CURRENCIES_PER_PAGE" />
    <div class=" courses-by-date__currency">
      <RouterView />
    </div>
  </div>
</template>

<style lang="css" scoped>
.courses-by-date {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.courses-by-date__currency {
  margin-top: 20px;
}
</style>
