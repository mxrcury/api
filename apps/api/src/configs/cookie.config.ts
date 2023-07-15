import { env } from './env.config'

export const cookieOptions = {
  httpOnly: true,
  domain: env.CLIENT_DOMAIN,
  maxAge: 24 * 3600 * 1000, // 1 day
  secure: true
}
