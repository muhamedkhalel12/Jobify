import express from 'express'
import {getApplicationStats, getCurrentUser, updateUser} from "../controllers/userController.mjs";
import {validateUpdateUserInput} from "../middlewares/validationMiddleware.mjs";
import {authenticateUser, authorizePermissions, checkTestUser} from "../middlewares/authMiddleware.mjs";
import upload from "../middlewares/multerMiddleware.mjs";


const router = express.Router()

router.get('/current-user', authenticateUser ,getCurrentUser)
router.get('/admin/app-stats',checkTestUser,[ authorizePermissions('admin') ,getApplicationStats ])
router.patch('/update-user', checkTestUser, upload.single('avatar'),validateUpdateUserInput, updateUser)

export default router   
