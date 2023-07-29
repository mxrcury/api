import { env } from '@configs'

export const mailOptions = {
  host: env.MAIL_HOST,
  port: env.MAIL_PORT
}
