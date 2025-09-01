import { config } from '../src/config'
import { describe, it, expect } from 'vitest'

describe('config', () => {
  it('loads API key from env', () => {
    expect(typeof config.claudeApiKey).toBe('string')
  })
})
