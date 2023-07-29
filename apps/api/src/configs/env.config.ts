import { z } from 'zod'

import { parseEnvs } from '@utils'

const stringToNumber = (arg: string | number) =>
  typeof arg === 'string' ? Number(arg) : arg

const envSchema = z.object({
  // Server port
  PORT: z.string(),

  // Jwt
  ACCESS_SECRET_KEY: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),

  REFRESH_SECRET_KEY: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),

  // Client
  CLIENT_DOMAIN: z.string(),

  // Redis DB
  REDIS_PORT: z.string().transform(stringToNumber),
  REDIS_HOST: z.string(),

  // Mail
  MAIL_HOST: z.string(),
  MAIL_PORT: z.string().transform(stringToNumber)
})

export const env = parseEnvs<typeof envSchema>(envSchema)
