import { TextField } from '@mui/material';
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const ConditionalForm = ({formik}:any) => {
  const [isSubmitted,setSubmitted] = useState(false);
  const {name,email,password,phone,photo,bio} = formik.values;

  return (
 <form className="container d-flex flex-column gap-4" onSubmit={formik.handleSubmit}>
 
  <div className="input-group d-flex flex-column">
  <TextField
          error={(formik.touched.name  && Boolean(formik.errors.name)) || (isSubmitted && formik.values.name === "")}
          helperText={((formik.touched.name || isSubmitted) && formik.errors.name) || ((isSubmitted && formik.values.name === "") && `Name is required`)}
          fullWidth
          required
          id="name"
          name='name'
          label="Your Name"
          value={name}
          {...formik.getFieldProps('name')}
          />
  </div>
    
  <div className="input-group d-flex flex-column">
    <TextField
          error={(formik.touched.email  && Boolean(formik.errors.email)) || (isSubmitted && formik.values.email === "")}
          helperText={((formik.touched.email || isSubmitted) && formik.errors.email) || ((isSubmitted && formik.values.email === "") && `Email is required`)}
          fullWidth
          required
          id="email"
          name='email'
          label="Email Adress"
          value={email}
          {...formik.getFieldProps('email')}  
        /> 
  </div>

  <div className="input-group d-flex flex-column">
    <TextField
          error={(formik.touched.password  && Boolean(formik.errors.password)) || (isSubmitted && formik.values.password === "")}
          helperText={((formik.touched.password || isSubmitted) && formik.errors.password) || ((isSubmitted && formik.values.password === "") && `Password is required`)}
          fullWidth
          required
          id="password"
          name='password'
          label="Password"
          type='password'
          value={password}
          {...formik.getFieldProps('password')}  
        />
  </div>

  <div className="input-group d-flex flex-column">
    <TextField
            error={(formik.touched.phone || isSubmitted) && Boolean(formik.errors.phone)}
            helperText={(formik.touched.phone || isSubmitted) && formik.errors.phone}
          fullWidth
          id="phone"
          name='phone'
          label="Phone Number"
          type='tel'
          value={phone}
          {...formik.getFieldProps('phone')}  
        />
  </div>

<div className="input-group d-flex flex-column">
    <TextField
         error={(formik.touched.bio || isSubmitted) && Boolean(formik.errors.bio)}
         helperText={(formik.touched.bio || isSubmitted) && formik.errors.bio}
          fullWidth
          id="bio"
          label="Bio"
          name='bio'
          value={bio}
          multiline
          {...formik.getFieldProps('bio')}
          maxRows={4}
        />
  </div> 

  <label htmlFor="photo" >Your Photo: <br />
     <input  
   onChange={(event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      formik.setFieldValue('photo', file);
    }
  }}
      className='my-2'
      type="file" name="photo" id="photo" />
    </label>
    
    <button type='submit' onClick={()=>{
         setSubmitted(true)
    }}
       className='btn btn-primary'>Submit</button>
   </form> 
  )
}

export default ConditionalForm