import Layout from '../components/Layout'
import { Provider } from 'react-redux';
import {store} from '../store/store'
import { useEffect, useState } from 'react';
import { API_URL } from '../utils/data-fetching';

const IndexPage = () => {
  const [registerInput , setRegisterInput] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    photo:"",
    bio:"",
  });
  const {name,email,password,phone,photo,bio} = registerInput;

 
    // setRegisterInput({...registerInput,name:"Kamil"});
    // setRegisterInput({...registerInput,email:"kamil132@gmail.com"});
    // setRegisterInput({...registerInput,password:"kamil123"});
  // "proxy":"http://localhost:3001",

  function dataFetch(e:any) {
    e.preventDefault();
    console.log(registerInput);
    
    fetch(`${API_URL}/api/users/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,email,password}),
    })////////////////////////IT DOES NOT WORK
    .then(res => res.json())
    .then(res =>console.log(res))
    .catch(e => console.log(e));
    
  }

  return(
    <Provider store={store}>
  <Layout>
    <h1>Hello Next.js 👋</h1>
   <h2>TEST</h2>
   <form className="container" onSubmit={dataFetch}>
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
   </form>
  </Layout>
  </Provider>
  )}


export default IndexPage
