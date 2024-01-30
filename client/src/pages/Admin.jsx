import React from 'react';
import CustomFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import {redirect, useLoaderData} from "react-router-dom";
import { StatItem } from '../components';
import Wrapper from '../assets/wrappers/StatsContainer.js';
import {FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

export const loader = async ({params}) => {
     try {
         const {data} = await CustomFetch.get('users/admin/app-stats')
         console.log(data)
         return data
     } catch (err) {
         toast.error(err?.response?.data?.messages)
         return redirect('/dashboard/all-jobs')
     }
}


const Admin = () => {
  const {jobsCounter, usersCounter} = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={usersCounter}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobsCounter}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;