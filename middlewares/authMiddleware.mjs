import {decodeToken} from "../utils/token.mjs";
import User from '../models/UserModel.mjs'
import {UnauthenticatedError, BadRequestError} from "../errors/customError.mjs";

export const authenticateUser = async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        throw new UnauthenticatedError('authentication invalid');
    }

    try{
         const {userId, role} = decodeToken(token)
        const testUser = userId === '6567ba25831466e9867c4a28'
        req.user = {userId, role, testUser}
         const user = await User.findById(userId)
        next()
    }catch (err) {
        throw new UnauthenticatedError('authentication invalid');
    }


}


// authorize permissions

export const authorizePermissions = (...roles) => {
    // ... => rest opertaror return an array (object data to array) ...
    return (req, res, next) => {
        console.log(roles)
        if(!roles.includes(req.user.role)){
            throw new UnauthenticatedError('unauthorized to access this route...')
        }
        next()
    }
}



export const checkTestUser = (req, res, next) => {
    console.log( 'here is test user' ,req.testUser)
    if(req.user.testUser) {
        throw new BadRequestError('Demo User, Read Only!')
    }
    next()
}


