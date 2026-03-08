import mongoose from "mongoose"

const specializationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

specializationSchema.index({ slug: 1, courseId: 1 }, { unique: true })
specializationSchema.index({ courseId: 1 })
specializationSchema.index({ isActive: 1 })

export default mongoose.models.Specialization || mongoose.model("Specialization", specializationSchema, "specializations")
