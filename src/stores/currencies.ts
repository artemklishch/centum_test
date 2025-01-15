import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { extractCurrenciesPerPage } from "@/utils/currenciesHelpers";
import { CURRENCIES_PER_PAGE } from "@/utils/constants";
import router from "@/router";
import { useRoute } from "vue-router";
import { fetchCurrencies, fetchCurrency } from "@/api/currencies";
import { deleteDefaultCurrencies, setDefaultCurrencies } from "@/utils/storage";

export interface Currency {
  cc: string;
  exchangedate: string;
  r030: number;
  rate: number;
  txt: string;
  changed?: boolean;
}

export const useCurrenciesStore = defineStore("currencies", () => {
  const currencies = ref<Currency[]>([]);
  const pages = ref<number>(0);
  const page = ref<number>(0);
  const selectedCurrency = ref<Currency | null>(null);
  const route = useRoute();
  const changedCurrencies = ref<Currency[]>([]);
  const errorMessage = ref<string>("");

  const errorMessageValue = computed({
    get: () => errorMessage.value,
    set: (value: string) => {
      errorMessage.value = value;
    },
  });

  const currenciesPerPage = computed(() => {
    if (route.path.includes("changed-courses")) {
      return extractCurrenciesPerPage(changedCurrencies.value, page.value);
    }
    return extractCurrenciesPerPage(currencies.value, page.value);
  });

  async function getCurrencies(date?: string) {
    try {
      const data = await fetchCurrencies(date);
      currencies.value = data;
      pages.value = Math.ceil(data.length / CURRENCIES_PER_PAGE) - 1;
    } catch (error) {
      errorMessage.value = "Impossible to fetch currencies";
      if (error instanceof Error) {
        throw new Error("Impossible to fetch currencies: " + error.message);
      }
      throw new Error("Impossible to fetch currencies");
    }
  }

  async function getCurrency(currencyCode: string, date: string) {
    try {
      if (!currencies.value.length) {
        goBackOfNestedRoute();
        return;
      }
      selectedCurrency.value = await fetchCurrency(currencyCode, date);
    } catch (error) {
      errorMessage.value = "Impossible to fetch currency data";
      if (error instanceof Error) {
        throw new Error("Impossible to fetch currency data: " + error.message);
      }
      throw new Error("Impossible to fetch currency data");
    }
  }

  function getChangedCurrency(currencyCode: string, date: string) {
    const cur = changedCurrencies.value.find(
      (c) => c.cc === currencyCode && c.exchangedate === date
    );
    if (cur) {
      selectedCurrency.value = cur;
    }
  }

  function incrementPage() {
    if (page.value < pages.value) {
      page.value++;
    }
  }

  function decrementPage() {
    if (page.value > 0) {
      page.value--;
    }
  }

  function addChangedCurrency(currency: Currency) {
    changedCurrencies.value.push(currency);
    selectedCurrency.value = null;
    goBackOfNestedRoute();
    setDefaultCurrencies(changedCurrencies.value);
  }

  function editChangedCurrency(rate: number) {
    const updatedCurrencyIndex = changedCurrencies.value.findIndex(
      (c) =>
        c.cc === selectedCurrency.value?.cc &&
        selectedCurrency.value.exchangedate
    );
    if (selectedCurrency.value && updatedCurrencyIndex > -1) {
      selectedCurrency.value.rate = rate;
      changedCurrencies.value[updatedCurrencyIndex];
      setDefaultCurrencies(changedCurrencies.value);
      goBackOfNestedRoute();
    } else {
      errorMessage.value = "Currency not found for editing";
    }
  }

  function removeChangedCurrency() {
    changedCurrencies.value = changedCurrencies.value.filter(
      (c) =>
        c.cc !== selectedCurrency.value?.cc &&
        c.exchangedate !== selectedCurrency.value?.exchangedate
    );
    selectedCurrency.value = null;
    if (!changedCurrencies.value.length) {
      deleteDefaultCurrencies();
    } else {
      setDefaultCurrencies(changedCurrencies.value);
    }
  }

  function deleteAllChangedCurrencies() {
    deleteDefaultCurrencies();
    changedCurrencies.value = [];
    selectedCurrency.value = null;
  }

  function goBackOfNestedRoute() {
    const curRoute = route.matched.find((r) => r.name);
    if (curRoute) {
      router.replace(curRoute.path);
    }
  }

  return {
    getCurrencies,
    getCurrency,
    currenciesPerPage,
    incrementPage,
    decrementPage,
    page,
    pages,
    currencies,
    selectedCurrency,
    changedCurrencies,
    addChangedCurrency,
    removeChangedCurrency,
    errorMessageValue,
    getChangedCurrency,
    deleteAllChangedCurrencies,
    editChangedCurrency,
  };
});
