import Link from 'next/link'
import Layout from '../components/Layout'
import { Provider } from 'react-redux';
import {store} from '../store/store'

const IndexPage = () => (
  <Provider store={store}>
  <Layout>
    <h1>Hello Next.js 👋</h1>
   <h2>TEST</h2>
  </Layout>
  </Provider>
)


export default IndexPage
