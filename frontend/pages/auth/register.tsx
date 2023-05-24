import React, { useState } from 'react';
import { useFormik } from 'formik';
import ConditionalForm from '../../components/ConditionalForm';
import { API_URL } from '../../utils/data-fetching';
//name,email,password,phone,photo,bio  inputlar vasitesile mene bu melumatdari gonder
//formiknen YUP nan ele
//errorlari goster
 // error yoxdusa succes deye birsey olsun
 //git push origin 
 
 const Register = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:"",
      phone:"",
      photo:"",
      bio:""
    },
    onSubmit: values => {
      const formData = new FormData();

        for(let i in Object.keys(values)){
          let key = Object.keys(values)[i];
          let value = Object.values(values)[i];
          formData.append(key,value);
        }

        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }
      fetch(`${API_URL}/api/users/register`, {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data here
            console.log(data);
        })
      }
  });
  return (
    <div>
        <p>register</p>
        <ConditionalForm formik={formik}/>
    </div>
  )
}

export default Register