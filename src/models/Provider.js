import mongoose from "mongoose"

const providerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    logo: { type: String },
    coverImage: { type: String },
    galleryImages: [{ type: String }],
    shortExcerpt: { type: String },
    type: { type: String, enum: ["University", "Edtech", "Platform"], default: "University" },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    publicationStatus: { type: String, enum: ["draft", "published"], default: "draft" },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    ratingBreakdown: {
      averageRating: { type: Number, default: 0 },
      digitalInfrastructure: { type: Number, default: 0 },
      curriculum: { type: Number, default: 0 },
      valueForMoney: { type: Number, default: 0 },
    },
    aboutContent: { type: mongoose.Schema.Types.Mixed },
    admissionProcess: { type: mongoose.Schema.Types.Mixed },
    financialAid: { type: mongoose.Schema.Types.Mixed },
    examinationPattern: { type: mongoose.Schema.Types.Mixed },
    careerServices: { type: mongoose.Schema.Types.Mixed },
    additionalContent: { type: mongoose.Schema.Types.Mixed },
    scholarships: [{ category: String, scholarshipCredit: String, eligibility: String }],
    approvals: [{ name: String, logo: String }],
    rankings: [{ title: String, description: String }],
    facts: [{ icon: String, text: String }],
    campuses: [{ city: String, state: String, country: String }],
    placementPartners: [{ name: String, logo: String }],
    sampleCertificateImage: { type: String },
    admissionOpen: {
      isOpen: { type: Boolean, default: false },
      year: String,
      text: String,
    },
    faq: [{ question: String, answer: String }],
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    canonicalUrl: String,
  },
  { timestamps: true }
)


providerSchema.index({ isActive: 1 })
providerSchema.index({ isFeatured: -1 })
providerSchema.index({ publicationStatus: 1 })
providerSchema.index({ name: "text", shortExcerpt: "text" })

export default mongoose.models.Provider || mongoose.model("Provider", providerSchema, "providers")
