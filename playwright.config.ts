import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './integration_tests/playwright',
  maxFailures: 2,
}

export default config
