import { z } from 'zod'

import { parseEnvs } from '@utils'

const envSchema = z.object({
  // Server port
  PORT: z.string()
})

export const env = parseEnvs<typeof envSchema>(envSchema)
