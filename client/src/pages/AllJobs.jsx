import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import {redirect, useLoaderData} from 'react-router-dom';
import CustomFetch from "../utils/customFetch.js";
import {createContext, useContext} from "react";


export const loader = async ({request}) => {
    const url = new URL(request.url)
    const params = Object.fromEntries([...url.searchParams.entries()])

    try{
        const {data} = await CustomFetch.get('/jobs', {
            params
        })
        return {data, params}
    } catch (err) {
        toast.error(err?.response?.data?.messages)
        return err
    }
}

export const action = async ({params, request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await CustomFetch.delete(`jobs/${data.id}`)
    toast.success('Job deleted successfully')
      return redirect('/dashboard/all-jobs')
  } catch (err) {
    toast.error(err?.response?.data?.messages)
      return err
  }
}

const AllJobsContext = createContext()
const AllJobs = () => {
  const {data, params} = useLoaderData();

  return (
    <AllJobsContext.Provider value={data}>
      <SearchContainer params={params}/>
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAlljobsContext = () => useContext(AllJobsContext)
export default AllJobs;