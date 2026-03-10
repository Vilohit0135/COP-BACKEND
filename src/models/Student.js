import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        phone: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        courseOfInterest: { type: String },
        metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    { timestamps: true }
)

// Hash password before saving
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Compare password method
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.Student || mongoose.model("Student", studentSchema)
