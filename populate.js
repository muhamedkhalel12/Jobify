import {dirname} from "path";
import {fileURLToPath} from "url";
import path from "path";
import {readFile} from "fs/promises";
import Job from './models/JobModel.mjs'
import User from './models/UserModel.mjs'
import mongoose from "mongoose";

try {
            const __dirname = dirname(fileURLToPath(import.meta.url));
            const jobsFilePath = path.resolve(__dirname, './utils/MOCK_DATA.json');
            console.log('#1');
            const data = await readFile(jobsFilePath, 'utf8');
            const jobs = JSON.parse(data)
             await mongoose.connect('mongodb+srv://muhammedkhalel492:XglSqYo5J8r7fU9Q@cluster0.vmtriix.mongodb.net/jobs?retryWrites=true&w=majority')
            const testUser = await User.findOne({email: 'test@test.com'})
    console.log(testUser)

    const userId = testUser._id.toString()
           const result = jobs.map(job =>  {
               return {...job, createdBy: userId}
           })

    const res = await Job.create(result)
    return res

    //     const jobs = data.map(job => {
    //         return job.append({createdBy : testUser._id})
    //     })
    // console.log(jobs)
            // const response = await Job.create(jobs)
} catch (err) {
    console.log(err)
    return err
}
