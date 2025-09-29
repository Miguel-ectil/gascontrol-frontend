import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const schema = z.object({
  consumo: z.coerce.number().refine(v => v >= 0, 'Valor não pode ser negativo')
})

describe('consumo validation', () => {
  it('rejects negative', () => {
    const res = schema.safeParse({ consumo: -1 })
    expect(res.success).toBe(false)
  })
  it('accepts decimal', () => {
    const res = schema.safeParse({ consumo: '12.34' })
    expect(res.success).toBe(true)
  })
})
