import { Injectable } from '@nestjs/common'
import { createTransport } from 'nodemailer'

import { mailOptions } from '@configs'
import { ISendMail } from '@core/mail'

@Injectable()
export class MailService {
  private transporter = createTransport(mailOptions)

  async sendMail({ from, to, subject, text }: ISendMail) {
    return await this.transporter.sendMail({
      to,
      from,
      text,
      subject
    })
  }
}
