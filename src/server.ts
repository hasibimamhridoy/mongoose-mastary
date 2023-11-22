import mongoose from 'mongoose'
import app from './app'
import config from './config'


async function main() {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@hasibimamdev.t85yt75.mongodb.net/mongooseMastary?retryWrites=true&w=majority`

  await mongoose.connect(uri as string)
  console.log('🛢 Database is connected successfully')

  app.listen(config.port, () => {
    console.log(`🛢 Application running port ${config.port}`)
  })
}

main()
