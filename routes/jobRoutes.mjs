import express from 'express'
import {
    getAllJobs,
    addJob,
    getSingleJob,
    editJob,
    deleteJob, showStats,

} from '../controllers/jobControllers.mjs'
import {validateIdParam, validateJobInput} from "../middlewares/validationMiddleware.mjs";
import {authenticateUser, checkTestUser} from "../middlewares/authMiddleware.mjs";

const router = express.Router()


// Get All Jobs && Add New Job

router.route('/').get(getAllJobs).post(checkTestUser, validateJobInput ,addJob)

// Show stats Route
router.route('/stats').get(showStats)

// Get Single Job && Edit Job && Delete Job

router.route('/:id').get(validateIdParam, getSingleJob).patch(checkTestUser, validateJobInput, validateIdParam, editJob).delete(checkTestUser, validateIdParam, deleteJob)



export default router
