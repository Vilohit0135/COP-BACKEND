import 'dotenv/config'
import mongoose from 'mongoose'
import Course from './src/models/Course.js'
import Provider from './src/models/Provider.js'
import Leads from './src/models/Leads.js'
import Review from './src/models/Review.js'

async function check() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to DB')
    const [courses, providers, leads, reviews] = await Promise.all([
        Course.countDocuments(),
        Provider.countDocuments(),
        Leads.countDocuments(),
        Review.countDocuments(),
    ])
    console.log({ courses, providers, leads, reviews })
    await mongoose.disconnect()
}

check().catch(console.error)
