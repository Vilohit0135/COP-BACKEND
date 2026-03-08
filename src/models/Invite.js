import mongoose from "mongoose"

const inviteSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    access: { type: [String], default: [] },
    role: { type: String, enum: ["admin", "viewer"], default: "viewer" },
    passwordSetupTokenHash: { type: String, required: true },
    passwordSetupExpiresAt: { type: Date, required: true },
    status: { type: String, enum: ["pending", "accepted", "expired"], default: "pending" },
    acceptedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

inviteSchema.index({ passwordSetupExpiresAt: 1 })


export default mongoose.models.Invite || mongoose.model("Invite", inviteSchema)
