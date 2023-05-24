import React from 'react'


//bura haradi?\\

// data gonderilir burda set edilir ve qaytrailir parente he
//gir fomik oxu mende oxuyram yaddan cxib? qaldi bu gun?
const ConditionalForm = ({formik}:any) => {
    const {name,email,password,phone,photo,bio} = formik.values;

  return (
 <form className="container" onSubmit={formik.handleSubmit}>
    <label htmlFor="name">
    <input placeholder='Your name' value={name} 
    {...formik.getFieldProps('name')}     type="text" name="name" id="name" />
    </label>
    <label htmlFor="email">
    <input placeholder='Your email' value={email} 
    {...formik.getFieldProps('email')}     type="email" name="email" id="email" />
    </label>
    <label htmlFor="password">
    <input placeholder='Your password' value={password}
    {...formik.getFieldProps('password')}
      type="password" name="password" id="password" />
    </label>
    
    <label htmlFor="phone">
     <input placeholder='Your phone number' value={phone}
    {...formik.getFieldProps('phone')}
      type="tel" name="phone" id="phone" />
    </label>
    {/* <label htmlFor="photo" >Your Photo:
     <input  
    // {...formik.getFieldProps('photo')}
      type="file" name="photo" id="photo" />
    </label> */}
    <label htmlFor="bio">
     <input placeholder='Your bio' value={bio}
    {...formik.getFieldProps('bio')}
      type="text" name="bio" id="bio" />
    </label>
    
    <button type='submit'>Submit</button>
   </form> 
  )
}

export default ConditionalForm