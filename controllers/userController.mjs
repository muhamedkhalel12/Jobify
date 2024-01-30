import {StatusCodes} from "http-status-codes";
import User from '../models/UserModel.mjs'
import Job from '../models/JobModel.mjs'
import {v2 as cloudinary} from 'cloudinary';
import {promises as fs } from 'fs'

export const getCurrentUser = async (req, res, next) => {
    const {userId, role} = req.user
    const currentUser = await User.findById(userId).select('-password')
    res.status(StatusCodes.OK).json({msg: 'get current user', user: currentUser})
}

export const getApplicationStats = async (req, res, next) => {
    // how many users and jobs in our application
    const users = await User.find()
    const usersCounter = await User.count()
    const jobsCounter = await Job.count();
    res.status(StatusCodes.OK).json({msg: 'application stats', jobsCounter, usersCounter, users})
}

export const updateUser = async (req, res, next) => {
    const {userId, role} = req.user
    const newUser = {...req.body}
    delete newUser.password
   if(req.file) {
      const response = await cloudinary.uploader.upload(req.file.path)
       await fs.unlink(req.file.path)
       newUser.avatar = response.secure_url
       newUser.avatarPublicId = response.public_id
   }

    const oldUser = await User.findById(userId)
   const updatedUser = await User.findByIdAndUpdate(userId, newUser, {new: true}).select('-password')
    console.log(updatedUser)
    if(req.file && oldUser.avatarPublicId) {
        await cloudinary.uploader.destroy(oldUser.avatarPublicId)
    }

    console.log(updatedUser)
    res.status(StatusCodes.OK).json({msg: 'update user', updatedUser})
}