import express from 'express'
import { configDotenv } from "dotenv"
import cors from 'cors'

import connectToDatabase from "./config/database.js"
import userRouter from './routes/userRouter.js'
import trainerProfileRouter from './routes/trainerProfileRouter.js'
import userProfileRouter from './routes/userProfileRouter.js'


configDotenv()
connectToDatabase() 

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/profile', userProfileRouter)
app.use('/api/trainer', trainerProfileRouter)

app.listen(3000, ()=>{
    console.log('Server is running..');    
})