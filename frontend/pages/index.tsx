import Layout from '../components/Layout'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from '../utils/data-fetching';

const IndexPage = () => {
 
  // function convertToBase64(e:any){
  //   // const reader = new FileReader();
  //   // reader.readAsDataURL(e.target.files[0]);
  //   // reader.onload = () => {
  //   //   setFormData({name:"Kamil",email:"kamil123sakd@gmail.com",password:"kamil12345",photo:reader.result || {} });      
  //   // }
  //   // reader.onerror = (e) => {
  //   //   console.log(e);
  //   // }
  //   setFormData({name:"Kamil",email:"kamil123sakd@gmail.com",password:"kamil12345",photo:e.target.files[0] });      
  // }
  
  return(
  <Layout>
   <h1 className='text-danger'>Ana sehife</h1>
   <p>///////////////////</p>
   <Link href={'/auth/login'}>Login</Link> <br />
   <p>Eger hesab yoxdursa </p>
   <Link href={'/auth/register'}>Register</Link><br />
   <p>///////////////////</p>
   <Link href={'/dashboard'}>Dashboard</Link> <br />

   {/*  */}
   {/* <form onSubmit={submit}  encType="multipart/form-data"
       method="post">

   <input title='name' type="file"  onChange={convertToBase64} />
    <button type="submit">Submit</button> <br /> <br />

    {(formData.photo && Object.keys(formData.photo).length !== 0) ? (
      <img src={`${formData.photo}`} alt="img" width={50} height={50} />
    ) : (
      <img src="/img/avatar.png" alt="img" width={50} height={50} />
    )}
    </form> */}
   {/* /dashboard */}
  </Layout>
  )}


export default IndexPage
