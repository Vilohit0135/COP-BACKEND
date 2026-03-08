import { connectDB } from "./db.js"
import Activity from "../models/Activity.js"

/**
 * Log an activity to the Activity collection
 */
export async function logActivity(options) {
  try {
    await connectDB()

    const activity = await Activity.create({
      userId: options.userId,
      userName: options.userName,
      userEmail: options.userEmail || "",
      action: options.action,
      section: options.section,
      itemId: options.itemId || null,
      itemName: options.itemName || null,
      details: options.details || null,
      ipAddress: options.ipAddress || null,
      status: "success",
    })

    return activity
  } catch (error) {
    console.error("Error logging activity:", error)
    // Never throw — logging must not break main operations
    return null
  }
}

/**
 * Get activity logs with filters + pagination
 */
export async function getActivityLogs(filters = {}) {
  try {
    await connectDB()

    const query = {}
    if (filters.userId) query.userId = filters.userId
    if (filters.section) query.section = filters.section

    const limit = filters.limit || 50
    const skip = filters.skip || 0

    return await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
  } catch (error) {
    console.error("Error fetching activity logs:", error)
    return []
  }
}

/**
 * Get total count of activities
 */
export async function getActivityCount(filters = {}) {
  try {
    await connectDB()

    const query = {}
    if (filters.userId) query.userId = filters.userId
    if (filters.section) query.section = filters.section

    return await Activity.countDocuments(query)
  } catch (error) {
    console.error("Error counting activities:", error)
    return 0
  }
}
