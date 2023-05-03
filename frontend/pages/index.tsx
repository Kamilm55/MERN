import Layout from '../components/Layout'
import { Provider } from 'react-redux';
import {store} from '../store/store'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const IndexPage = () => {

  return(
    <Provider store={store}>
  <Layout>
   
   <h1>Ana sehife</h1>
   <p>Eger hesab yoxdursa </p>
   <Link href={'/auth/register'}>Register</Link><br />
   <p>///////////////////</p>
   <Link href={'/auth/login'}>Login</Link> <br />
   <Link href={'/dashboard'}>Dashboard</Link> <br />
   {/* /dashboard */}
  </Layout>
  </Provider>
  )}


export default IndexPage
