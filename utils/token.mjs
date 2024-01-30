import jwt from 'jsonwebtoken'

const secretKey = process.env["TOKEN_SECRETKEY"]
export const createToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {expiresIn:  process.env['TOKEN_EXPIRES_IN']})
    return token
}


export const decodeToken = (token) => {
     const decodedToken = jwt.verify(token, secretKey)
   return decodedToken
}




