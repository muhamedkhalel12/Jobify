import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import {useMyContext} from "../context/MyContext.jsx";
import CustomFetch from "../utils/customFetch.js";


export const action = async ({request}) => {
  const formData = await request.formData()
  const file = formData.get('avatar')
  if(file && file.size > 500000){
    toast.error('Image size too large')
    return null
  }
  try {
      await CustomFetch.patch('users/update-user', formData)
    toast.success('Profile updated successfully')
  return null

  } catch (err) {
    toast.error('some thing went wrong !')
    console.log(err)
    return err
  }
}

const Profile = () => {
  const { state, dispatch } = useMyContext()
  const { name, lastName, email, location } = state.userData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow fieldType='text' fieldName='name' defaultValue={name} />
          <FormRow
            fieldType='text'
            labelText='last name'
            fieldName='lastName'
            defaultValue={lastName}
          />
          {/*fieldName, fieldType, labelText, defaultValue*/}
          <FormRow fieldType='email' fieldName='email' defaultValue={email} />
          <FormRow fieldType='text' fieldName='location' defaultValue={location} />
          <button
            className='btn btn-block form-btn'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'save changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;