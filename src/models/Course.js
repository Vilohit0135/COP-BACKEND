import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    degreeTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "DegreeType", required: true },
    approvals: [{ type: String, trim: true }],
    
    // UI: Program Highlights
    highlights: [
      {
        title: { type: String },
        description: { type: String },
        icon: { type: String }, // Tabler icon name or URL
      },
    ],

    // UI: Eligibility Criteria (General)
    eligibilityCriteria: [
      {
        title: { type: String },
        points: [{ type: String }],
      },
    ],

    // UI: Curriculum Structure
    curriculum: [
      {
        semester: { type: String },
        subjects: [{ type: String }],
      },
    ],

    // UI: Potential Career Roles
    careerRoles: [{ type: String }],

    // UI: Salary Growth & Placement Highlights
    careerStats: {
      salaryGrowth: [
        { year: { type: String }, value: { type: Number } }
      ],
      placementPercentage: { type: Number, default: 95 },
      highCTC: { type: String },
      avgCTC: { type: String },
      hiringPartners: { type: String },
    },

    // UI: Frequently Asked Questions
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],

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
