import express from 'express'
import { configDotenv } from "dotenv"
import cors from 'cors'

import connectToDatabase from "./config/database.js"
import userRouter from './routes/userRouter.js'
import trainerProfileRouter from './routes/trainerProfileRouter.js'
import userProfileRouter from './routes/userProfileRouter.js'
import paymentPlanRouter from './routes/paymentPlanMasterRouter.js'
import userTrainerRouter from './routes/userTrainerRouter.js'
import userPaymentRouter from './routes/userPaymentRouter.js'
import foodMasterRouter from './routes/foodMasterRouter.js'
import exerciseMasterRouter from './routes/exerciseMasterRouter.js'
import workOutPlanRouter from './routes/workOutPlanRouter.js'
import dietPlanRouter from './routes/dietPlanMasterRouter.js'
import targetGoalRouter from './routes/targetRoleRouter.js'
import foodTrackerRouter from './routes/userFoodTracketRouter.js'
import bodyMeasurementRouter from './routes/bodyMeasurementRouter.js'
import workOutTrackerRouter from './routes/userWorkOutTrackerRouter.js'
import userDietPlanRouter from './routes/userDietPlanRouter.js'
import userWorkOutPlanRouter from './routes/userWorkOutPlanRouter.js'
import paymentGatewayRouter from './routes/paymentGatewayRouter.js'
import reportRouter from './routes/reportRouter.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})


configDotenv()
await connectToDatabase() 

app.get("/test-db", async (req, res) => {
  try {
    const dbName = mongoose.connection.name;
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      status: "connected",
      database: dbName,
      collections: collections.map(c => c.name),
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


//For admin
app.use('/api/user', userRouter)
app.use('/api/trainer', trainerProfileRouter)
app.use('/api/usertrainer', userTrainerRouter)
app.use('/api/fitplans', paymentPlanRouter)
app.use('/api/reports', reportRouter)


//For trainer
app.use('/api/foodMaster', foodMasterRouter)
app.use('/api/dietPlan', dietPlanRouter)
app.use('/api/exerciseMaster', exerciseMasterRouter)
app.use('/api/workoutplan', workOutPlanRouter)
app.use('/api/userdietplan', userDietPlanRouter)
app.use('/api/userworkoutplan', userWorkOutPlanRouter)

//For User
app.use('/api/profile', userProfileRouter)
app.use('/api/targetgoal', targetGoalRouter)
app.use('/api/foodtracker', foodTrackerRouter)
app.use('/api/bodymeasurement', bodyMeasurementRouter)
app.use('/api/workouttracker', workOutTrackerRouter)
app.use('/api/payment', paymentGatewayRouter)
app.use('/api/userpayment', userPaymentRouter)

app.listen(3000, ()=>{
    console.log('Server is running..');    
})