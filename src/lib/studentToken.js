import jwt from "jsonwebtoken"

export const generateStudentToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })

export const sanitizeStudent = (student) => {
    const obj = student.toObject ? student.toObject() : { ...student }
    delete obj.password
    delete obj.resetPasswordToken
    delete obj.resetPasswordExpires
    return obj
}
