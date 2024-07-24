import mongoose from 'mongoose'
import config from '../config/environments'

mongoose
  .connect(`${config.db}`)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Could not connect to DB', config.db)
    console.log(error)
    process.exit(1)
  })
