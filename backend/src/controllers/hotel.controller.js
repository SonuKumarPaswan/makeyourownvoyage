import mongoose from "mongoose";
import Hotel from "../models/hotel.model.js";
import { generateSlug } from "../utils/generateHotelSlug.js";

// 1. POST /create - Hotel create karne ke liye
export const addHotel = async (req, res) => {
  try {
    const hotelData = { ...req.body };

    // Agar client ne slug nahi bheja toh name aur city se auto-generate karega
    if (!hotelData.slug && hotelData.name) {
      const cityPart = hotelData.location?.city || "";
      hotelData.slug = `${generateSlug(hotelData.name)}${cityPart ? `-${generateSlug(cityPart)}` : ""}`;
    }

    // Check duplicate slug
    const existingHotel = await Hotel.findOne({ slug: hotelData.slug });
    if (existingHotel) {
      return res.status(409).json({
        success: false,
        message: "Hotel with this slug or name already exists in this location.",
      });
    }

    const hotel = await Hotel.create(hotelData);

    return res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create hotel",
      error: error.message,
    });
  }
};

// 2. GET /get-all - Saare hotels fetch karne ke liye (Admin with pagination)
export const getAllHotelsAdmin = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;

    const [hotels, totalHotels] = await Promise.all([
      Hotel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Hotel.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      totalHotels,
      totalPages: Math.ceil(totalHotels / limit),
      currentPage: page,
      hotels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
      error: error.message,
    });
  }
};

// 3. GET /:id - Single hotel fetch karne ke liye by ID
export const getHotelByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID format",
      });
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotel details",
      error: error.message,
    });
  }
};

// 4. PUT /:id - Hotel update/edit karne ke liye
export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID format",
      });
    }

    const updates = { ...req.body };

    // Agar name ya city update ho raha hai aur explicit slug nahi diya gaya
    if ((updates.name || updates.location?.city) && !updates.slug) {
      const existingHotel = await Hotel.findById(id).select("name location.city");
      if (!existingHotel) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
        });
      }

      const targetName = updates.name || existingHotel.name;
      const targetCity = updates.location?.city || existingHotel.location?.city || "";
      updates.slug = `${generateSlug(targetName)}${targetCity ? `-${generateSlug(targetCity)}` : ""}`;

      // Slug collision check
      const slugClash = await Hotel.findOne({
        slug: updates.slug,
        _id: { $ne: id },
      });

      if (slugClash) {
        return res.status(409).json({
          success: false,
          message: "Updated name/city generates a slug that already belongs to another hotel.",
        });
      }
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      hotel: updatedHotel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update hotel",
      error: error.message,
    });
  }
};

// 5. DELETE /:id - Hotel delete karne ke liye
export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID format",
      });
    }

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
      deletedHotelId: id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete hotel",
      error: error.message,
    });
  }
};