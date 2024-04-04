/**
 * format a number in a compact way
 * @example
 * formatCompactNumber(1000) // 1K
 * formatCompactNumber(1000000) // 1M
 * formatCompactNumber(1000000000) // 1B 
 */
export function formatCompactNumber(number: number) {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number);
  }