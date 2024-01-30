import Job from "../models/JobModel.mjs";
import {StatusCodes} from 'http-status-codes'
import { readFile } from 'fs/promises'
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import day from 'dayjs';
import * as mongoose from "mongoose";

export const getAllJobs = async (req, res, next) => {
    const { search, jobStatus, jobType, sort, page, limit } = req.query;
    console.log('datta', search, jobStatus, jobType, sort)

    const queryObject = {
        createdBy: req.user.userId,
    };


    if(search) {
        queryObject.$or = [
            { position: { $regex: search, $options: 'i'}},
            { company: { $regex: search, $options: 'i'}}
        ]
    }

    if(jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus = jobStatus
    }
    if(jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }


    const sortOptions = {
        newest: '-createdAt',
        oldest: "createdAt",
        'a-z': 'position',
        'z-a': '-position',
    }

    const sortKey = sortOptions[sort] || sortOptions.newest




try {
            const { userId, role } = req.user;

            // Set up pagination ...
            const currentPage = Number(page) || 1;
            const limits = Number(limit) || 10
            const skip = (page - 1) * limits


            const totalJobs = await Job.countDocuments(queryObject)
            const numOfPages = Math.ceil(totalJobs / limits)
            const userJobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limits)
    console.log( 'logg' ,userJobs, numOfPages, totalJobs)
    res.status(StatusCodes.OK).json({userJobs, numOfPages, totalJobs, currentPage});
        } catch (error) {
            console.error('Error fetching jobs from MongoDB:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
};

export const addJob = async (req, res, next) => {
    const job = await Job.create({...req.body, createdBy: req.user.userId})
    res.status(StatusCodes.CREATED).json({job})
}

export const getSingleJob = async (req, res, next) => {
    console.log('lol')
    const {id} = req.params;
    const selectedJob = await Job.findById(id)
    res.status(StatusCodes.OK).json({message: 'Job fetched', job: selectedJob})
}

export const editJob = async (req, res, next) => {
    const {id} = req.params;

   const selectedJob = await Job.findByIdAndUpdate(id, req.body, {
       new: true // will return updated job instead of old one ...
   })


    // selectedJob.position = position
    // selectedJob.company = company
    return res.status(StatusCodes.OK).json({message: 'Job editing done', job: selectedJob})

}

export const deleteJob = async  (req, res, next) => {
    const {id} = req.params;
   const removedJob = await Job.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({message: 'Job deleted', job: removedJob})
}


export const showStats = async (req, res, next) => {


    let stats = await Job.aggregate([
        {$match: { createdBy : new mongoose.Types.ObjectId(req.user.userId) }},
        {
        $group: {
            _id: '$jobStatus',
            count: { $sum: 1 }
        }
    }
    ])


    let monthlyApplication = await Job.aggregate([
        { $match : { createdBy : new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
            _id: {
            year: { $year : '$createdAt'}, month: { $month : "$createdAt"}} ,
            count: {$sum : 1}
                }
        },
        {$sort: { '_id.year': -1, '_id.month': -1 }},
        {$limit: 6}
    ])



    stats = stats.reduce((acc, curr) => {
        const {_id: title, count} = curr;
        acc[title] = count
        return acc
    }, {})

    monthlyApplication = monthlyApplication.map(app => {
        const {_id: { year, month }, count} = app
        const date = day().month(month - 1).year(year).format('MMM YY')
        return { date, count }
    }).reverse()




    res.status(StatusCodes.OK).json({stats, monthlyApplication})
}
