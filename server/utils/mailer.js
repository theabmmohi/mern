import { convert } from "html-to-text"
import nodemailer from "nodemailer"
export default async function sendMail ({ from, name, to, subject, body, isHtml }) {
  await nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }, secure: process.env.SMTP_PORT === "465"
  }).sendMail({
    ...(isHtml
      ? { html: body, text: convert(body, { wordwrap: 125 }) }
      : { text: body }),
    to, subject, from: {
      address: `${from ?? "no-reply"}@${process.env.SMTP_FROM_DOMAIN}`,
      name: name ?? process.env.APP_NAME ?? "No-Reply"
    }
  })
}