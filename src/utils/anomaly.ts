export function isAnomalous(current: number, history: number[], thresholdPct = 200) {
  if (!history.length) return false
  const avg = history.reduce((a, b) => a + b, 0) / history.length
  if (avg === 0) return false
  const pct = (current / avg) * 100
  return pct > thresholdPct
}
