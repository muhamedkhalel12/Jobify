import 'express-async-errors' // send asynchronous code errors to error handler middleware ...
import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import mongoose from 'mongoose'
import jobRouters from './routes/jobRoutes.mjs'
import authRoutes from "./routes/authRoutes.mjs";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.mjs";
import cookieParser from 'cookie-parser'
import {authenticateUser} from "./middlewares/authMiddleware.mjs";
import userRoutes from './routes/userRoutes.mjs'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import {v2 as cloudinary} from 'cloudinary';


const app = express()

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
});

const __dirname = dirname(fileURLToPath(import.meta.url))

if(process.env.NODE_ENV === 'development') {
app.use(morgan('dev'))
}

cloudinary.config({
  cloud_name: 'dzdkelbtu',
  api_key: '511157442436624',
  api_secret: 'FSUkYJu2OgnFMoQj7ouHVlSaX6w'
});

app.use(express.static(path.resolve(__dirname, './public')))
app.use(cookieParser())
app.use(express.json())

// app.use('/api/v1/test', (req, res, next) => {
//     res.status(200).json({msg: 'done ...'})
// })

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', authenticateUser, userRoutes)
app.use('/api/v1/jobs' ,authenticateUser ,jobRouters)


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})
app.use('*', (req, res, next) => {
    res.status(404).json({message: 'Not found'})
})

app.use(errorHandlerMiddleware)


const port = process.env.PORT || 808
try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
    console.log(`Server Connected in port : ${port}`)

})
} catch (err) {
    console.log('DB not connected' ,err)
    process.exit(1)
}


