import mongoose from "mongoose";
import Visa from "../models/visa.model.js";

const DEFAULT_SEEDED_VISAS = [
    {
        country: "Dubai / UAE",
        slug: "uae-dubai",
        flag: "🇦🇪",
        visaType: "Tourist E-Visa",
        processingTime: "24 - 48 Hours",
        validity: "60 Days",
        stayDuration: "30 / 60 Days",
        fee: 6499,
        currency: "INR",
        entryType: "Single Entry",
        isPopular: true,
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        description: "Official Dubai & UAE e-visas processed directly with GDRFA / ICP immigration portal.",
        documents: [
            { title: "Passport Copy", description: "Color scan of passport front and back pages (valid 6 months)." },
            { title: "Passport Photo", description: "White background passport photo (recent within 3 months)." },
            { title: "Return Flight Tickets", description: "Confirmed return air ticket vouchers." },
            { title: "Hotel Booking", description: "Hotel confirmation voucher in UAE." },
        ],
        steps: [
            "Submit passport scan & photo.",
            "Visa specialist verifies documents.",
            "Electronic application submitted to UAE immigration.",
            "Download approved E-Visa with QR code.",
        ],
    },
    {
        country: "Singapore",
        slug: "singapore",
        flag: "🇸🇬",
        visaType: "E-Visa (Paper Visa)",
        processingTime: "3 - 4 Working Days",
        validity: "Up to 2 Years",
        stayDuration: "30 Days per Entry",
        fee: 2850,
        currency: "INR",
        entryType: "Multiple Entry",
        isPopular: true,
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
        description: "Singapore tourist and business visa through Singapore High Commission authorized agents.",
        documents: [
            { title: "Original Passport", description: "Passport with minimum 6 months validity." },
            { title: "Form 14A", description: "Signed Singapore visa application form." },
            { title: "Matt Finish Photos", description: "2 recent photos (35x45mm, matt finish, white background)." },
            { title: "Bank Statement", description: "6 months updated bank statement." },
        ],
        steps: [
            "Complete Form 14A online.",
            "Submit original passport & documents.",
            "High Commission processing.",
            "Receive paper e-visa.",
        ],
    },
    {
        country: "Thailand",
        slug: "thailand",
        flag: "🇹🇭",
        visaType: "E-Visa / Visa on Arrival",
        processingTime: "3 - 5 Working Days",
        validity: "90 Days",
        stayDuration: "30 / 60 Days",
        fee: 3200,
        currency: "INR",
        entryType: "Single Entry",
        isPopular: true,
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
        description: "Thailand e-visa pre-approval and fast-track immigration pass.",
        documents: [
            { title: "Passport Bio Page", description: "Passport scan with 6+ months validity." },
            { title: "Photographs", description: "2 passport size photographs." },
            { title: "Roundtrip Flight Tickets", description: "Confirmed entry and return air tickets." },
            { title: "Hotel Voucher", description: "Hotel booking voucher." },
        ],
        steps: [
            "Fill Thailand e-visa form.",
            "Upload flight and hotel vouchers.",
            "Online embassy verification.",
            "Receive electronic visa grant.",
        ],
    },
    {
        country: "Schengen (Europe)",
        slug: "schengen-europe",
        flag: "🇪🇺",
        visaType: "Tourist Sticker Visa (29 Countries)",
        processingTime: "10 - 15 Working Days",
        validity: "Up to 90 Days",
        stayDuration: "90 Days within 180 Days",
        fee: 8900,
        currency: "INR",
        entryType: "Multiple Entry",
        isPopular: true,
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
        description: "Official Schengen visa consultation, appointment slot booking at VFS/BLS, and end-to-end dossier preparation.",
        documents: [
            { title: "Original Passport", description: "Passport with minimum 2 blank pages." },
            { title: "Financials & ITR", description: "Last 6 months bank statement and 3 years ITR." },
            { title: "Travel Insurance", description: "€30,000 Schengen compliant health insurance." },
            { title: "Day-wise Itinerary", description: "Detailed travel plan with confirmed reservations." },
        ],
        steps: [
            "Profile evaluation and embassy selection.",
            "VFS / BLS Biometrics appointment booking.",
            "Dossier review & submission at visa application center.",
            "Passport stamped and delivered.",
        ],
    },
    {
        country: "Vietnam",
        slug: "vietnam",
        flag: "🇻🇳",
        visaType: "Tourist E-Visa",
        processingTime: "3 Working Days",
        validity: "90 Days",
        stayDuration: "30 / 90 Days",
        fee: 2499,
        currency: "INR",
        entryType: "Single / Multi",
        isPopular: true,
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
        description: "Vietnam online electronic visa directly approved by Vietnam Immigration Department.",
        documents: [
            { title: "Passport Bio Page", description: "Clear photo or scan of bio page." },
            { title: "Portrait Photo", description: "Digital portrait photo without glasses." },
            { title: "Entry Port Details", description: "Selected airport or land border entry." },
        ],
        steps: [
            "Upload passport copy and portrait photo.",
            "Pay processing fee.",
            "Immigration verification in Hanoi.",
            "E-Visa sent via email.",
        ],
    },
    {
        country: "Indonesia (Bali)",
        slug: "indonesia-bali",
        flag: "🇮🇩",
        visaType: "Electronic VoA (e-VoA)",
        processingTime: "24 Hours",
        validity: "90 Days",
        stayDuration: "30 Days (Extendable)",
        fee: 3400,
        currency: "INR",
        entryType: "Single Entry",
        isPopular: true,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        description: "Fast-track electronic Visa on Arrival for Bali and all Indonesian airports.",
        documents: [
            { title: "Passport Copy", description: "Passport with at least 6 months validity." },
            { title: "Return Flight", description: "Confirmed outbound flight ticket." },
            { title: "Passport Photo", description: "Digital passport photograph." },
        ],
        steps: [
            "Submit passport details.",
            "Instant payment processing.",
            "e-VoA generated within 24 hours.",
            "Use e-gates upon arrival in Bali.",
        ],
    },
    {
        country: "United Kingdom (UK)",
        slug: "united-kingdom",
        flag: "🇬🇧",
        visaType: "Standard Visitor Visa",
        processingTime: "3 - 4 Weeks",
        validity: "6 Months / 2 Years",
        stayDuration: "180 Days per Visit",
        fee: 14500,
        currency: "INR",
        entryType: "Multiple Entry",
        isPopular: false,
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
        description: "Full UK tourist visa filing, VFS priority appointment booking, and financial documentation.",
        documents: [
            { title: "Passport", description: "Current and previous passports." },
            { title: "Employment & Salary", description: "Pay slips, employment letter, and Form 16." },
            { title: "Bank Statements", description: "6 months stamped bank statement." },
        ],
        steps: [
            "Online UKVI application filing.",
            "Document upload and VFS appointment booking.",
            "Biometrics submission at VFS center.",
            "Visa decision and passport courier.",
        ],
    },
    {
        country: "United States (US)",
        slug: "united-states",
        flag: "🇺🇸",
        visaType: "B1/B2 Visitor Visa",
        processingTime: "Appointment Based",
        validity: "10 Years",
        stayDuration: "Up to 180 Days",
        fee: 17800,
        currency: "INR",
        entryType: "Multiple Entry",
        isPopular: false,
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
        description: "US DS-160 filling assistance, fee payment, appointment rescheduling, and mock interview prep.",
        documents: [
            { title: "DS-160 Confirmation", description: "Submitted DS-160 barcode confirmation page." },
            { title: "Valid Passport", description: "Valid passport with interview appointment letter." },
            { title: "Financial Proofs", description: "Assets, bank balances, and employment documents." },
        ],
        steps: [
            "Fill out DS-160 application form.",
            "Pay MRV fee & schedule OFC + Consular appointments.",
            "Complete biometrics and consular interview.",
            "Receive 10-year multiple entry visa.",
        ],
    },
    {
        country: "Japan",
        slug: "japan",
        flag: "🇯🇵",
        visaType: "Tourist E-Visa",
        processingTime: "5 - 7 Working Days",
        validity: "90 Days",
        stayDuration: "15 / 30 Days",
        fee: 2750,
        currency: "INR",
        entryType: "Single Entry",
        isPopular: false,
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        description: "Japan electronic tourist visa for Indian passport holders with end-to-end itinerary assistance.",
        documents: [
            { title: "Passport Bio Page", description: "Passport with 6 months validity." },
            { title: "ITR & Bank Statement", description: "Latest Income Tax Return and bank balance." },
            { title: "Schedule of Stay", description: "Day-by-day travel plan in Japan." },
        ],
        steps: [
            "Submit passport details and financial records.",
            "Application logged on eVisa Japan portal.",
            "Embassy of Japan review.",
            "Digital Visa issuance notice sent.",
        ],
    },
];

