import React, { useState } from 'react';
import { useFormik } from 'formik';
import ConditionalForm from '../../components/ConditionalForm';
import * as Yup from 'yup';
import  REGISTER  from '../../utils/non-serializable/RegisterFunc';
import tokenCookie from '../../utils/token-cookie';
import { useRouter } from 'next/router';
 
 const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:"",
      phone:"",
      photo:"",
      bio:""
    },
    validationSchema:Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    })
    ,
    onSubmit: values => {
      REGISTER({values});
        const token = tokenCookie();
        console.log(token);
        if (token) {
          router.push({
            path:"/dashboard",
            query:{token}
          });
        }

    }
  });

  return (
    <div>
        <h1 className='text-center'>register</h1>
        <ConditionalForm formik={formik}/>
    </div>
  )
}

export default Register