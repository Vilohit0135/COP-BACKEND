import { clerkClient } from "@clerk/express"

/**
 * Get formatted user info from a Clerk userId
 * Used in route handlers after clerkMiddleware has verified the token
 * @param {string} userId - Clerk user ID (from req.auth.userId)
 */
export async function getClerkUserInfo(userId) {
  try {
    if (!userId) {
      return { userId: null, userName: "Unknown User", userEmail: "" }
    }

    const user = await clerkClient.users.getUser(userId)

    let userName = ""
    if (user.firstName && user.lastName) {
      userName = `${user.firstName} ${user.lastName}`
    } else if (user.firstName) {
      userName = user.firstName
    } else if (user.username) {
      userName = user.username
    } else if (user.emailAddresses?.[0]) {
      userName = user.emailAddresses[0].emailAddress.split("@")[0]
    } else {
      userName = user.id.substring(0, 8)
    }

    const userEmail =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress ||
      ""

    return { userId: user.id, userName, userEmail }
  } catch (err) {
    console.error("Error fetching Clerk user:", err.message)
    return { userId, userName: "Unknown User", userEmail: "" }
  }
}
