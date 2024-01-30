import {StatusCodes} from "http-status-codes";
import User from '../models/UserModel.mjs'
import {BadRequestError, NotFoundError, UnauthenticatedError} from "../errors/customError.mjs";
import {comparePasswords, hashPassword} from "../utils/password.mjs";
import {createToken, decodeToken} from "../utils/token.mjs";

export const signupController = async (req, res, next) => {
    const isFirstAccount = await User.count() === 0
    req.body.role = isFirstAccount ? 'admin' : 'user'
    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({message: 'user created', user})
}


export const loginController = async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    const isValidUser = user && await(comparePasswords(password, user.password))
    if(!isValidUser) throw new UnauthenticatedError('Invalid credentials');
    const token = createToken({userId: user._id, role: user.role})
    console.log(decodeToken(token))
    const daysExp = 24 * 60 * 60 * 1000 * parseInt(process.env["TOKEN_EXPIRES_IN"].substring(0,1))
    console.log(daysExp)
    const expires = new Date(Date.now() + daysExp);

    res.cookie('token', token, {
        httpOnly:true,
        expires: expires,
        secure: process.env.NODE_ENV === 'production' // only for https ...
    })

    res.status(StatusCodes.OK).json({message: 'log in successfully', token})
}



export const logoutController = async (req, res, next) => {

    res.cookie('token', 'logout', {
        httpOnly:true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({message: 'logout done ...'})
}