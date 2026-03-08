# COP Backend — Node.js + Express API

Full backend for COP CMS and client website.

---

## Stack
- **Node.js** (ESM modules, `"type": "module"`)
- **Express** — HTTP server
- **MongoDB + Mongoose** — database
- **Clerk** — CMS admin authentication (`@clerk/express`)
- **Nodemailer** — invite emails
- **Nodemon** — dev auto-reload

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in all values in .env
```

### 3. Run in development
```bash
npm run dev
```

### 4. Run in production
```bash
npm start
```

---

## Folder Structure

```
cop-backend/
├── src/
│   ├── server.js               ← Entry point
│   ├── lib/
│   │   ├── db.js               ← MongoDB connection
│   │   ├── activityLogger.js   ← Log CMS actions
│   │   └── clerkHelper.js      ← Get Clerk user info
│   ├── middleware/
│   │   └── auth.js             ← Clerk verify + section access control
│   ├── models/
│   │   ├── Activity.js
│   │   ├── Blog.js
│   │   ├── Course.js
│   │   ├── DegreeType.js
│   │   ├── Invite.js
│   │   ├── Leads.js
│   │   ├── Page.js
│   │   ├── PageContent.js
│   │   ├── Provider.js
│   │   ├── ProviderCourse.js
│   │   ├── Review.js
│   │   ├── Specialization.js
│   │   └── User.js
│   └── routes/
│       ├── admin/              ← All protected by Clerk
│       │   ├── activities.js
│       │   ├── blogs.js
│       │   ├── courses.js
│       │   ├── dashboard.js
│       │   ├── degreeTypes.js
│       │   ├── leads.js
│       │   ├── pages.js        ← includes /[slug]/content sub-routes
│       │   ├── providerCourses.js
│       │   ├── providers.js
│       │   ├── reviews.js
│       │   ├── specializations.js
│       │   └── users.js
│       ├── auth/               ← Custom invite system (no Clerk)
│       │   ├── index.js
│       │   ├── sendInvite.js
│       │   └── setPassword.js
│       └── public/             ← No auth required
│           ├── index.js
│           ├── leads.js
│           ├── providers.js
│           ├── blogs.js
│           └── pageContent.js
├── .env.example
├── package.json
└── README.md
```

---

## API Reference

### Auth (No auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/send-invite` | Send invite email with set-password link |
| POST | `/api/auth/set-password` | Set password, create Clerk user + MongoDB user |

### Public (No auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/public/leads` | Submit lead from website form |
| GET | `/api/public/providers` | List published providers |
| GET | `/api/public/providers/:slug` | Single provider |
| GET | `/api/public/providers/:slug/reviews` | Provider reviews |
| GET | `/api/public/providers/:slug/courses` | Provider courses |
| GET | `/api/public/blogs` | List published blogs |
| GET | `/api/public/blogs/:slug` | Single blog |
| GET | `/api/public/page-content/:slug` | Page + content |

### Admin — Activities (Clerk required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/activities` | Get logs (filter: userId, section, limit, skip) |
| DELETE | `/api/admin/activities/clear` | Clear all logs |

### Admin — Dashboard (Clerk required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard/stats` | courses, providers, leads, reviews counts |
| GET | `/api/admin/dashboard/leads-by-source` | Lead source breakdown |
| GET | `/api/admin/dashboard/reviews-by-rating` | Rating distribution |

### Admin — Blogs, Courses, Degree Types, Leads, Provider Courses, Providers, Reviews, Specializations (Clerk required)
All follow the same CRUD pattern:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/{resource}` | List all |
| POST | `/api/admin/{resource}` | Create |
| GET | `/api/admin/{resource}/:id` | Get one |
| PUT | `/api/admin/{resource}/:id` | Update |
| DELETE | `/api/admin/{resource}/:id` | Delete |

### Admin — Pages (Clerk required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/pages` | List all pages |
| POST | `/api/admin/pages` | Create page |
| GET | `/api/admin/pages/:slug` | Get page |
| PUT | `/api/admin/pages/:slug` | Update page |
| DELETE | `/api/admin/pages/:slug` | Delete page |
| GET | `/api/admin/pages/:slug/content` | Get page content items |
| POST | `/api/admin/pages/:slug/content` | Save page content item |
| DELETE | `/api/admin/pages/:slug/content` | Delete page content item |

### Admin — Users (Clerk required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all active users |
| PUT | `/api/admin/users/:clerkId` | Update role/access/status |
| DELETE | `/api/admin/users/:clerkId` | Delete user |

---

## Connecting your Next.js frontend

Update all your API calls from:
```js
fetch("/api/admin/providers")
```
To:
```js
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/providers`, {
  headers: {
    Authorization: `Bearer ${await getToken()}` // Clerk session token
  }
})
```

Add to your Next.js `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```