// Helper: Seed initial visas if collection is empty
const ensureVisasSeeded = async () => {
    try {
        const count = await Visa.countDocuments();
        if (count === 0) {
            await Visa.insertMany(DEFAULT_SEEDED_VISAS);
        }
    } catch (e) {
        console.error("Auto-seeding visas error:", e);
    }
};

// 1. GET /api/visas - Get all visas
export const getAllVisas = async (req, res) => {
    try {
        await ensureVisasSeeded();
        const { search, popular, isActive } = req.query;
        const query = {};

        if (isActive !== undefined) {
            query.isActive = isActive === "true";
        } else if (req.user?.role !== "admin") {
            query.isActive = true;
        }

        if (popular === "true") {
            query.isPopular = true;
        }

        if (search) {
            query.$or = [
                { country: { $regex: search.trim(), $options: "i" } },
                { visaType: { $regex: search.trim(), $options: "i" } },
                { slug: { $regex: search.trim(), $options: "i" } },
            ];
        }

        const visas = await Visa.find(query).sort({ isPopular: -1, country: 1 });
        return res.status(200).json({
            success: true,
            count: visas.length,
            data: visas,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 2. GET /api/visas/:id - Get single visa by ID or slug
export const getVisaByIdOrSlug = async (req, res) => {
    try {
        await ensureVisasSeeded();
        const { id } = req.params;
        let visa = null;

        if (mongoose.isValidObjectId(id)) {
            visa = await Visa.findById(id);
        } else {
            visa = await Visa.findOne({ slug: id.toLowerCase() });
        }

        if (!visa) {
            return res.status(404).json({
                success: false,
                message: "Visa destination not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: visa,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 3. POST /api/visas - Create new visa (Admin)
export const createVisa = async (req, res) => {
    try {
        const visaData = { ...req.body };
        if (!visaData.country || !visaData.fee || !visaData.image) {
            return res.status(400).json({
                success: false,
                message: "Country name, fee, and image URL are required.",
            });
        }

        if (!visaData.slug) {
            visaData.slug = visaData.country.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        }

        const newVisa = await Visa.create(visaData);
        return res.status(201).json({
            success: true,
            message: "Visa package created successfully",
            data: newVisa,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 4. PUT /api/visas/:id - Update visa (Admin)
export const updateVisa = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        const updatedVisa = await Visa.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedVisa) {
            return res.status(404).json({
                success: false,
                message: "Visa not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Visa updated successfully",
            data: updatedVisa,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 5. DELETE /api/visas/:id - Delete visa (Admin)
export const deleteVisa = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Visa.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Visa not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Visa deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
