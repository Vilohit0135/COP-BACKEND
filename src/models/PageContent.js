import mongoose from "mongoose"

const pageContentSchema = new mongoose.Schema(
  {
    pageSlug: { type: String, required: true, index: true },
    sectionApiId: { type: String, required: true, index: true },
    sectionIndex: { type: Number, required: true, index: true },
    itemIndex: { type: Number, default: 0 },
    values: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

pageContentSchema.index({ pageSlug: 1, sectionIndex: 1, itemIndex: 1 })
pageContentSchema.index({ pageSlug: 1, sectionApiId: 1, itemIndex: 1 })

export default mongoose.models.PageContent || mongoose.model("PageContent", pageContentSchema)
