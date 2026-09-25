import nodemailer from "nodemailer";
import { welcomeEmailTemplate, enquiryConfirmationEmailTemplate, getLogoAttachment } from "./emailTemplates.js";

/**
 * Lazily initialize transporter to ensure environment variables
 * are loaded before creating the SMTP connection.
 * Supports custom domain SMTP (cPanel/Titan/Zoho/AWS SES) as well as Gmail fallback.
 */
let transporter = null;

export const getTransporter = () => {
    if (!transporter) {
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS;
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = Number(process.env.SMTP_PORT) || 465;
        const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

        if (smtpHost) {
            transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpSecure, // true for port 465 (SSL), false for 587 (STARTTLS)
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
                tls: {
                    // Prevent SSL handshake failures with custom domain / cPanel certs
                    rejectUnauthorized: false,
                },
                connectionTimeout: 10000, // 10s timeout
                greetingTimeout: 10000,
                socketTimeout: 15000,
            });
            console.log(`[Email Service] Configured custom SMTP (${smtpHost}:${smtpPort}, secure=${smtpSecure})`);
        } else {
            transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
                connectionTimeout: 10000,
                greetingTimeout: 10000,
                socketTimeout: 15000,
            });
            console.log(`[Email Service] Configured Gmail SMTP fallback`);
        }
    }
    return transporter;
};

/**
 * Generic email sending function
 */
export const sendEmail = async ({ to, subject, html, text, attachments = [], bcc = undefined }) => {
    const mailClient = getTransporter();

    const senderEmail = process.env.EMAIL_USER || "enquiry@makeyourownvoyage.com";
    const senderName = process.env.EMAIL_FROM_NAME || "Make Your Own Voyage";

    const mailOptions = {
        from: `"${senderName}" <${senderEmail}>`,
        replyTo: senderEmail,
        to,
        subject,
        html,
        text,
        attachments,
        ...(bcc ? { bcc } : {}),
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

/**
 * Send colorful luxury branded confirmation email upon inquiry submission
 */
export const sendEnquiryConfirmationEmail = async ({
    customerName,
    customerEmail,
    enquiryCode,
    enquiryType,
    detailsSummary = [],
    specialRequests = "",
}) => {
    try {
        const { html, text } = enquiryConfirmationEmailTemplate({
            customerName,
            customerEmail,
            enquiryCode,
            enquiryType,
            detailsSummary,
            specialRequests,
        });

        const logoAttachment = getLogoAttachment();
        const attachments = logoAttachment ? [logoAttachment] : [];

        const subjectTypeMap = {
            hotel: "🏨 Hotel Enquiry Received! We're Crafting Your Stay",
            flight: "✈️ Flight Enquiry Received! Searching The Best Fares",
            package: "🎒 Tour Package Enquiry Received! Your Adventure Begins",
            weekend_trip: "⛰️ Weekend Trip Enquiry Received! Get Ready To Unwind",
            transport: "🚗 Transport Enquiry Received! We're Preparing Your Ride",
            custom: "✨ Travel Enquiry Received! We Will Contact You Soon",
        };

        const subject = `${subjectTypeMap[enquiryType] || "✈️ Travel Enquiry Received!"} [${enquiryCode}]`;

        // Automatically BCC company email so your team also receives the inquiry notification in real time
        const companyEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER;
        const bcc = (companyEmail && companyEmail !== customerEmail) ? companyEmail : undefined;

        const result = await sendEmail({
            to: customerEmail,
            bcc,
            subject,
            html,
            text,
            attachments,
        });

        console.log(`[Email Service] Enquiry confirmation email successfully sent to: ${customerEmail} (${enquiryCode})`);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error(`[Email Service] ❌ Failed to send enquiry email to ${customerEmail}:`, error.message, error.code ? `(Code: ${error.code})` : "");
        if (error.code === "ETIMEDOUT" || error.code === "ECONNREFUSED") {
            console.error(`[Email Service Tip] SMTP host ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} is not responding. Check if Cloudflare proxy is enabled on mail subdomain, or try port 587 with SMTP_SECURE=false, or use Gmail App Password.`);
        }
        return { success: false, error: error.message };
    }
};