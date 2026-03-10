import nodemailer from "nodemailer"

// Create reusable transporter
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

/**
 * Send an email using standard SMTP settings from env
 * @param {Object} options 
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} [options.text] - Plain text body
 * @param {string} [options.html] - HTML body
 * @returns {Promise<any>}
 */
export async function sendEmail({ to, subject, text, html }) {
    const from = process.env.SMTP_FROM || "noreply@cop.local"
    return transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
    })
}
