import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String },
    content: { type: mongoose.Schema.Types.Mixed }, // Rich text / HTML
    coverImage: { type: String },
    author: { type: String },
    tags: [{ type: String }],
    category: { type: String },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
  },
  { timestamps: true }
)


blogSchema.index({ isPublished: 1 })
blogSchema.index({ createdAt: -1 })
blogSchema.index({ title: "text", excerpt: "text" })

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema, "blogs")
