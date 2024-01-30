import mongoose from 'mongoose'
const { Schema } = mongoose
import { JOB_TYPES ,JOB_STATUS } from "../utils/contants.mjs";

const JobSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    jobStatus: {
        type: String,
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.PENDING,
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPES),
        default: JOB_TYPES.FULL_TIME,
    },
    jobLocation: {
        type: String,
        default: 'my city'
    },
    createdBy: {
        ref: 'User',
        type: mongoose.Types.ObjectId
    }

}, {timestamps: true})


export default mongoose.model('Job', JobSchema)