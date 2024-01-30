import Job from './Job.jsx';
import Wrapper from '../assets/wrappers/JobsContainer.js';

import {useAlljobsContext} from "../pages/AllJobs.jsx";
import {PageBtnContainer} from "./index.js";

const JobsContainer = () => {
  const  data = useAlljobsContext();
    console.log(data)
  const { userJobs, numOfPages, totalJobs, currentPage } = data;
  if (userJobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
        <h5>{totalJobs} job{userJobs.length > 1 && 's'}</h5>
      <div className='3
        jobs'>
        {userJobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
        {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;