import React from 'react';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js'
import {Logo, FormRow} from "../components/index.js";
import {Link, Form, redirect, useNavigation, useNavigate} from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try{
        await customFetch.post('/auth/login', data)
        toast.success('Login successful')
        return redirect('/dashboard')
    }catch (err) {
        toast.error(err?.response?.data?.messages)
        return err
    }
}

const Login = (props) => {
    const navigation = useNavigation()
    const navigate = useNavigate()
    const isLogging =  navigation.state === 'submitting'

    const loginDemoUser = async () => {
        const data = {
            email: "test@test.com",
            password: 'secretsecret123'
        }

        try {
            await customFetch.post('/auth/login', data)
            toast.success('take a test drive')
            return navigate('/dashboard/all-jobs')
        } catch (err) {
            toast.error(err?.response?.data?.messages)
            return err
        }
    }


    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo />
                <h4>Login</h4>
                <FormRow fieldName='email' fieldType='email' required/>
                <FormRow fieldName='password' fieldType='text' required/>
                <button type='submit' className='btn btn-block' disabled={isLogging}>{isLogging ? 'submitting...' : 'submit'}</button>
               <button type='button' onClick={loginDemoUser} className='btn btn-block'>explore the app</button>
                <p>Not a member?
                <Link to='/register' className='member-btn'>Register</Link>
                </p>
            </Form>
        </Wrapper>

            )
};

export default Login;