import { Logger } from '@nestjs/common'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

const logger = new Logger()

const { parsed } = config({ path: `.env` }) // change it depends on app it is, and move to global utils

const envSchema = z.object({
  // Server port
  PORT: z.string()
})

type EnvSchema = z.infer<typeof envSchema>

const parsedEnv = envSchema.safeParse(expand({ parsed }).parsed)

if (parsedEnv.success === false) {
  logger.error('Environmental variables cannot be parsed')
  process.exit(1)
}

export const env = parsedEnv.data as EnvSchema
