// src/lib/anomaly.ts
export function isAnomalous(consumo: number, history: number[], thresholdPercent = 200, lastN = 5) {
  const last = history.slice(-lastN);
  if (last.length === 0) return false;
  const avg = last.reduce((s, v) => s + v, 0) / last.length;
  if (avg === 0) return consumo > 0 && thresholdPercent !== 0;
  const percent = (consumo / avg) * 100;
  return percent > thresholdPercent;
}
