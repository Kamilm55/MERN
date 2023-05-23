import Layout from '../components/Layout'
import { Provider } from 'react-redux';
import {store} from '../store/store'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '../utils/data-fetching';

const IndexPage = () => {
  const [formData,setFormData] = useState({name:"",email:"",password:"",photo:{}});
  const [buffer,setBuffer] = useState(null);
  const {name,email,password,photo} = formData;
  const multipartForm = new FormData();

  useEffect(()=>{
  },[buffer])
  const Register = () => {

fetch(`${API_URL}/api/users/register`, {
  method: 'POST',
  body: multipartForm
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data here
    console.log(data);
    setBuffer(data.photo.image.data);
   
    
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
  }
  const submit = (e:any) => {
    e.preventDefault();
    multipartForm.append("name","NewUser");
    multipartForm.append("email","NewAsscount22@gmail.com");
    multipartForm.append("password","kamil12345");
    multipartForm.append("photo",photo);    
    // for (const pair of multipartForm.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    Register();
  }
 
  function convertToBase64(e:any){
    // const reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = () => {
    //   setFormData({name:"Kamil",email:"kamil123sakd@gmail.com",password:"kamil12345",photo:reader.result || {} });      
    // }
    // reader.onerror = (e) => {
    //   console.log(e);
    // }
    setFormData({name:"Kamil",email:"kamil123sakd@gmail.com",password:"kamil12345",photo:e.target.files[0] });      
  }
  
  return(
    <Provider store={store}>
  <Layout>
   <h1>Ana sehife</h1>
   <p>Eger hesab yoxdursa </p>
   <Link href={'/auth/register'}>Register</Link><br />
   <p>///////////////////</p>
   <Link href={'/auth/login'}>Login</Link> <br />
   <Link href={'/dashboard'}>Dashboard</Link> <br />

   {/*  */}
   <form onSubmit={submit}  encType="multipart/form-data"
       method="post">

   {/* <input title='name' type="text" value={formData.name}  onChange={(e)=>setFormData({...formData,name:e.target.value})}/> */}
   <input title='name' type="file"  onChange={convertToBase64} />
    <button type="submit">Submit</button> <br /> <br />

    {(formData.photo && Object.keys(formData.photo).length !== 0) ? (
      <img src={`${formData.photo}`} alt="img" width={50} height={50} />
    ) : (
      <img src="/img/avatar.png" alt="img" width={50} height={50} />
    )}
    </form>
   {/* /dashboard */}
  </Layout>
  </Provider>
  )}


export default IndexPage
