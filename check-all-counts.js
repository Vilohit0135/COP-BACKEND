import 'dotenv/config'
import mongoose from 'mongoose'

async function check() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to DB')
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('Collections:', collections.map(c => c.name))
    for (const c of collections) {
        const count = await mongoose.connection.db.collection(c.name).countDocuments()
        console.log(`${c.name}: ${count}`)
    }
    await mongoose.disconnect()
}

check().catch(console.error)
