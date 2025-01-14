<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies';
import IconArrowRight from './icons/IconArrowRight.vue';

// store
const store = useCurrenciesStore();
</script>

<template>
    <div class="pagination-btns">
        <button @click="store.decrementPage" :disabled="store.page === 0">
            <IconArrowRight />
        </button>
        <button @click="store.incrementPage" :disabled="store.page === store.pages">
            <IconArrowRight />
        </button>
    </div>
</template>

<style lang="css" scoped>
.pagination-btns {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.pagination-btns button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.pagination-btns button:disabled {
    opacity: 0.5;
}

.pagination-btns button svg {
    width: 30px;
}

.pagination-btns button:first-child svg {
    transform: rotate(180deg);
}
</style>