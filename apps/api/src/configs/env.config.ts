import { z } from 'zod'

import { parseEnvs } from '@utils'

const envSchema = z.object({
  // Server port
  PORT: z.string(),

  ACCESS_SECRET_KEY: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),

  REFRESH_SECRET_KEY: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string()
})

export const env = parseEnvs<typeof envSchema>(envSchema)
