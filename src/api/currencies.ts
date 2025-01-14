import type { Currency } from "@/stores/currencies";
import { extractDateViceVersaYearMonthDay } from "@/utils/dates";

const URL = import.meta.env.VITE_API_CURRENCIES_URL;

export async function fetchCurrencies(date?: string): Promise<Currency[]> {
  const url = date
    ? `${URL}&date=${date}`
    : `${URL}&date=${extractDateViceVersaYearMonthDay(new Date())}`;
  const response = await fetch(url);
  const data: Currency[] = await response.json();
  return data;
}

export async function fetchCurrency(
  currencyCode: string,
  date?: string
): Promise<Currency> {
  const url = date
    ? `${URL}&valcode=${currencyCode}&date=${extractDateViceVersaYearMonthDay(
        new Date(date.split(".").reverse().join("."))
      )}`
    : `${URL}&valcode=${currencyCode}&date=${extractDateViceVersaYearMonthDay(
        new Date()
      )}`;
  const response = await fetch(url);
  const data: Currency[] = await response.json();
  return data[0];
}
