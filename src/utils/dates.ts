import { format } from "date-fns";

export function extractDateViceVersaYearMonthDay(date: Date | string): string {
  try {
    return format(date, "yyyy/MM/dd").replace(/\//gi, "");
  } catch (err) {
    return "";
  }
}
