import React, {useState} from 'react';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js'
import {Logo, FormRow} from '../components'
import {Link, Form, redirect, useNavigation} from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try{
        await customFetch.post('/auth/signup', data)
        toast.success('Registration successful')
        return redirect('/login')
    }catch(err) {
        console.log(err)
        const errors = err.response.data.messages.split(',')
        if(errors.includes('Email already existed')){
            toast.error('Email already existed')
        }else {
            errors.map(err => {
             toast.error(err)
        })
        }
        return err
    }
}

const Register = (props) => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <Wrapper>
            <Form method='post' className='form'>
              <Logo />
                <h4>Register</h4>
                   <FormRow fieldName='name' fieldType='text' />
                    <FormRow fieldName='lastName' fieldType='text' labelText='last name' />
                <FormRow fieldName='location' fieldType='text' />
                <FormRow fieldName='email' fieldType='email' />
                <FormRow fieldName='password' fieldType='text'/>
                <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? 'submitting...' : 'submit'}</button>
                <p>Already a member?
                <Link to='/login' className='member-btn'>Login</Link>
                </p>
            </Form>

        </Wrapper>
    )

};

export default Register;