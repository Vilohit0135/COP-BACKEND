import 'dotenv/config'
import mongoose from 'mongoose'
import Course from './src/models/Course.js'
import DegreeType from './src/models/DegreeType.js'
import Provider from './src/models/Provider.js'

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  const courses = await Course.find()
    .populate('degreeTypeId', 'name slug')
    .populate('universities', 'name')
    .lean()

  // Print summary only
  for (const c of courses) {
    console.log('---')
    console.log('id:', c._id.toString())
    console.log('name:', c.name)
    console.log('slug:', c.slug)
    console.log('degreeType:', c.degreeTypeId?.name, '/', c.degreeTypeId?.slug)
    console.log('shortDescription:', c.shortDescription || '(empty)')
    console.log('description:', (c.description || '').slice(0, 80))
    console.log('duration:', c.duration || '(empty)')
    console.log('feeStarting:', c.feeStarting ?? '(empty)')
    console.log('icon:', c.icon ? '(set)' : '(empty)')
    console.log('approvals:', c.approvals?.length || 0)
    console.log('highlights:', c.highlights?.length || 0)
    console.log('eligibilityCriteria:', c.eligibilityCriteria?.length || 0)
    console.log('curriculum:', c.curriculum?.length || 0)
    console.log('careerRoles:', c.careerRoles?.length || 0)
    console.log('careerStats:', c.careerStats ? 'has' : 'none')
    console.log('  - salaryGrowth:', c.careerStats?.salaryGrowth?.length || 0)
    console.log('  - placement %:', c.careerStats?.placementPercentage ?? '(empty)')
    console.log('  - highCTC:', c.careerStats?.highCTC ?? '(empty)')
    console.log('  - avgCTC:', c.careerStats?.avgCTC ?? '(empty)')
    console.log('  - hiringPartners:', c.careerStats?.hiringPartners ?? '(empty)')
    console.log('faqs:', c.faqs?.length || 0)
    console.log('contentBlocks:', c.contentBlocks?.length || 0)
    console.log('universities:', c.universities?.length || 0)
    console.log('isTrending:', c.isTrending)
    console.log('isActive:', c.isActive)
  }

  await mongoose.disconnect()
}

run().catch(console.error)
