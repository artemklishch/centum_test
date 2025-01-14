<script setup lang="ts">
import type { Currency } from '@/stores/currencies';

const props = defineProps<{
    currencies: Array<Currency>,
    path?: string;
}>()

function navigate(currency: Currency) {
    return `${props.path}/${currency.cc}?date=${currency.exchangedate}`
}


</script>

<template>
    <ul class="currencies-list">
        <li v-for="currency in props.currencies" class="currencies-list__item" :key="currency.cc">
            <RouterLink :to="navigate(currency)">
                {{ currency.txt }}, {{ currency.rate }}
            </RouterLink>
        </li>
    </ul>
</template>

<style lang="css" scoped>
.currencies-list {
    list-style: circle;
}

.currencies-list__item {
    cursor: pointer;
}

.currencies-list__item:hover {
    background-color: var(--vt-c-text-dark-2);
}

.currencies-list__item:has(.router-link-active.router-link-exact-active) {
    background-color: var(--vt-c-text-dark-2);
}
</style>