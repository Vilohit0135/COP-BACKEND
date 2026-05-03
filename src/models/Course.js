import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    degreeTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "DegreeType", required: true },
    approvals: [{ type: String, trim: true }],
    highlights: [{ type: String, trim: true }],
    contentBlocks: [{ type: mongoose.Schema.Types.Mixed }],
    description: { type: String, trim: true },
    shortDescription: { type: String, trim: true },
    duration: { type: String, trim: true },
    feeStarting: { type: Number },
    icon: { type: String },
    universities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Provider" }],
    isTrending: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

courseSchema.index({ slug: 1, degreeTypeId: 1 }, { unique: true })
courseSchema.index({ degreeTypeId: 1 })
courseSchema.index({ isActive: 1 })

export default mongoose.models.Course || mongoose.model("Course", courseSchema, "courses")
