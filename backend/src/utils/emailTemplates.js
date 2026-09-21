import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the brand logo exists in backend/src/assets/logo.png
export const getLogoAttachment = () => {
    const assetsDir = path.resolve(__dirname, "../assets");
    const logoDest = path.join(assetsDir, "logo.png");

    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }



    if (fs.existsSync(logoDest)) {
        return {
            filename: "make-your-own-voyage-logo.png",
            path: logoDest,
            cid: "brand-logo", // Referenced in HTML as cid:brand-logo
        };
    }

    return null;
};

/**
 * Generate a luxury-themed, responsive HTML welcome email for Make Your Own Voyage.
 * Palette:
 *  - Royal Midnight Navy: #0B1325 / #070F1E
 *  - Luxury Warm Gold: #C89D3C / #D4AF37 / #E5C378
 *  - Crisp White & Off-White Text: #FFFFFF / #F1F5F9 / #CBD5E1
 */
export const welcomeEmailTemplate = ({ name, email }) => {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const year = new Date().getFullYear();
    const formattedDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const html = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Welcome to Make Your Own Voyage</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
        table {mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;}
    </style>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            background-color: #050b14;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #cbd5e1;
        }

        table {
            border-spacing: 0;
        }

        td {
            padding: 0;
        }

        img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        .gold-button {
            transition: all 0.3s ease;
        }

        .gold-button:hover {
            background-color: #e5b149 !important;
            box-shadow: 0 0 20px rgba(200, 157, 60, 0.6) !important;
        }

        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: auto !important;
            }
            .stack-column {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                direction: ltr !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .hero-title {
                font-size: 26px !important;
                line-height: 32px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050b14;">

    <!-- Center table wrapper -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050b14; padding: 40px 10px;">
        <tr>
            <td align="center">

                <!-- Main Container (600px) -->
                <table role="presentation" class="email-container" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background: #0b1325; border-radius: 16px; overflow: hidden; border: 1px solid rgba(200, 157, 60, 0.35); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(200, 157, 60, 0.1);">

                    <!-- TOP GOLD ACCENT BAR -->
                    <tr>
                        <td height="4" style="background: linear-gradient(90deg, #785317 0%, #C89D3C 25%, #F5DE93 50%, #C89D3C 75%, #785317 100%); font-size: 0; line-height: 0;">&nbsp;</td>
                    </tr>

                    <!-- BRAND HEADER & LOGO SECTION -->
                    <tr>
                        <td align="center" style="padding: 35px 30px 25px 30px; background-color: #070e1d; border-bottom: 1px solid rgba(200, 157, 60, 0.2);">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <!-- Brand Logo Image (Inline Attachment with Web Fallback) -->
                                        <a href="${clientUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                                            <img src="cid:brand-logo" alt="Make Your Own Voyage" width="360" style="max-width: 90%; height: auto; display: block; margin: 0 auto;" />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 14px;">
                                        <!-- Tagline with dots -->
                                        <div style="font-size: 11px; font-weight: 700; letter-spacing: 3.5px; color: #C89D3C; text-transform: uppercase; font-family: 'Plus Jakarta Sans', Arial, sans-serif;">
                                            EXPLORE &bull; EXPERIENCE &bull; EXTRAORDINARY
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- HERO & GREETING SECTION -->
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 40px 25px 40px; text-align: center; background: radial-gradient(circle at 50% 10%, rgba(200, 157, 60, 0.12) 0%, transparent 65%), #0b1325;">
                            
                            <!-- Luxury Badge -->
                            <div style="display: inline-block; padding: 7px 18px; border: 1px solid rgba(200, 157, 60, 0.5); border-radius: 50px; background-color: rgba(200, 157, 60, 0.08); margin-bottom: 22px;">
                                <span style="font-size: 10.5px; font-weight: 700; letter-spacing: 2.2px; color: #E5C378; text-transform: uppercase; font-family: 'Plus Jakarta Sans', Arial, sans-serif;">
                                    ✦ TRAVEL FOR EVERY BUDGET &bull; POCKET-FRIENDLY TO 5-STAR LUXURY ✦
                                </span>
                            </div>

                            <!-- Main Title -->
                            <h1 class="hero-title" style="margin: 0 0 12px 0; color: #ffffff; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-size: 32px; font-weight: 700; line-height: 1.25; letter-spacing: 0.5px;">
                                Welcome Aboard, ${name}!
                            </h1>

                            <!-- Subtitle -->
                            <p style="margin: 0 0 24px 0; color: #C89D3C; font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 17px; line-height: 1.4;">
                                Your extraordinary voyage begins today.
                            </p>

                            <!-- Welcome Letter Body -->
                            <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.75; color: #cbd5e1; text-align: left;">
                                Thank you for creating your account with <strong style="color: #ffffff;">Make Your Own Voyage</strong>. We are a premier Travel Management Company and Tour Operator dedicated to crafting memorable journeys for every pocket — from budget-conscious explorers to discerning 5-star luxury voyagers and corporate enterprises.
                            </p>

                            <p style="margin: 0 0 30px 0; font-size: 15px; line-height: 1.75; color: #cbd5e1; text-align: left;">
                                With your new account, you now have privileged access to bespoke itineraries, exclusive hotel partnerships, international visa assistance, and 24/7 dedicated voyage support.
                            </p>

                            <!-- PRIMARY CTA BUTTON -->
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 30px auto;">
                                <tr>
                                    <td align="center" style="border-radius: 8px; background: #C89D3C; box-shadow: 0 4px 20px rgba(200, 157, 60, 0.4);">
                                        <a href="${clientUrl}" target="_blank" class="gold-button" style="display: inline-block; padding: 16px 38px; font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; color: #070e1d; text-decoration: none; text-transform: uppercase; border-radius: 8px; background-color: #C89D3C;">
                                            EXPLORE YOUR VOYAGE &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- GOLD DIVIDER -->
                    <tr>
                        <td align="center" style="padding: 0 40px;">
                            <div style="height: 1px; width: 100%; background: linear-gradient(90deg, transparent, rgba(200, 157, 60, 0.5), transparent);">&nbsp;</div>
                        </td>
                    </tr>

                    <!-- FEATURES & SERVICES HIGHLIGHT -->
                    <tr>
                        <td class="mobile-padding" style="padding: 35px 40px 25px 40px; background-color: #0b1325;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="padding-bottom: 22px;">
                                        <div style="font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #C89D3C; text-transform: uppercase;">
                                            WHAT AWAITS YOU
                                        </div>
                                    </td>
                                </tr>

                                <!-- Feature 1: Tailored Itineraries -->
                                <tr>
                                    <td style="padding-bottom: 16px;">
                                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0e1930; border: 1px solid rgba(200, 157, 60, 0.2); border-radius: 10px; padding: 16px 20px;">
                                            <tr>
                                                <td width="42" valign="top" style="font-size: 24px; line-height: 1; padding-right: 14px;">
                                                    ✈️
                                                </td>
                                                <td valign="top">
                                                    <div style="font-size: 15px; font-weight: 700; color: #E5C378; margin-bottom: 4px;">
                                                        Curated &amp; Bespoke Travel Planning
                                                    </div>
                                                    <div style="font-size: 13.5px; line-height: 1.6; color: #94a3b8;">
                                                        Personalized routes and handpicked adventures tailored precisely to your schedule, passions, and travel party.
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Feature 2: 5-Star Luxury & Pocket-Friendly Stays -->
                                <tr>
                                    <td style="padding-bottom: 16px;">
                                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0e1930; border: 1px solid rgba(200, 157, 60, 0.2); border-radius: 10px; padding: 16px 20px;">
                                            <tr>
                                                <td width="42" valign="top" style="font-size: 24px; line-height: 1; padding-right: 14px;">
                                                    🏨
                                                </td>
                                                <td valign="top">
                                                    <div style="font-size: 15px; font-weight: 700; color: #E5C378; margin-bottom: 4px;">
                                                        Luxury Resorts to Boutique Stays
                                                    </div>
                                                    <div style="font-size: 13.5px; line-height: 1.6; color: #94a3b8;">
                                                        Exclusive rates at 5-star hotels, luxury villas, and charming budget-friendly retreats worldwide.
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Feature 3: Global Visa & Corporate Services -->
                                <tr>
                                    <td style="padding-bottom: 10px;">
                                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0e1930; border: 1px solid rgba(200, 157, 60, 0.2); border-radius: 10px; padding: 16px 20px;">
                                            <tr>
                                                <td width="42" valign="top" style="font-size: 24px; line-height: 1; padding-right: 14px;">
                                                    🌐
                                                </td>
                                                <td valign="top">
                                                    <div style="font-size: 15px; font-weight: 700; color: #E5C378; margin-bottom: 4px;">
                                                        Global Visa Assistance for 80+ Countries
                                                    </div>
                                                    <div style="font-size: 13.5px; line-height: 1.6; color: #94a3b8;">
                                                        Hassle-free visa guidance, documentation support, and corporate travel management under one roof.
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ACCOUNT DETAILS BOX -->
                    <tr>
                        <td class="mobile-padding" style="padding: 10px 40px 30px 40px; background-color: #0b1325;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(145deg, #070e1d, #0f1c35); border: 1px dashed rgba(200, 157, 60, 0.4); border-radius: 12px; padding: 22px 24px;">
                                <tr>
                                    <td style="padding-bottom: 14px; border-bottom: 1px solid rgba(200, 157, 60, 0.2);">
                                        <span style="font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #C89D3C; text-transform: uppercase;">
                                            VOYAGER ACCOUNT DETAILS
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 14px;">
                                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="font-size: 13.5px; color: #94a3b8; padding: 4px 0;">Voyager Name:</td>
                                                <td align="right" style="font-size: 13.5px; font-weight: 600; color: #ffffff; padding: 4px 0;">${name}</td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: 13.5px; color: #94a3b8; padding: 4px 0;">Registered Email:</td>
                                                <td align="right" style="font-size: 13.5px; font-weight: 600; color: #ffffff; padding: 4px 0;">${email}</td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: 13.5px; color: #94a3b8; padding: 4px 0;">Membership Status:</td>
                                                <td align="right" style="font-size: 13.5px; font-weight: 700; color: #10b981; padding: 4px 0;">Active Voyager</td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: 13.5px; color: #94a3b8; padding: 4px 0;">Date Joined:</td>
                                                <td align="right" style="font-size: 13.5px; font-weight: 500; color: #cbd5e1; padding: 4px 0;">${formattedDate}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CONCIERGE & SUPPORT NOTE -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 35px 40px; text-align: center; background-color: #0b1325;">
                            <p style="margin: 0; font-size: 13.5px; line-height: 1.7; color: #94a3b8;">
                                Have questions or dreaming of a custom destination? Our travel curators are at your service. Simply reply to this email or contact us at <a href="mailto:support@makeyourownvoyage.com" style="color: #C89D3C; text-decoration: underline;">support@makeyourownvoyage.com</a>.
                            </p>
                        </td>
                    </tr>

                    <!-- FOOTER SECTION -->
                    <tr>
                        <td align="center" style="background-color: #050b14; padding: 30px 25px; border-top: 1px solid rgba(200, 157, 60, 0.25);">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="padding-bottom: 12px;">
                                        <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: 700; color: #C89D3C; letter-spacing: 2px;">
                                            MAKE YOUR OWN VOYAGE
                                        </div>
                                        <div style="font-size: 10px; font-weight: 700; letter-spacing: 3px; color: #E5C378; text-transform: uppercase; margin-top: 4px;">
                                            EXPLORE &bull; EXPERIENCE &bull; EXTRAORDINARY
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 10px 0 16px 0;">
                                        <div style="font-size: 11px; line-height: 1.6; color: #64748b; max-width: 480px;">
                                            Luxury 5-Star Hotel &amp; Resort Reservations &bull; Global Visa Assistance for 80+ Countries &bull; Custom Leisure &amp; Corporate Travel
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-size: 11px; color: #475569; padding-top: 8px;">
                                        &copy; ${year} Make Your Own Voyage. All rights reserved.<br>
                                        You received this email because you registered on makeyourownvoyage.com.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
                <!-- End Main Container -->

            </td>
        </tr>
    </table>

</body>
</html>
    `.trim();

    const text = `
Welcome to Make Your Own Voyage, ${name}!
EXPLORE • EXPERIENCE • EXTRAORDINARY

✦ TRAVEL FOR EVERY BUDGET • POCKET-FRIENDLY TO 5-STAR LUXURY ✦

Thank you for creating your account with Make Your Own Voyage. We are a premier Travel Management Company and Tour Operator dedicated to crafting memorable journeys for every pocket — from budget-conscious explorers to discerning 5-star luxury voyagers and corporate enterprises.

YOUR ACCOUNT DETAILS:
- Name: ${name}
- Email: ${email}
- Status: Active Voyager Member
- Date Joined: ${formattedDate}

WHAT AWAITS YOU:
1. Curated & Bespoke Travel Planning: Personalized routes and handpicked adventures tailored to your schedule and passions.
2. Luxury Resorts to Boutique Stays: Exclusive reservations at 5-star resorts, luxury villas, and pocket-friendly retreats.
3. Global Visa Assistance: Guidance for 80+ countries and premier flight bookings.

Start your voyage now: ${clientUrl}

Need assistance? Reply directly to this email or write to us at support@makeyourownvoyage.com.

© ${year} Make Your Own Voyage. All rights reserved.
    `.trim();

    return { html, text };
};

/**
 * Generate a colorful, luxury branded Enquiry Confirmation Email for Make Your Own Voyage.
 */
export const enquiryConfirmationEmailTemplate = ({
    customerName,
    customerEmail,
    enquiryCode,
    enquiryType,
    detailsSummary = [],
    specialRequests = "",
}) => {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const year = new Date().getFullYear();
    const formattedDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const categoryThemes = {
        hotel: {
            title: "Hotel Reservation Enquiry",
            badgeText: "🏨 HOTEL ENQUIRY",
            gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            badgeBg: "rgba(245, 158, 11, 0.15)",
            badgeColor: "#fbbf24",
            accentColor: "#f59e0b",
        },
        flight: {
            title: "Flight Booking Enquiry",
            badgeText: "✈️ FLIGHT ENQUIRY",
            gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
            badgeBg: "rgba(6, 182, 212, 0.15)",
            badgeColor: "#38bdf8",
            accentColor: "#38bdf8",
        },
        package: {
            title: "Holiday Tour Package Enquiry",
            badgeText: "🎒 TOUR PACKAGE ENQUIRY",
            gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            badgeBg: "rgba(16, 185, 129, 0.15)",
            badgeColor: "#34d399",
            accentColor: "#10b981",
        },
        weekend_trip: {
            title: "Weekend Getaway Enquiry",
            badgeText: "⛰️ WEEKEND TRIP ENQUIRY",
            gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            badgeBg: "rgba(139, 92, 246, 0.15)",
            badgeColor: "#a78bfa",
            accentColor: "#8b5cf6",
        },
        transport: {
            title: "Cab & Transport Rental Enquiry",
            badgeText: "🚗 TRANSPORT ENQUIRY",
            gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            badgeBg: "rgba(249, 115, 22, 0.15)",
            badgeColor: "#fb923c",
            accentColor: "#f97316",
        },
        custom: {
            title: "Bespoke Travel Enquiry",
            badgeText: "✨ CUSTOM TRAVEL ENQUIRY",
            gradient: "linear-gradient(135deg, #c89d3c 0%, #d4af37 100%)",
            badgeBg: "rgba(200, 157, 60, 0.15)",
            badgeColor: "#e5c378",
            accentColor: "#c89d3c",
        },
    };

    const currentTheme = categoryThemes[enquiryType] || categoryThemes.custom;

    const detailsRowsHtml = detailsSummary
        .filter((item) => item && item.value)
        .map(
            (item) => `
            <tr>
                <td style="padding: 10px 16px; font-size: 13px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); width: 38%;">
                    ${item.label}
                </td>
                <td style="padding: 10px 16px; font-size: 14px; color: #ffffff; font-weight: 500; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    ${item.value}
                </td>
            </tr>`
        )
        .join("");

    const html = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquiry Received - Make Your Own Voyage</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        body {
            margin: 0;
            padding: 0;
            background-color: #050b14;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #cbd5e1;
        }
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .mobile-stack { display: block !important; width: 100% !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050b14;">

    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#050b14">
        <tr>
            <td align="center" style="padding: 30px 15px;">

                <!-- Main Container -->
                <table class="email-container" width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #0b1325; border: 1px solid rgba(200, 157, 60, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
                    
                    <!-- Decorative Top Header Gradient -->
                    <tr>
                        <td style="height: 6px; background: ${currentTheme.gradient}; font-size: 0; line-height: 0;">&nbsp;</td>
                    </tr>

                    <!-- Brand Header with Logo -->
                    <tr>
                        <td align="center" style="padding: 35px 25px 20px 25px; background-color: #070e1c;">
                            <img src="cid:brand-logo" alt="Make Your Own Voyage" width="170" style="display: block; width: 170px; max-width: 100%; height: auto;" />
                            <p style="margin: 10px 0 0 0; font-size: 11px; letter-spacing: 2.5px; color: #c89d3c; text-transform: uppercase; font-weight: 700;">
                                EXPLORE • EXPERIENCE • EXTRAORDINARY
                            </p>
                        </td>
                    </tr>

                    <!-- Badge & Hero Title -->
                    <tr>
                        <td align="center" style="padding: 25px 30px 15px 30px;">
                            <div style="display: inline-block; padding: 6px 16px; background-color: ${currentTheme.badgeBg}; border: 1px solid ${currentTheme.badgeColor}; border-radius: 50px; font-size: 12px; font-weight: 700; letter-spacing: 1px; color: ${currentTheme.badgeColor}; text-transform: uppercase; margin-bottom: 18px;">
                                ${currentTheme.badgeText}
                            </div>
                            <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; line-height: 34px; color: #ffffff; font-weight: 700;">
                                Thank You For Your Enquiry!
                            </h1>
                            <p style="margin: 12px 0 0 0; font-size: 15px; line-height: 24px; color: #94a3b8;">
                                We have received your request and our travel specialists will contact you shortly with the best personalized options and pricing.
                            </p>
                        </td>
                    </tr>

                    <!-- Reference Code Box -->
                    <tr>
                        <td style="padding: 10px 30px;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: rgba(200, 157, 60, 0.08); border: 1px dashed rgba(200, 157, 60, 0.4); border-radius: 10px;">
                                <tr>
                                    <td align="center" style="padding: 16px 20px;">
                                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #c89d3c; font-weight: 700; margin-bottom: 4px;">
                                            YOUR ENQUIRY REFERENCE CODE
                                        </div>
                                        <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 2px; font-family: monospace;">
                                            ${enquiryCode}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Enquiry Details Table Card -->
                    <tr>
                        <td style="padding: 20px 30px;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0e182e; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden;">
                                <tr>
                                    <td colspan="2" style="padding: 14px 16px; background-color: rgba(255, 255, 255, 0.03); border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 13px; font-weight: 700; color: #e2e8f0; letter-spacing: 0.5px; text-transform: uppercase;">
                                        📋 Enquiry Details Summary
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 16px; font-size: 13px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); width: 38%;">
                                        Customer Name
                                    </td>
                                    <td style="padding: 10px 16px; font-size: 14px; color: #ffffff; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                        ${customerName}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 16px; font-size: 13px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                        Contact Email
                                    </td>
                                    <td style="padding: 10px 16px; font-size: 14px; color: #cbd5e1; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                        ${customerEmail}
                                    </td>
                                </tr>
                                ${detailsRowsHtml}
                                ${
                                    specialRequests
                                        ? `
                                <tr>
                                    <td style="padding: 10px 16px; font-size: 13px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Special Requests
                                    </td>
                                    <td style="padding: 10px 16px; font-size: 14px; color: #f1f5f9; font-style: italic;">
                                        "${specialRequests}"
                                    </td>
                                </tr>`
                                        : ""
                                }
                            </table>
                        </td>
                    </tr>

                    <!-- What Happens Next Section -->
                    <tr>
                        <td style="padding: 10px 30px 25px 30px;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: rgba(11, 23, 47, 0.8); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; padding: 18px;">
                                <tr>
                                    <td style="padding-bottom: 12px; font-size: 14px; font-weight: 700; color: #ffffff;">
                                        ⏳ What Happens Next?
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 13px; line-height: 22px; color: #94a3b8;">
                                        <div style="margin-bottom: 8px;">
                                            <strong style="color: #38bdf8;">1. Request Review:</strong> Our destination team reviews your requested dates and inventory.
                                        </div>
                                        <div style="margin-bottom: 8px;">
                                            <strong style="color: #fbbf24;">2. Curated Quotation:</strong> We negotiate the best exclusive rates and prepare a customized quote.
                                        </div>
                                        <div>
                                            <strong style="color: #34d399;">3. Direct Consultation:</strong> Our travel specialist connects with you directly via call or WhatsApp.
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Call To Action -->
                    <tr>
                        <td align="center" style="padding: 10px 30px 30px 30px;">
                            <a href="${clientUrl}" target="_blank" style="display: inline-block; padding: 14px 34px; background: ${currentTheme.gradient}; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 1px; border-radius: 50px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);">
                                Visit Make Your Own Voyage
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 25px 30px; background-color: #060b14; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 18px;">
                                Need immediate assistance? Reply directly to this email or reach us at <strong style="color: #c89d3c;">support@makeyourownvoyage.com</strong>
                            </p>
                            <p style="margin: 10px 0 0 0; font-size: 11px; color: #475569;">
                                © ${year} Make Your Own Voyage. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
                <!-- End Main Container -->

            </td>
        </tr>
    </table>

</body>
</html>
    `.trim();

    const text = `
Thank you for your enquiry with Make Your Own Voyage, ${customerName}!

ENQUIRY REFERENCE: ${enquiryCode}
CATEGORY: ${currentTheme.title}
DATE: ${formattedDate}

We have received your enquiry and our dedicated travel specialist is currently preparing the best tailored options and pricing for you. We will contact you shortly via phone or email.

ENQUIRY DETAILS:
${detailsSummary.filter((d) => d && d.value).map((d) => `- ${d.label}: ${d.value}`).join("\n")}
${specialRequests ? `- Special Requests: ${specialRequests}\n` : ""}

WHAT HAPPENS NEXT:
1. Our destination team reviews your requested dates and inventory.
2. We negotiate the best exclusive rates and prepare a customized quote.
3. Our specialist connects with you directly.

Visit us: ${clientUrl}

© ${year} Make Your Own Voyage. All rights reserved.
    `.trim();

    return { html, text };
};

