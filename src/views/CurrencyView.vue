<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies';
import { getCurrencyType } from '@/utils/currenciesHelpers';
import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import AddRemoveCurrency from '@/components/AddRemoveCurrency.vue';

const store = useCurrenciesStore();
const route = useRoute();

onMounted(() => {
    getCurrencyType(route, store)
});
onUnmounted(() => {
    store.$patch({ selectedCurrency: null });
});
watch(route, () => {
    getCurrencyType(route, store)
    store.errorMessageValue = ""
});
</script>

<template>
    <div v-if="store.selectedCurrency" class="currency">
        <h1>{{ store.selectedCurrency.txt }}</h1>
        <p>Course value: {{ store.selectedCurrency.rate }}</p>
        <p>Course date: {{ store.selectedCurrency.exchangedate }}</p>
        <AddRemoveCurrency />
    </div>
</template>

<style lang="css" scoped>
.currency {
    margin: 10px 0;
}
</style>