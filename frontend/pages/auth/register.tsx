import React from 'react';
import { useFormik } from 'formik';
import ConditionalForm from '../../components/ConditionalForm';
import * as Yup from 'yup';
import { useAppDispatch } from '../../app/store/hooks';
import { register } from '../../app/features/AuthSlice';

 
 const Register = () => {
  const dispatch = useAppDispatch();

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
      dispatch(register({values}));
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