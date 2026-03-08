import mongoose from "mongoose"

const leadsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    courseOfInterest: { type: String },
    message: { type: String },
    callStatus: {
      type: String,
      enum: ["pending", "called", "did_not_answer", "called_and_helped", "need_follow_up", "schedule_call"],
      default: "pending",
    },
    notes: { type: String },
    assignedTo: { type: String },
    lastUpdated: { type: Date, default: null },
    scheduledCallDate: { type: Date },
    isActive: { type: Boolean, default: true },
    source: { type: String, default: "website_form" },
  },
  { timestamps: true }
)

leadsSchema.index({ email: 1 })
leadsSchema.index({ phone: 1 })
leadsSchema.index({ callStatus: 1 })
leadsSchema.index({ createdAt: -1 })
leadsSchema.index({ assignedTo: 1 })

export default mongoose.models.Leads || mongoose.model("Leads", leadsSchema)
