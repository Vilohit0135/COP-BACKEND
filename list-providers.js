import 'dotenv/config'
import mongoose from 'mongoose'
import Provider from './src/models/Provider.js'

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  const providers = await Provider.find().select('_id name').lean()
  console.log(JSON.stringify(providers, null, 2))
  await mongoose.disconnect()
}

run().catch(console.error)
