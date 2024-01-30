import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
     const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({messages: message})
}


export default  errorHandlerMiddleware