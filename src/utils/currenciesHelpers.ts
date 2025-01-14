import type { Currency, useCurrenciesStore } from "@/stores/currencies";
import { CURRENCIES_PER_PAGE } from "./constants";
import type { useRoute } from "vue-router";

export function extractCurrenciesPerPage(currencies: Currency[], page: number) {
  return currencies.slice(
    CURRENCIES_PER_PAGE * page,
    CURRENCIES_PER_PAGE * page + CURRENCIES_PER_PAGE
  );
}

export function getCurrencyType(
  route: ReturnType<typeof useRoute>,
  store: ReturnType<typeof useCurrenciesStore>
) {
  const currency = route.params.name;
  const date = route.query.date;
  if (typeof currency !== "string" || typeof date !== "string") {
    store.errorMessageValue =
      "Invalid route params and impossible to fetch data. Try go out and open again";
    return;
  }

  if (route.path.includes("/changed-courses")) {
    store.getChangedCurrency(currency, date);
    return;
  }
  store.getCurrency(currency, date);
}
