import express from 'express'
import {loginController, logoutController, signupController} from "../controllers/authControllers.mjs";
import {validateUserLoginInput, validateUserSignupInput} from "../middlewares/validationMiddleware.mjs";
const router = express.Router()

router.route('/login').post(validateUserLoginInput ,loginController)

router.route('/signup').post(validateUserSignupInput ,signupController)

router.route('/logout').get(logoutController)

export default router