<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useCurrenciesStore, type Currency } from '@/stores/currencies';
import { useRoute } from "vue-router";

const store = useCurrenciesStore();
const courseValue = ref<string | number>("");
const isFormOpen = ref<boolean>(false);
const route = useRoute();
const isChangedView = computed(() => route.path.includes("/changed-courses"));
const submitText = computed(() => isChangedView.value ? "Do you want to edit the changed course?" : "Do you want to update and add to the changed course?");

function openForm() {
    isFormOpen.value = true;
    if (store.selectedCurrency) {
        courseValue.value = store.selectedCurrency.rate;
    }
}

function onSubmit() {
    if (!store.selectedCurrency) {
        return
    }
    if (!isChangedView.value) {
        const wasAdded = store.changedCurrencies.find(c => c.cc === store.selectedCurrency?.cc && c.exchangedate === store.selectedCurrency.exchangedate);
        if (wasAdded) {
            store.errorMessageValue = "This course has been added"
            return;
        }
        isFormOpen.value = false;
        const updatedCurrency: Currency = { ...store.selectedCurrency }
        updatedCurrency.rate = +courseValue.value
        updatedCurrency.changed = true
        store.addChangedCurrency(updatedCurrency)
    } else {
        store.editChangedCurrency(+courseValue.value)
    }
}

onMounted(() => {
    if (store.selectedCurrency) {
        courseValue.value = store.selectedCurrency.rate;
    }
});
</script>

<template>
    <section v-if="isChangedView">
        <button @click="store.removeChangedCurrency">Do you want to delete the changed currency?</button>
    </section>
    <section class="currency__update">
        <button v-if="!isFormOpen" @click="openForm">{{ submitText }}</button>
        <form v-else @submit.prevent="onSubmit">
            <input type="number" v-model="courseValue" step="0.0000000000001">
            <div class="actions-btns">
                <button type="submit">Save</button>
                <button type="button" @click="isFormOpen = false">Cancel</button>
            </div>
            <span v-if="store.errorMessageValue" class="error">{{ store.errorMessageValue }}</span>
        </form>
    </section>
</template>

<style lang="css" scoped>
.currency__update {
    margin: 5px 0;
}

.actions-btns {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
</style>