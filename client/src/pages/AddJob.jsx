//
import {FormRow, FormRowSelect} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { JOB_STATUS, JOB_TYPES } from '../../../utils/contants.mjs';
import { Form, useNavigation, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch.js';
import {toast} from "react-toastify";
import {useMyContext} from "../context/MyContext.jsx";



export const action = async ({request}) => {
 const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try{
  const res =  await customFetch.post('/jobs', data)
toast.success('Job added successfully')
    return redirect('/dashboard/all-jobs')
  } catch (err) {
      console.log(err)
    toast.error(err?.response?.data?.messages)
    return err
  }
}


const AddJob = () => {
  const {state, dispatch} = useMyContext()
    const user = state.userData;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow fieldType='text'  fieldName='position' labelText='position' />
          <FormRow fieldType='text' fieldName='company' labelText='company'/>
          <FormRow
            fieldType='text'
            labelText='job location'
            fieldName='jobLocation'
            defaultValue={user.location}
          />
          <FormRowSelect labelText='job status' name='jobStatus' defaultValue={JOB_STATUS.PENDING} list={JOB_STATUS}/>
          <FormRowSelect labelText='job type' name='jobType' defaultValue={JOB_TYPES.PART_TIME} list={JOB_TYPES}/>

          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;