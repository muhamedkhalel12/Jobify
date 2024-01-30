import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPES } from '../../../utils/contants.mjs';
import { Form, useNavigation, redirect, useParams } from 'react-router-dom';
import CustomFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";


export const loader = async ({params}) => {
    try {
        const {data} = await CustomFetch.get(`/jobs/${params.id}`)
        return data
    } catch (err) {
        toast.error(err?.response?.data?.messages)
        console.log(err)
        return redirect('/dashboard/all-jobs')
    }
};
export const action = async ({params, request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
         await CustomFetch.patch(`jobs/${params.id}`, data)
         toast.success('Job edited successfully')
        return redirect('/dashboard/all-jobs')
    } catch (err) {
        toast.error(err?.response?.data?.messages)
        return err
    }
};

const EditJob = () => {
    const {job} = useLoaderData()
    const navigation = useNavigation()
    const isSubmitting = navigation === 'submitting'
    return (
        <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
            {/*name, labelText, list, defaultValue*/}
          <FormRow fieldName='position' fieldType='text'  labelText='position' defaultValue={job.position} />
          <FormRow fieldName='company' fieldType='text' labelText='company' defaultValue={job.company} />
          <FormRow
              fieldName='jobLocation'
              fieldType='text'
            labelText='job location'
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPES)}
          />
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
    )
};
export default EditJob;