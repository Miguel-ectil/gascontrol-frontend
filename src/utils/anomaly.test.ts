import { describe, it, expect } from 'vitest'
import { isAnomalous } from './anomaly'

describe('isAnomalous', () => {
  it('returns false with empty history', () => {
    expect(isAnomalous(100, [])).toBe(false)
  })
  it('detects anomaly when above threshold', () => {
    expect(isAnomalous(300, [50, 50, 50], 200)).toBe(true)
  })
})
