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
        dateOfBirth: { type: Date },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true },
        currentEducation: { type: String, trim: true },
        occupation: { type: String, trim: true },
        currentCompanyOrUniversity: { type: String, trim: true },
        shortlistedUniversities: [
            {
                providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
                name: { type: String, required: true, trim: true },
                logo: { type: String },
                rating: { type: Number, default: 0 },
                approvals: [{ name: String, logo: String }],
                startingFee: { type: Number },
                minimumDuration: { type: String },
                courses: [
                    {
                        title: String,
                        duration: String,
                        feeStartingFrom: Number,
                    },
                ],
                states: [{ type: String }],
                createdAt: { type: Date, default: Date.now },
            },
        ],
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
