// src/services/indexnow.service.js
import dotenv from "dotenv";
dotenv.config();

export const pushUrlsToIndexNow = async (urlList = []) => {
    try {
        if (!urlList || urlList.length === 0) return null;

        const host = process.env.SITE_HOST || "makeyourownvoyage.com";
        const key = process.env.INDEXNOW_KEY || "f20cf068aabc4a5c87d6fd39b71f7bcf";
        const keyLocation = `https://${host}/${key}.txt`;

        const payload = {
            host,
            key,
            keyLocation,
            urlList,
        };

        const response = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(payload),
        });

        console.log(`[IndexNow] Sent ${urlList.length} URLs. Status code: ${response.status}`);
        return response.status;
    } catch (error) {
        console.error("[IndexNow Error] Push failed:", error.message);
        return null;
    }
};