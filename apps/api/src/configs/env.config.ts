import { z } from 'zod'

import { parseEnvs } from '@utils'

const stringToNumber = (arg: string | number) =>
  typeof arg === 'string' ? Number(arg) : arg

const envSchema = z.object({
  // Server
  PORT: z.string(),
  CLIENT_URL: z.string(),

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
  MAIL_CLIENT_ID: z.string(),
  MAIL_CLIENT_SECRET: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_REFRESH_TOKEN: z.string(),

  // AWS
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string()
})

export const env = parseEnvs<typeof envSchema>(envSchema)
