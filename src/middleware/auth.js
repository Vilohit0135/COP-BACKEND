import { clerkMiddleware, requireAuth } from "@clerk/express"
import { connectDB } from "../lib/db.js"
import User from "../models/User.js"

// ── Route → section mapping ───────────────────────────────────────────────────
export const ROUTE_SECTION_MAP = {
  "/api/admin/pages": "pages",
  "/api/admin/blogs": "blogs",
  "/api/admin/providers": "providers",
  "/api/admin/courses": "courses",
  "/api/admin/degree-types": "degree-types",
  "/api/admin/specializations": "specializations",
  "/api/admin/provider-courses": "provider-courses",
  "/api/admin/leads": "leads",
  "/api/admin/reviews": "reviews",
  "/api/admin/users": "users",
  "/api/admin/activities": "activities",
}

/**
 * Get section from request path
 */
function getSectionFromPath(pathname) {
  // Exact match first
  if (ROUTE_SECTION_MAP[pathname]) return ROUTE_SECTION_MAP[pathname]

  // Prefix match (e.g. /api/admin/pages/some-slug)
  for (const [route, section] of Object.entries(ROUTE_SECTION_MAP)) {
    if (pathname.startsWith(route)) return section
  }

  return null
}

/**
 * Check if user has access to a section
 */
function hasAccessToSection(section, user) {
  if (user.role === "admin") return true
  return user.access?.includes(section) ?? false
}

// ── Clerk middleware (verifies JWT token on all admin routes) ─────────────────
export const withClerk = clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
})

/**
 * Express middleware: verify Clerk token + check section permissions
 * Attach `req.dbUser` for use in route handlers
 */
export async function requireAdminAuth(req, res, next) {
  try {
    console.log("[Auth] Request processing:", req.baseUrl + req.path);
    console.log("[Auth] Auth header:", req.headers.authorization ? "Present (Starts with: " + req.headers.authorization.slice(0, 15) + "...)" : "Missing");

    // Check if auth is a function (due to Clerk deprecation) or an object
    const auth = typeof req.auth === "function" ? req.auth() : req.auth;

    if (!auth?.userId) {
      console.warn("[Auth] No userId found in req.auth. Path:", req.path);
      // Log what IS in req.auth for debugging
      console.log("[Auth] req.auth type:", typeof req.auth);
      console.log("[Auth] req.auth keys:", auth ? Object.keys(auth) : "null/undefined");
      return res.status(401).json({ error: "Unauthorized: Please log in" });
    }

    console.log("[Auth] User identified from Clerk:", auth.userId);
    await connectDB();

    // Find user in MongoDB by Clerk ID
    const user = await User.findOne({ clerkId: auth.userId })
    if (!user) {
      return res.status(404).json({ error: "User not found in system" })
    }

    if (!user.isActive) {
      return res.status(403).json({ error: "User account is inactive" })
    }

    // Check section-level access
    const section = getSectionFromPath(req.path === "/" ? req.baseUrl : req.baseUrl + req.path)
    if (section && !hasAccessToSection(section, user)) {
      return res.status(403).json({ error: `Access denied to ${section} section` })
    }

    // Attach user to request for use in handlers
    req.dbUser = user
    req.clerkUserId = auth.userId
    next()
  } catch (err) {
    console.error("❌ Auth middleware error:", err.message)
    return res.status(500).json({ error: "Internal server error" })
  }
}
