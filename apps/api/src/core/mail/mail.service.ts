import { TransportOptions, createTransport } from 'nodemailer'

import { mailOptions } from '@configs/mail.config'
import { ISendMail } from '@core/mail/mail.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
  private transporter = createTransport(mailOptions as TransportOptions)

  async sendMail({ from, to, subject, text, html }: ISendMail) {
    return await this.transporter.sendMail({
      to,
      from,
      text,
      subject,
      html
    })
  }
}
