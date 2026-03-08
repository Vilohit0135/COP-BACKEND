import mongoose from "mongoose"

const activitySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String },
    action: {
      type: String,
      enum: ["create", "update", "delete", "view"],
      required: true,
    },
    section: {
      type: String,
      enum: [
        "leads", "courses", "blogs", "providers", "specializations",
        "degree-types", "provider-courses", "reviews",
        "home-hero-section", "home-industry-experts-section",
        "home-program-experts-section", "home-questions-section",
        "pages", "page-content",
      ],
      required: true,
    },
    itemId: { type: String },
    itemName: { type: String },
    details: { type: String },
    ipAddress: { type: String },
    status: { type: String, enum: ["success", "failed"], default: "success" },
  },
  { timestamps: true }
)

activitySchema.index({ userId: 1, createdAt: -1 })
activitySchema.index({ section: 1, createdAt: -1 })
activitySchema.index({ createdAt: -1 })




export default mongoose.models.Activity || mongoose.model("Activity", activitySchema, "activities")
