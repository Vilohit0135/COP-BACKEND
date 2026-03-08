import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema(
  {
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, required: true, trim: true },
    comment: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    source: { type: String, default: "website_form", enum: ["website_form", "manual", "import"] },
  },
  { timestamps: true }
)

export default mongoose.models.Review || mongoose.model("Review", reviewSchema)
