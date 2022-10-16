import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { join } from 'path';
import { AnyObject, EmailTemplate } from 'src/global';

interface MailOptions {
  to: string | Array<string>;
  subject: string;
  data: AnyObject;
  template: EmailTemplate;
  type?: 'mail';
}

@Injectable()
export class MailService {
  private transporter: Transporter;
  private logger = new Logger(MailService.name);

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendMail({ to, subject, template, data, type = 'mail' }: MailOptions) {
    const htmlTemplate = readFileSync(join(`${__dirname}/../../templates/${type}/${template}.template.hjs`)).toString();

    const html = compile(htmlTemplate)({ ...data, url: process.env.URL });

    const options: SendMailOptions = {
      to,
      subject,
      html,
      from: {
        address: 'admin@adverspot.com',
        name: 'AdvertSpot'
      }
    };

    try {
      return this.transporter.sendMail(options);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
