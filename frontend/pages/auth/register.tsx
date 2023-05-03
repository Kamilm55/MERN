import React from 'react'
// terminalda /MERN den cd backend ele npm start yaz backend basdasn
// sonra cd frontend npm run dev
//name,email,password,phone,photo,bio  inputlar vasitesile mene bu melumatdari gonder
//yeni register api-a post request ele
// GONDERECEYIN API LINKI : http://localhost:3001/api/users/register
//API BASE LINK :import { API_URL } from '../utils/data-fetching';=> API_URL/api/users/register
//formiknen YUP nan ele 
//errorlari goster
 // error yoxdusa succes deye birsey olsun
const Register = () => {
      // const [registerInput , setRegisterInput] = useState({
  //   name:"",
  //   email:"",
  //   password:"",
  //   phone:"",
  //   photo:"",
  //   bio:"",
  // });
  // const {name,email,password,phone,photo,bio} = registerInput;
  return (
    <div>
        <p>register</p>
       

   {/* <form className="container" onSubmit={dataFetch}>
    <label htmlFor="name">
    <input placeholder='Your name' value={registerInput.name} onChange={(e)=>setRegisterInput({...registerInput,name:e.target.value})} type="text" name="name" id="name" />
    </label>
    <label htmlFor="email">
    <input placeholder='Your email' value={registerInput.email} onChange={(e)=>setRegisterInput({...registerInput,email:e.target.value})} type="email" name="email" id="email" />
    </label>
    <label htmlFor="password">
    <input placeholder='Your password' value={registerInput.password} onChange={(e)=>setRegisterInput({...registerInput,password:e.target.value})} type="password" name="password" id="password" />
    </label>
    <button type='submit'>Submit</button>
   </form> */}
    </div>
  )
}

export default Register