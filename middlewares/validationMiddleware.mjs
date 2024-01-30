import {BadRequestError, NotFoundError} from "../errors/customError.mjs";
import {body, param, validationResult} from "express-validator";
import {JOB_STATUS, JOB_TYPES, USER_ROLES} from "../utils/contants.mjs";
import Job from '../models/JobModel.mjs'
import User from '../models/UserModel.mjs'
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const validationMiddleware = (validationResults) => {
    return [
        validationResults, // as function that execute validation code
        (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const errorsMessages = errors.array().map(err => err.msg )
        if(errorsMessages[0].startsWith('job not')){
            throw new NotFoundError(errorsMessages)
        }
        if(errorsMessages[0].startsWith('not authorized')) {
            throw new UnauthenticatedError('not authorized to access this route')
        }
    // return res.status(400).json({ message: 'Some errors here', errors: errorsMessages });
    throw new BadRequestError(errorsMessages)
  }
  next();
}
    ]
}


export const validateJobInput = validationMiddleware([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPES)).withMessage('invalid type value')

])

export const validateIdParam = validationMiddleware([
    param('id').custom(async (id, {req}) => {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) throw new BadRequestError('invalid mongo id')

        const job = await Job.findById(id);
        if(!job) throw new NotFoundError(`job not found with id ${id}`)
        const isAdmin = req.user.role === 'admin';
        const isOwner = job.createdBy.toString() === req.user.userId
        if(!isAdmin && !isOwner) {
            throw new UnauthenticatedError('not authorized to access this route')
        }

        return true
    })
])


export const validateUserSignupInput = validationMiddleware([
    body('name').isLength({min: 4, max: 30}).withMessage('please enter a valid name'),
    body('email').isEmail().withMessage('please enter a valid email address').custom( async email => {
        const isExisted = await User.findOne({email})
        if(isExisted){
            throw new BadRequestError("Email already existed")
        }
    }),
    body('password').isLength({min: 10, max: 50}).withMessage('please enter a strong and valid password'),
    body('lastName').notEmpty().withMessage('please enter your last name'),
    body('location').notEmpty().withMessage('please enter a your location'),
])


export const validateUserLoginInput = validationMiddleware([
     body('email').notEmpty().withMessage('please enter your email'),
    body('password').notEmpty().withMessage('please enter your password')
])


export const validateUpdateUserInput = validationMiddleware([
   body('name').isLength({min: 4, max: 20}).withMessage('please enter a valid name'),
    body('email').isEmail().withMessage('please enter a valid email address').custom( async (email, {req})=> {
        const user = await User.findOne({email})
        if(user && user._id.toString() !== req.user.userId){
            throw new BadRequestError("Email already existed")
        }
    }),
    body('lastName').notEmpty().withMessage('please enter your last name'),
    body('location').notEmpty().withMessage('please enter a your location'),
])