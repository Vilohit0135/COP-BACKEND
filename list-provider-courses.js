import 'dotenv/config'
import mongoose from 'mongoose'
import ProviderCourse from './src/models/ProviderCourse.js'
import Provider from './src/models/Provider.js'
import Course from './src/models/Course.js'
import DegreeType from './src/models/DegreeType.js'
import Specialization from './src/models/Specialization.js'

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  const pcs = await ProviderCourse.find()
    .populate('providerId', 'name slug')
    .populate('courseId', 'name slug')
    .populate('degreeTypeId', 'name slug')
    .populate('specializationId', 'name slug')
    .lean()
  for (const p of pcs) {
    console.log('---')
    console.log('id:', p._id.toString())
    console.log('title:', p.title)
    console.log('slug:', p.slug)
    console.log('provider:', p.providerId?.name)
    console.log('course:', p.courseId?.name)
    console.log('specialization:', p.specializationId?.name)
    console.log('degreeType:', p.degreeTypeId?.name)
    console.log('shortDescription:', p.shortDescription || '(empty)')
    console.log('thumbnail:', p.thumbnail ? '(set)' : '(empty)')
    console.log('fees:', p.fees, 'discountedFees:', p.discountedFees, 'minFees:', p.minFees)
    console.log('duration:', p.duration, 'mode:', p.mode || '(empty)')
    console.log('eligibility:', p.eligibility)
    console.log('seatsAvailable:', p.seatsAvailable, 'weeklyEffort:', p.weeklyEffort)
    console.log('examPattern:', p.examPattern || '(empty)')
    console.log('approvals:', p.approvals?.length || 0, 'highlights:', p.highlights?.length || 0, 'contentBlocks:', p.contentBlocks?.length || 0)
    console.log('feesBreakdown:', p.feesBreakdown?.length || 0)
    console.log('brochureUrl:', p.brochureUrl ? '(set)' : '(empty)')
    console.log('isEmiAvailable:', p.isEmiAvailable)
    console.log('emiStartingAmount:', p.emiStartingAmount || '(empty)')
    console.log('emiTerms:', p.emiTerms || '(empty)')
    console.log('employerAcceptance:', p.employerAcceptance, 'difficultyLevel:', p.difficultyLevel)
    console.log('bestROI:', p.bestROI, 'trending:', p.trending, 'isActive:', p.isActive)
  }
  console.log(`\nTotal: ${pcs.length}`)
  await mongoose.disconnect()
}

run().catch(console.error)
