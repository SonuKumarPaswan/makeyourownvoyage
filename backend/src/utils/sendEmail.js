import nodemailer from "nodemailer";
import { welcomeEmailTemplate, getLogoAttachment } from "./emailTemplates.js";

/**
 * Lazily initialize transporter to ensure environment variables
 * are loaded before creating the SMTP connection.
 */
let transporter = null;

export const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    return transporter;
};

/**
 * Generic email sending function
 */
export const sendEmail = async ({ to, subject, html, text, attachments = [] }) => {
    const mailClient = getTransporter();

    const senderEmail = process.env.EMAIL_USER || "no-reply@makeyourownvoyage.com";

    const mailOptions = {
        from: `"Make Your Own Voyage" <${senderEmail}>`,
        to,
        subject,
        html,
        text,
        attachments,
    };

    return await mailClient.sendMail(mailOptions);
};

/**
 * Send the luxury branded welcome email to newly registered users
 */
export const sendWelcomeEmail = async ({ name, email }) => {
    try {
        const { html, text } = welcomeEmailTemplate({ name, email });
        const logoAttachment = getLogoAttachment();
        const attachments = logoAttachment ? [logoAttachment] : [];

        const result = await sendEmail({
            to: email,
            subject: "Welcome Aboard Make Your Own Voyage! ✈️ Your Journey Begins",
            html,
            text,
            attachments,
        });

        console.log(`[Email Service] Welcome email successfully sent to: ${email}`);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error(`[Email Service] Failed to send welcome email to ${email}:`, error.message);
        return { success: false, error: error.message };
    }
};