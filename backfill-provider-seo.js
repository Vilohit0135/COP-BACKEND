import 'dotenv/config'
import mongoose from 'mongoose'
import Provider from './src/models/Provider.js'

const argv = process.argv.slice(2)
const DRY_RUN = argv.includes('--dry-run')
const FORCE = argv.includes('--force') // overwrite even when fields are already set

const MAX_TITLE = 60
const MAX_DESC = 160

const truncate = (s, max) => {
  if (!s) return ''
  s = s.replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim() + '…'
}

const buildTitle = (p) => truncate(`${p.name} — Online Programs, Fees & Admissions`, MAX_TITLE)

const buildDescription = (p) => {
  if (p.shortExcerpt && p.shortExcerpt.trim()) {
    return truncate(p.shortExcerpt, MAX_DESC)
  }

  const facts = []
  const approvals = (p.approvals || []).map((a) => a?.name).filter(Boolean)
  if (approvals.length) facts.push(`${approvals.slice(0, 3).join('/')}-approved`)

  const campusCount = (p.campuses || []).length
  if (campusCount > 0) facts.push(`${campusCount} ${campusCount === 1 ? 'campus' : 'campuses'}`)

  if (p.averageRating && p.reviewCount) {
    facts.push(`rated ${p.averageRating.toFixed(1)}/5 by ${p.reviewCount} students`)
  }

  const factsStr = facts.length ? ` ${facts.join(', ')}.` : ''
  return truncate(
    `Explore online programs at ${p.name}.${factsStr} Compare courses, fees, and rankings, and talk to expert counselors.`,
    MAX_DESC,
  )
}

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set in env')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)
  console.log(`Connected. Mode: ${DRY_RUN ? 'DRY RUN' : 'WRITE'}${FORCE ? ' (force overwrite)' : ''}`)

  const providers = await Provider.find().lean()
  console.log(`Found ${providers.length} providers.\n`)

  const ops = []
  let titlesFilled = 0
  let descFilled = 0
  let skipped = 0

  for (const p of providers) {
    const update = {}

    if (FORCE || !p.metaTitle || !p.metaTitle.trim()) {
      update.metaTitle = buildTitle(p)
      titlesFilled++
    }

    if (FORCE || !p.metaDescription || !p.metaDescription.trim()) {
      update.metaDescription = buildDescription(p)
      descFilled++
    }

    if (Object.keys(update).length === 0) {
      skipped++
      continue
    }

    console.log(`• ${p.name} (${p.slug})`)
    if (update.metaTitle) console.log(`    title: ${update.metaTitle}`)
    if (update.metaDescription) console.log(`    desc:  ${update.metaDescription}`)

    ops.push({
      updateOne: {
        filter: { _id: p._id },
        update: { $set: update },
      },
    })
  }

  console.log(`\nSummary:`)
  console.log(`  Titles to fill:       ${titlesFilled}`)
  console.log(`  Descriptions to fill: ${descFilled}`)
  console.log(`  Already had values:   ${skipped}`)

  if (DRY_RUN) {
    console.log('\nDry run — no changes written. Re-run without --dry-run to apply.')
  } else if (ops.length) {
    const result = await Provider.bulkWrite(ops)
    console.log(`\nWrote ${result.modifiedCount} documents.`)
  } else {
    console.log('\nNothing to write.')
  }

  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
