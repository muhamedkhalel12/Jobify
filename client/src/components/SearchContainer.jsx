import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPES, JOB_STATUS, JOB_SORT_BY } from '../../../utils/contants.mjs';


// export const action = async ({request}) => {
//         const formData = await request.formData()
//         const data = Object.fromEntries(formData)
//         return redirect(`/dashboard/all-jobs?search=${data.search}&jobStatus=${data.jobStatus}&jobType=${data.jobType}&sort=${data.sort}`)
//     }
const SearchContainer = ({params}) => {
  const submit = useSubmit()
  const {search, jobStatus, jobType, sort} = params


    const debounce = (onChange) => {
      let timeOut
      return (e) => {
          const form = e.currentTarget.form
          clearTimeout(timeOut)
          timeOut = setTimeout(() => {
             onChange(form)
          }, 2000)
      }
    }


  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow fieldType='search'  fieldName='search' defaultValue={search} onChange={debounce((form) => {
              submit(form)
          })}/>
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={debounce((form) => {
              submit(form)
          })}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPES)]}
            defaultValue={jobType}
           onChange={debounce((form) => {
              submit(form)
          })}
          />
          <FormRowSelect
            name='sort'
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
           onChange={debounce((form) => {
              submit(form)
          })}
          />

          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          {/*<SubmitBtn formBtn />*/}
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;