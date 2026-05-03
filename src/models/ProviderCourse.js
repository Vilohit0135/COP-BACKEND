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
    minFees: { type: Number },
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
    approvals: [{ type: String, trim: true }],
    highlights: [{ type: String, trim: true }],
    contentBlocks: [{ type: mongoose.Schema.Types.Mixed }],

    // EMI configuration (was used by CMS form but not persisted before)
    isEmiAvailable: { type: Boolean, default: false },
    emiStartingAmount: { type: String, trim: true },
    emiTerms: { type: String, trim: true },

    // Logistics
    intakeMonths: { type: String, trim: true }, // e.g. "Jan / Jul"
    language: { type: String, trim: true, default: "English" },

    // UI: Learning Outcomes (what learners will gain)
    learningOutcomes: [{ type: String, trim: true }],

    // UI: Target Audience
    whoShouldEnroll: [{ type: String, trim: true }],

    // UI: Program Structure (program-level modules / semesters)
    programStructure: [
      {
        title: { type: String, trim: true },
        topics: [{ type: String, trim: true }],
      },
    ],

    // UI: Career Outcomes (program-specific)
    careerOutcomes: {
      topRoles: [{ type: String, trim: true }],
      averagePackage: { type: String, trim: true },
      topRecruiters: [{ type: String, trim: true }],
    },

    // UI: Placement Support services offered with this program
    placementSupport: [{ type: String, trim: true }],

    // UI: Key Admission Dates
    keyDates: [
      {
        event: { type: String, trim: true },
        date: { type: String, trim: true },
      },
    ],

    // UI: FAQs specific to this program
    faqs: [
      {
        question: { type: String, trim: true },
        answer: { type: String, trim: true },
      },
    ],

    bestROI: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
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
providerCourseSchema.index({ bestROI: 1 })
providerCourseSchema.index({ trending: 1 })
providerCourseSchema.index({ slug: 1 }, { unique: true })

providerCourseSchema.pre("save", async function (next) {
  if (this.bestROI) {
    await this.constructor.updateMany(
      { providerId: this.providerId, _id: { $ne: this._id } },
      { $set: { bestROI: false } }
    )
  }
  if (this.trending) {
    await this.constructor.updateMany(
      { providerId: this.providerId, _id: { $ne: this._id } },
      { $set: { trending: false } }
    )
  }
  next()
})

export default mongoose.models.ProviderCourse || mongoose.model("ProviderCourse", providerCourseSchema, "providercourses")
