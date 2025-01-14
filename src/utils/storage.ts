import type { Currency } from "@/stores/currencies";
import { CHANGED_CURRENCIES_KEY } from "./constants";

export const setDefaultCurrencies = (items: Currency[]) => {
  localStorage.setItem(CHANGED_CURRENCIES_KEY, JSON.stringify(items));
};

export const getDefaultCurrencies = (): Currency[] => {
  const data = localStorage.getItem(CHANGED_CURRENCIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteDefaultCurrencies = () =>
  localStorage.removeItem(CHANGED_CURRENCIES_KEY);
