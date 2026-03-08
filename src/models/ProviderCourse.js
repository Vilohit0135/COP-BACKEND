import mongoose from "mongoose"

const providerCourseSchema = new mongoose.Schema(
  {
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
    degreeTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "DegreeType", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    specializationId: { type: mongoose.Schema.Types.ObjectId, ref: "Specialization", default: null },
    title: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    shortDescription: String,
    thumbnail: String,
    fees: { type: Number, required: true },
    discountedFees: { type: Number },
    duration: { type: String },
    mode: { type: String },
    eligibility: { type: String },
    seatsAvailable: { type: Number },
    brochureUrl: { type: String },
    feesBreakdown: [{ label: String, amount: Number }],
    weeklyEffort: { type: Number },
    examPattern: { type: String },
    employerAcceptance: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    difficultyLevel: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Intermediate" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

providerCourseSchema.index({ providerId: 1, courseId: 1, specializationId: 1 }, { unique: true })
providerCourseSchema.index({ courseId: 1 })
providerCourseSchema.index({ specializationId: 1 })
providerCourseSchema.index({ providerId: 1 })
providerCourseSchema.index({ degreeTypeId: 1 })
providerCourseSchema.index({ isActive: 1 })
providerCourseSchema.index({ slug: 1 }, { unique: true })

export default mongoose.models.ProviderCourse || mongoose.model("ProviderCourse", providerCourseSchema, "providercourses")
